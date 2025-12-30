# Architecture Decision Record: Redis as a Shared State & Broker

## Status
Accepted

## Context
A microservices ecosystem requires a reliable mechanism for inter-service communication (API <-> Background Workers) and high-performance data caching to reduce latency.

## Decision
We implemented **Redis** as our primary Message Broker and Key-Value store.

## Technical Justification

### 1. Architectural Decoupling
Redis acts as the central data bus. For instance, the Price Monitor service (Worker) remains agnostic of the Frontend; it simply publishes data to Redis. The B2B Service then consumes this data. This decoupling allows each component to scale and evolve independently.

### 2. The Cache-Aside Pattern
In the B2B Service, we utilize Redis to store external API results (e.g., company data).
- **Benefit:** Drastically reduces the number of expensive external API calls.
- **Latency:** Serving data from RAM (Redis) is orders of magnitude faster than querying a remote government server.

### 3. Celery Broker
Redis was chosen as the task broker for Celery due to its near-zero configuration and high throughput for message queueing.

## Key Learnings
- Configuration of Redis within an isolated Docker network.
- Implementing robust caching logic with TTL (Time To Live).
- Managing real-time data streams using Redis Pub/Sub for WebSockets.

## Consequences
- **Performance:** Significant improvement in response times for frequently accessed data.
- **Resilience:** If an external service goes down, the system can still serve the last cached result.