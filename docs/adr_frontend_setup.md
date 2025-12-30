# Architecture Decision Record: Frontend Setup & Tooling

## Status
Accepted

## Context
We needed a modern, high-performance development environment for the React frontend that supports TypeScript and provides fast feedback loops.

## Decision
We chose **Vite** as the build tool and **React (TS)** as the core framework.

## Technical Justification

### 1. Vite vs. Create React App (CRA)
- **Vite:** Uses native ES Modules for lightning-fast server starts and Hot Module Replacement (HMR). Its build process (using Rollup) is significantly more optimized for production.
- **CRA:** Now deprecated and relies on legacy Webpack architecture, resulting in slow build times and bloated bundles.

### 2. Single Page Application (SPA) vs. SSR
We opted for a pure SPA architecture because our business logic is heavily distributed across Python-based microservices. This separation allows the frontend to act as a lightweight "Command Center" while the backends handle data processing.

### 3. Backend Communication via Nginx Proxy
During development, the API resides in a separate Docker container. We configured Nginx to act as a **Reverse Proxy**.
- **Result:** The frontend makes requests to `/api/...` regardless of the environment. This eliminates hardcoded URLs (`localhost:8000`) and resolves Cross-Origin Resource Sharing (CORS) issues before they reach the application code.

## Consequences
- **Developer Experience (DX):** Near-instant reloads during coding.
- **Portability:** The same Nginx configuration handles routing in both local development and production VPS environments.
