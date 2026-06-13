# Customer Profile Engine

> A modular lead-generation and market-mapping engine built in Node.js with Domain-Driven Design architecture.

Built and maintained by **Ryan Landry** — a self-taught JavaScript developer working in an AI-assisted development workflow with full architectural ownership. Every module, design decision, and line of code in this project has been planned, reviewed, and understood before it ships.

---

## What This Is

The Customer Profile Engine transforms raw lead data into qualified customer profiles. It goes beyond basic CRUD by tracking mission-critical business intelligence data points — including Import Compliance (FSVP) and Logistics Maturity — to automate lead scoring. Phase 2 will introduce automated niche discovery with a human-in-the-loop filtering workflow.

---

## Stack

| Layer        | Technology                               |
| ------------ | ---------------------------------------- |
| Runtime      | Node.js (JavaScript ES6+, no TypeScript) |
| ORM          | Prisma v6                                |
| Database     | PostgreSQL (local, port 5432)            |
| Validation   | Joi (schema-based global middleware)     |
| Architecture | Modular DDD, OOP (ES6 Classes), REST API |

---

## Architecture

```mermaid
graph TD
    %% Phase 2: Intelligence & Discovery
    subgraph Phase_2 [Phase 2: Discovery & Intelligence]
        P2_In[User Inputs Business Type] --> P2_Disc[Discovery Service: Map Adjacent Niches]
        P2_Disc --> P2_User[User Selects Target Niches]
        P2_User --> P2_Res[Researcher Service: Scrape & Fetch Metadata]
        P2_Res --> P2_An[Analytical Engine: Calculate Lead Score]
    end

    %% Phase 1: Core Infrastructure (Already Built)
    subgraph Phase_1 [Phase 1: Core Infrastructure ✅]
        P2_An -->|Validated Data| P1_Cont[Profile Controller]
        P1_Cont --> P1_Serv[Profile Service]
        P1_Serv --> P1_Pris[Prisma ORM]
        P1_Pris --> P1_DB[(PostgreSQL DB)]
    end

    style Phase_1 fill:#f9f,stroke:#333,stroke-width:2px
    style Phase_2 fill:#bbf,stroke:#333,stroke-dasharray: 5 5
```

### Key Architectural Decisions

- **Plain JavaScript + OOP:** ES6 Classes are used as blueprints; Route files instantiate Controllers, keeping concerns cleanly separated.
- **Global Validation Middleware (GVM):** A `validate(schema)` middleware runs Joi validation on `req.body` before any request reaches a Controller — enforcing schema integrity at the boundary.
- **Prisma Singleton in Service Constructors:** `PrismaClient` is initialized inside each Service constructor (`this.prisma = new PrismaClient()`) for better encapsulation rather than a shared global instance.
- **Documentation as Code:** The `docs/` folder is Git-tracked and treated as institutional knowledge, including Architecture Decision Records (ADRs) and system overviews, to support long-term maintainability.

---

## Project Structure

```
src/
├── modules/
│   ├── profile/       # Phase 1 ✅ — Fully refactored to OOP
│   ├── discovery/     # Phase 2 🔜 — Niche mapping logic
│   └── researcher/    # Phase 2 🔜 — Deep-dive scraping
└── shared/
    ├── validate.middleware.js
    └── validators/    # Joi schemas

docs/
├── architecture/      # System overview, module diagrams
├── adr/               # Architecture Decision Records
└── api/               # API documentation
```

---

## Roadmap

**Phase 1 — Core Infrastructure ✅ Complete**

- Profile module with full OOP refactor
- Global validation middleware
- PostgreSQL persistence via Prisma

**Phase 2 — Discovery & Intelligence 🔜 In Progress**

- `DiscoveryService`: maps adjacent business niches based on a breadth/specificity parameter
- Human-in-the-loop filtering: user selects mission-aligned targets before execution
- `ResearcherService`: scrapes and enriches metadata (FSVP status, tech stack, etc.)
- Lead scoring via Analytical Engine

---

## Getting Started

### 1. Clone and Install

```bash
git clone git@github.com:Hambonoire/customer-profile-engine.git
cd customer-profile-engine
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```
DATABASE_URL="postgresql://YOUR_USERNAME@localhost:5432/customer_profile_db?schema=public"
```

### 3. Database Migration

```bash
npx prisma migrate dev --name init_local_db
```

### 4. Run the App

```bash
node src/server.js
```

Server starts at `http://localhost:3000`.

---

## Documentation

- [System Overview](./docs/architecture/sytem-overview.md)
- [Architecture Decision Records](./docs/adr/)
- [API Docs](./docs/api/)

---

## About the Developer

Ryan Landry is a self-taught developer based in Conway, AR, with a background in design, operations, and client services. He works in an AI-assisted development workflow — using AI tooling for velocity while maintaining full architectural ownership, reviewing every line of code, and making deliberate system-design decisions.

- GitHub: [github.com/Hambonoire](https://github.com/Hambonoire)
- Training: [The Odin Project](https://www.theodinproject.com)
