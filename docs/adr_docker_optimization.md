# Architecture Decision Record: Docker Optimization & Network Debugging

## Status
Accepted

## Context
Initially, our Docker images were "fat," containing source code, heavy build tools (compilers, node_modules), and running development-only servers. This increased security risks and slowed down deployment cycles. Additionally, we encountered network isolation issues between Nginx and the frontend.

## Decision
We implemented **Multi-Stage Builds** and a hardened **Docker Networking** configuration.

## Technical Justification

### 1. Multi-Stage Builds (The Builder Pattern)
We refactored Dockerfiles to separate the build environment from the runtime environment:
- **Frontend:** Stage 1 uses `node` to compile the app; Stage 2 uses `nginx:alpine` to serve only static assets. Result: Image size reduced from ~500MB to ~20MB.
- **Backend:** Stage 1 installs dependencies and `gcc`; Stage 2 copies only the compiled Virtual Environment (`/opt/venv`). Result: Faster startup and zero build-tool footprint in production.

### 2. Network Stability
We enforced strict network isolation using a dedicated **Bridge Network** (`portfolio_network`).
- **Lesson Learned:** A "502 Bad Gateway" error was traced back to a missing network definition in the frontend service, isolating it from the Nginx proxy. We now verify all inter-service communication using `docker exec curl` diagnostics.

### 3. Nginx Upstream Handling
To prevent Nginx from crashing when backend services are slow to start, we utilized **Lazy Resolution** using Docker's internal DNS (`127.0.0.11`) and variable-based `proxy_pass`.

## Consequences
- **Deployment Efficiency:** Production images are 90% smaller, leading to faster CI/CD pipelines.
- **Security:** The production runtime contains zero source code or build tools, significantly reducing the attack surface.
- **Robustness:** The infrastructure handles service restarts and slow upstreams without crashing the gateway.