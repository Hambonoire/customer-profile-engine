System Overview: Analytic-Lead-Gen-App

Project Goal

To transform business lead generation from manual entry into an automated "Market Mapping" and discovery engine. The app identifies adjacent business niches (Discovery) and enriches those targets with high-specificity technical and regulatory metadata (Research).

Core Architecture

- Paradigm: Object-Oriented Programming (ES6 Classes)
- Pattern: Modular Domain-Driven Design (DDD)
- Validation: Joi (Schema-based, enforced via Global Middleware)
- Storage: PostgreSQL with Prisma ORM

High-Level Data Flow (Phase 1 & 2)

1. Input (User/Trigger): Broad industry or product type (e.g., "Organic Tea").
2. Discovery (Intelligence):
   1. Maps "cousin" niches based on a Specificity Toggle.
   2. Example: Low Specificity (Tea Brands) vs. High Specificity (Biodegradable Packaging Suppliers).
3. Human-in-the-Loop: User selects which discovered niches are mission-aligned.
4. Research (Enrichment):
   1. Scrapes company endpoints.
   2. Extracts metadata: FSVP Compliance, Technical Stacks, and Logistics terms.
5. Persistence (Storage): Enriched leads are validated via Joi and saved to Postgres via Prisma.

Module Breakdown

1. Profile Module (src/modules/profile/)
   - Responsibility: Data persistence and lifecycle of a "Lead."
   - Primary Entity: CustomerProfile.
   - Key Logic: Handles creation, retrieval, and analytical scoring.
2. Discovery Module (src/modules/discovery/)
   - Responsibility: Niche expansion and market mapping.
   - Key Logic: Uses algorithmic or LLM-based logic to suggest adjacent industry targets before research begins.
3. Researcher Module (src/modules/researcher/)
   - Responsibility: Data extraction and metadata verification.
   - Key Logic: Scrapes the web for specific compliance footprints (FDA/FSVP) and tech stacks.
4. Shared Layer (src/shared/)
   - Middleware: Global Joi validation to ensure data integrity across all entry points.
   - Utils: Common helper functions for formatting and logging.

Tech Stack Decisions

- Node.js (Plain JS): Chosen for rapid development and flexibility without the build-step overhead of TypeScript.
- Prisma (Singleton Pattern): Used for type-safe database queries within Class Services.
- Joi: Selected for robust schema validation and input sanitization (strip-unknown logic).
