# Architecture Decision Record: Asynchronous Background Tasks (Celery)

## Status
Accepted

## Context
In modern web systems, certain operations (PDF generation, email sending, crypto price fetching) are too slow to be handled during a standard HTTP request. Blocking the user for 10 seconds is unacceptable.

## Decision
We implemented **Celery** as the task queue system and **Redis** as the message broker.

## How it works (The Producer-Consumer Pattern)
1.  **Producer:** The API (Django/FastAPI) triggers a task (e.g., "Generate Report").
2.  **Broker (Redis):** Acts as a mailbox, storing task messages in RAM.
3.  **Worker (Celery):** A background process that picks up messages from the broker and executes them.

## Technical Justification
*   **Scalability:** We can spawn multiple worker containers to handle heavy loads without slowing down the API.
*   **Reliability:** Celery provides built-in mechanisms for task retries and error handling.
*   **Separation of Concerns:** Business logic (API) is decoupled from data processing (Price Monitor service).

## Application in Project
The `service-price-monitor` operates as both a **Celery Beat** (scheduler) and a **Worker**, fetching real-time market data every minute and updating the system state.