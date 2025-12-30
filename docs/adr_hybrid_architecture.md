# Architecture Decision Record: Hybrid Microservices Architecture

## Status
Accepted

## Context
The project required simulating a diverse business ecosystem consisting of two distinct domains: a stable, transaction-heavy banking core and a high-speed data caching/proxy service.

## Decision
We adopted a **Hybrid Framework Strategy**, utilizing the "Best Tool for the Job" approach:
- **Django + Django Ninja** for the Fintech Core.
- **FastAPI** for the B2B Data Service.

## Technical Justification

### 1. Django Ninja (Fintech Core)
- **Why:** We needed a robust ORM, stable database migrations, and built-in security for the transaction engine. Django provides the stability required for ACID-compliant banking logic.
- **Ninja Integration:** Using Django Ninja allows us to maintain Pydantic-based type safety and high performance without leaving the Django ecosystem.

### 2. FastAPI (B2B & Price Monitor)
- **Why:** The B2B service acts as a lightweight proxy for external government APIs. FastAPI's superior handling of asynchronous I/O and near-zero overhead makes it ideal for caching and real-time data streaming.

### 3. Inter-service Communication
Both services are orchestrated via Docker Compose and sit behind an Nginx gateway, ensuring they appear as a single unified API to the frontend.

## Consequences
- **Architectural Flexibility:** Demonstrates the ability to integrate diverse frameworks into a cohesive microservices stack.
- **Performance Optimization:** Each service is tuned to its specific workload (relational consistency vs. asynchronous throughput).