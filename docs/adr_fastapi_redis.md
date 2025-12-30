# Architecture Decision Record: FastAPI & Redis Integration (B2B Data)

## Status
Accepted (Phase 2)

## Context
For the B2B Data Verifier module, we needed a high-performance service capable of handling external API requests (Ministry of Finance/GUS) and serving real-time data with minimal latency.

## Decision
We chose **FastAPI** as the web framework and **Redis** as the caching layer and message broker.

## Technical Justification

### 1. Asynchronicity (`async/await`)
Traditional synchronous frameworks (like standard Flask) block the entire process while waiting for network I/O. FastAPI uses an **Event Loop**, allowing it to handle thousands of concurrent requests. This is crucial when waiting for slow external government APIs.

### 2. Dependency Injection (`Depends`)
We utilized FastAPI's built-in DI system for Redis clients.
- **Benefit:** Decouples business logic from infrastructure.
- **Testing:** Allows easy swapping of the real Redis instance with a Mock during integration testing without modifying core logic.

### 3. Cache-Aside Pattern
To optimize performance and reduce external API costs, we implemented a caching strategy:
1.  **Hit:** Check Redis first. If data exists, return immediately.
2.  **Miss:** Fetch from live API, store result in Redis with a 60s **TTL (Time To Live)**, and return to user.

## Consequences
The system is highly scalable and resilient to external API rate limits. 
- **Graceful Degradation:** Future improvements could include a fallback mechanism to handle Redis downtime.
- **Standardization:** Pydantic models ensure strict data validation and automatic OpenAPI documentation.