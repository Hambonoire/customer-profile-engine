## PROJECT STATUS: Analytic-Lead-Gen-App (Phase 1 Finalized)

### **Core Stack**

- **Runtime:** Node.js (JavaScript - No TypeScript).
- **ORM:** Prisma v6 (Singleton pattern within Service constructors).
- **Database:** Local PostgreSQL (@14) running on port 5432.
- **Architecture:** Modular / DDD (Feature-based folders) using ES6 Classes.
- **Validation:** Joi (Schema-based validation via Global Middleware).

### **Current Project Tree**

- `src/modules/profile/`: Fully refactored to OOP. Controller uses Service via constructor; Service uses Prisma via constructor.
- `src/modules/discovery/`: Scaffolded for Phase 2 "Niche Mapping" logic.
- `src/modules/researcher/`: Scaffolded for Phase 2 "Deep Dive" scraping logic.
- `src/shared/`: Contains `validate.middleware.js` and `validators/` for global schema enforcement.
- `docs/architecture/`: Contains `system-overview.md` (Source of truth for system design).

### **Key Decisions & Logic**

1. **Plain JavaScript + OOP:** Blueprints (Classes) are exported; Route files instantiate Controllers.
2. **Global Validation Middleware (GVM):** Uses `validate(schema)` in routes to sanitize `req.body` and `stripUnknown` fields before reaching controllers.
3. **Prisma Instance:** Initialized in Service constructors (`this.prisma = new PrismaClient()`) for better encapsulation.
4. **Documentation as Code:** `docs/` folder tracked in Git to maintain institutional knowledge for Phase 2 logic.

### **Current Sprint Goal**

Completed Phase 1 (Storage Foundation).
**Next Focus:** Implementing `DiscoveryService` to map "adjacent niches" using the Specificity Toggle logic.

## PHASE 2: DISCOVERY & INTELLIGENCE (Next Steps)

### **Core Objective**

Transition from manual lead entry to a "Market Mapping" engine that discovers adjacent business niches and enriches them with high-specificity metadata.

### **The "Human-in-the-Loop" Workflow**

1. **Input:** User enters a target industry (e.g., "Coffee Roaster").
2. **Expand:** `DiscoveryService` maps "cousin" industries based on a breadth parameter.
3. **Filter:** User selects mission-aligned adjacent types.
4. **Execute:** `ResearcherService` scrapes metadata (FSVP, Tech Stack) for selected targets.
5. **Persist:** Validated data is sent to `ProfileService` for storage.
