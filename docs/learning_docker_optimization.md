# Learning: Docker Optimization & Network Debugging

**Date:** 2025-12-22
**Status:** Implemented
**Context:** Phase 8 - Production Readiness

## 1. Context & Problem
Initially, our Docker images were "fat". They contained source code, build tools (gcc, poetry, node_modules), and ran development servers (`vite`, `uvicorn --reload`). This is fine for localhost but unacceptable for production due to:
*   **Security:** Source code exposure.
*   **Size:** Images > 500MB slow down deployment.
*   **Performance:** Dev servers are not optimized for traffic.

Additionally, we faced a "502 Bad Gateway" loop caused by a network isolation issue in Docker Compose.

## 2. Solution: Multi-Stage Builds
We refactored all `Dockerfile`s to use the **Builder Pattern**:

### Frontend (React)
1.  **Stage 1 (Builder):** Uses `node:20-alpine`. Installs dependencies and runs `npm run build`.
2.  **Stage 2 (Production):** Uses `nginx:alpine`. Copies only the `/dist` folder. Size: ~20MB.
3.  **Stage 3 (Dev):** Kept separate via `target: development` in `docker-compose.yml` to maintain Hot Reload.

### Backend (Python)
1.  **Stage 1 (Builder):** Installs `gcc` and compiles dependencies into a Virtual Environment (`/opt/venv`).
2.  **Stage 2 (Runtime):** Copies only `/opt/venv` and source code. No compilers, no poetry.

## 3. The "Missing Network" Incident
We encountered a persistent `502 Bad Gateway` where Nginx could not see the Frontend container. 
**Root Cause:** The `frontend` service in `docker-compose.yml` was missing the `networks: - portfolio_network` configuration. Docker assigned it to a `default` network, isolating it from Nginx.
**Lesson:** Always verify `networks` in `docker-compose.yml` when services cannot ping each other by name.

## 4. Nginx Stability
To prevent Nginx from crashing when upstream services start slowly, we implemented:
*   **Lazy Resolution:** Using Docker's internal DNS (`127.0.0.11`) and variables (`set $upstream http://frontend...`).
*   **Restart Policy:** `restart: always` (temporarily considered) vs correct dependency management.

## 5. Key Takeaways
*   **Optimization:** Production images are now 90% smaller.
*   **Separation:** We successfully separated "Dev Mode" (Hot Reload) from "Prod Mode" (Static Nginx) using the same Dockerfile.
*   **Debugging:** `docker exec curl` is the ultimate tool for diagnosing network isolation.
