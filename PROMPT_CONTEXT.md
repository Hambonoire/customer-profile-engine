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
