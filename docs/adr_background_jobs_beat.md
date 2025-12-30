# Architecture Decision Record: Periodic Tasks & Celery Beat

## Status
Accepted

## Context
Not all system actions are triggered by users. Certain operations must occur automatically at predefined intervals, such as fetching real-time exchange rates, cleaning up logs, or generating daily financial reports.

## Decision
We implemented **Celery Beat** as the task scheduler for periodic background operations.

## Technical Justification

### 1. Ad-hoc vs. Periodic Tasks
- **Ad-hoc (Phase 4a):** Tasks triggered by the API (e.g., `test-worker`). Ideal for heavy operations initiated by user actions.
- **Periodic (Phase 4b):** Tasks triggered by time (e.g., `fetch_crypto_prices`). Essential for system monitoring and maintenance.

### 2. Beat Architecture
Celery Beat is a separate scheduler process (running with the `-B` flag in our container). It acts as a clock, sending messages to the Redis broker every 60 seconds (per our `beat_schedule` configuration). Any available worker then picks up and executes the task.

### 3. Scalability & Concurrency
The architecture allows for an infinite number of workers. Since the scheduler (Beat) sends only one message per interval, we prevent redundant executions (e.g., multiple workers fetching the same price simultaneously), ensuring resource efficiency.

## Consequences
The system gains **Autonomy**. The backend remains active, updating critical market data even when no users are connected to the platform, ensuring the system is always ready with fresh data.