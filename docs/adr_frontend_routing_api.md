# Architecture Decision Record: Frontend Architecture & API Integration

## Status
Accepted

## Context
The frontend needs to handle multiple views (Landing Page, Microservices Dashboard) and communicate efficiently with various backend services through a central API Gateway.

## Decision
We adopted a modular architecture based on **React Router** and a dedicated **API Service Layer**.

## Technical Justification

### 1. Unified API Client (Axios)
We implemented a central `apiClient` in `src/api/client.ts`.
- **Base URL:** Set to `/api`, allowing Nginx to handle routing to internal microservices automatically.
- **Interceptors:** Provides a centralized location for global error handling and authentication token injection (future-proofing).

### 2. Decoupled Service Layer
Each microservice has its own definition file (e.g., `fintech.ts`, `b2b.ts`).
- **Benefit:** Components remain "dumb" regarding data fetching details. They only care about the data shapes (TypeScript interfaces), making the UI easier to test and maintain.

### 3. URL-based Routing (React Router v7)
We transitioned from simple conditional rendering to a full routing solution.
- **Benefit:** Enables deep linking (e.g., `/dashboard?view=fintech`), preserves browser history (Back/Forward buttons), and improves overall app navigation.

## Navigation Persistence logic
In the `LandingPage`, we implemented a `useEffect` hook that monitors `location.hash`.
- **Problem:** Standard links to sections (e.g., `/#projects`) would fail if returning from a different route.
- **Solution:** The app automatically parses the hash on load and updates the internal state to scroll the user to the correct project section, ensuring a seamless SPA experience.

## Consequences
- **Scalability:** New microservices can be integrated by simply adding a new API definition and a route.
- **Type Safety:** Shared interfaces between the service layer and components minimize runtime errors.