# Architecture Decision Record: API Gateway (Nginx Reverse Proxy)

## Status
Accepted

## Context
In a microservices architecture, each service runs on its own internal port (8001, 8002, etc.). Exposing these ports directly to the public internet is insecure and impractical for the frontend (handling multiple URLs and CORS issues).

## Decision
We implemented **Nginx** as a centralized **API Gateway / Reverse Proxy** listening on standard port 80.

## Technical Justification

### 1. Unified Entry Point
Users only connect to port 80. Nginx analyzes the URL path and routes traffic to the correct container within the isolated Docker network:
- `/` -> Frontend (React)
- `/api/b2b/` -> Service B2B (FastAPI)
- `/api/fintech/` -> Service Fintech (Django Ninja)

### 2. Technology Abstraction
The frontend remains agnostic of the backend technology stack. It communicates with a single IP/Domain, allowing backends to be swapped or scaled (e.g., migrating a FastAPI service to Go) without changing a single line of React code.

### 3. Network Isolation & Security
Microservice containers do not expose their ports to the host machine. Communication between the Gateway and the services happens strictly within the private `portfolio_network` bridge, significantly reducing the system's attack surface.

## Consequences
- **Simplified Development:** No more CORS headers management across multiple services.
- **Infrastructure Portability:** The gateway configuration remains consistent when moving from a local dev machine to a production VPS.