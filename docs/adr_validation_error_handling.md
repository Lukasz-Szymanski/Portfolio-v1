# Architecture Decision Record: API Validation & Error Handling

## Status
Accepted

## Context
During the initial implementation of the `POST /accounts/` endpoint, a 500 Internal Server Error was triggered when a user provided an invalid currency code. This error originated directly from the PostgreSQL layer, which is undesirable as it leaks technical database details and places unnecessary load on the DB for requests destined to fail.

## Decision
We implemented a **"Fail-Fast" Validation Strategy** using Pydantic schemas at the API layer.

## Technical Justification

### 1. Schema-Level Validation (Pydantic / Ninja Field)
We utilized `ninja.Field` to define strict constraints (e.g., `max_length`, `min_length`, `regex`) directly within the Request Schemas.
- **Benefit:** Django Ninja intercepts invalid data and automatically returns a **422 Unprocessable Entity** response before any business logic or database queries are executed.
- **The 4xx vs. 5xx Rule:** We ensure that client-side errors result in 4xx codes, while 5xx codes are reserved exclusively for genuine server-side failures.

### 2. Schema-to-Database Mirroring
Constraints in the API Schemas are designed to be mirrors of the constraints in `models.py`. This ensures that data integrity is maintained at every level of the stack.

### 3. Frontend DX & UX
By returning structured JSON error messages (e.g., `loc: ["body", "currency"], msg: "string_too_long"`), we enable the frontend to provide immediate, field-specific feedback to the user, significantly improving the overall UX.

## Alternatives Considered
- **Model-Level Validation Only:** Rejected. Django Model validation triggers during the `save()` process, which would still result in unhandled exceptions and 500 errors unless wrapped in extensive `try/except` boilerplate.
- **Frontend-Only Validation:** Rejected. As a security best practice, we never trust data from the client. Server-side validation remains our ultimate line of defense.

## Consequences
- **Security:** Reduced risk of SQL injection or database information leakage.
- **Efficiency:** The database only processes valid, well-formed data.
- **Maintainability:** Clear separation between data validation and business logic.