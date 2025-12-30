# Architecture Decision Record: Real-time Updates via WebSockets

## Status
Accepted

## Context
For Phase 11 ("Real-time Architecture"), we needed a way to push data updates (e.g., Live Crypto Prices) to the client without forcing the user to refresh the page or relying on inefficient polling.

## Decision
We implemented **FastAPI WebSockets** in the `service-b2b-data` module, integrated with **Redis Pub/Sub** for message broadcasting.

## Technical Justification

### 1. FastAPI vs Django Channels
- **FastAPI:** Highly efficient for asynchronous I/O and easy to set up for simple broadcasting.
- **Redis Pub/Sub:** Acts as the central data bus. The Price Monitor service (Celery) publishes a price update to a Redis channel, and FastAPI immediately broadcasts it to all connected clients.

### 2. Infrastructure (Nginx Gateway)
Nginx was configured to handle WebSocket **Upgrade** headers, routing `/ws/` traffic to the internal port 8001.

### 3. Frontend Integration
The `CryptoTicker` component was refactored to use a persistent WebSocket connection instead of standard API hooks, drastically reducing HTTP overhead.

## Consequences
- **Low Latency:** Price updates are reflected in the UI within milliseconds of being fetched.
- **Scalability:** The decoupled architecture (Producer -> Redis -> Consumer) allows the system to scale horizontally.