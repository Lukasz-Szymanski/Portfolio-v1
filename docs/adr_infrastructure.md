# Architecture Decision Record: Infrastructure & Gateway Strategy

## Status
Accepted

## Context
We needed a way to orchestrate multiple services (React, FastAPI, Django, Redis, Postgres) and ensure consistent behavior across different environments (Windows dev machine and Linux VPS).

## Decision
We chose **Docker Compose** for orchestration and **Nginx** as the API Gateway (Reverse Proxy).

## Technical Justification

### 1. Docker Compose vs Manual Setup
- **Manual:** Running 5 terminal windows is error-prone ("it works on my machine") and hard to replicate.
- **Compose:** Defines the entire stack in a single YAML file. One command (`docker compose up`) builds and starts everything in isolated containers.

### 2. Nginx as API Gateway
- **Problem:** Cross-Origin Resource Sharing (CORS) issues when the frontend (port 5173) talks directly to backend services (ports 8001, 8002).
- **Solution:** All traffic goes through Nginx on port 80. Nginx routes requests based on URL paths (e.g., `/api/fintech/` -> Service A).
- **Benefit:** Simplifies frontend code (unified base URL) and centralizes SSL/Security configuration.

### 3. Isolated Networks
We implemented a dedicated **Bridge Network** (`portfolio_network`). Containers communicate using service names (e.g., `host: postgres`) instead of fragile IP addresses.

## Consequences
The environment is portable and production-ready. Any developer can clone the repo and start the project instantly. It also prepares the ground for a seamless migration to a VPS server.