# Customer Profile Engine (Lead-Gen Analytics)

A modular Domain-Driven Design (DDD) engine built to transform raw lead data into qualified customer profiles. This application goes beyond basic CRUD by tracking mission-critical data points—such as Import Compliance (FSVP) and Logistics Maturity—to automate lead scoring and business intelligence.

## Data Flow Architecture

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
    subgraph Phase_1 [Phase 1: Core Infrastructure]
        P2_An -->|Validated Data| P1_Cont[Profile Controller]
        P1_Cont --> P1_Serv[Profile Service]
        P1_Serv --> P1_Pris[Prisma ORM]
        P1_Pris --> P1_DB[(PostgreSQL DB)]
    end

    %% Legend
    style Phase_1 fill:#f9f,stroke:#333,stroke-width:2px
    style Phase_2 fill:#bbf,stroke:#333,stroke-dasharray: 5 5
```

## Getting Started

### 1. Clone and Install

```bash
git clone git@github.com:Hambonoire/customer-profile-engine.git
cd customer-profile-engine
npm install

```

### 2. Environment Setup

Create a .env file in the root directory and add your local PostgreSQL connection string:
`DATABASE_URL="postgresql://YOUR_USERNAME@localhost:5432/customer_profile_db?schema=public"`

### 3. Database Migration

Initialize your local database and sync the Prisma schema:

`npx prisma migrate dev --name init_local_db`

### 4. Run the App

`node src/server.js`

The server will start at http://localhost:3000.
