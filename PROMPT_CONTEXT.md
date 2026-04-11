## PROJECT STATUS: Analytic-Lead-Gen-App (Phase 1 Complete)

### **Core Stack**

- **Runtime:** Node.js (JavaScript - No TypeScript).
- **ORM:** Prisma v6.
- **Database:** Local PostgreSQL (@14) running on port 5432.
- **Architecture:** Modular / DDD (Feature-based folders).

### **Current Project Tree**

- `src/modules/profile/`: Contains controller, service, and routes (Class-based/OOP).
- `src/shared/`: Placeholder for global middleware and utils.
- `prisma/schema.prisma`: Defines `CustomerProfile` with analytical fields (fsvpCompliant, leadScore, etc.).

### **Key Decisions & Logic**

1. **Plain JavaScript + OOP:** Using ES6 Classes for Services and Controllers to maintain clean state and dependency injection.
2. **Prisma Client:** Initialized in the Service layer as a Singleton.
3. **Git Workflow:** SSH authentication established; `.env` and `node_modules` ignored.

### **Current Sprint Goal**

Successfully implemented POST `/api/profiles` to initialize a lead in the local Postgres DB.
Next focus: GET `/api/profiles` (listing) and data validation.

## PHASE 2: DISCOVERY & INTELLIGENCE (Next Steps)

### **Core Objective**

Transition from manual lead entry to a "Market Mapping" engine that discovers adjacent business niches and enriches them with high-specificity metadata.

### **New Functional Modules**

1.  **Discovery Module (`src/modules/discovery/`)**:
    - **Goal**: Accept a broad business/product type (e.g., "Coffee Roaster") and return adjacent niches based on specificity (High/Low).
    - **Logic**: Uses a "niche-mapping" algorithm (or LLM integration) to provide a selection list for the user to approve before researching.
2.  **Researcher Module (`src/modules/researcher/`)**:
    - **Goal**: Take approved niches and find actual company endpoints (URLs/Names).
    - **Logic**: Performs "Deep Dives" into metadata—scraping for FSVP compliance, technical stacks, and LinkedIn signals.

### **The "Human-in-the-Loop" Workflow**

1.  **Input**: User enters a target industry/product.
2.  **Expand**: Discovery Service maps the "cousin" industries/products.
3.  **Filter**: User selects which adjacent types are actually mission-aligned.
4.  **Execute**: Research Service scrapes metadata for the selected targets.
5.  **Persist**: Validated, enriched data is sent to the Phase 1 `ProfileService` for storage.

### **Strategic Analytical Points**

- **Specificity Toggle**: Allow users to define how far "outside the box" the discovery logic should go.
- **Metadata Goals**: Focus on FSVP compliance status, payment term history, and logistics preferences (DDP/ExWorks).
