# Architecture Decision Record: Financial Data Schema & Integrity

## Status
Accepted

## Context
The Fintech Simulator requires a database schema capable of handling high-integrity financial records, including account balances and immutable transaction logs.

## Decision
We implemented a relational model in PostgreSQL with strong numerical typing and audit trails.

## Technical Justification

### 1. Account Model & UUIDs
- **Primary Key:** We used `UUID` instead of standard integers. This prevents ID enumeration (security) and simplifies data synchronization across microservices.
- **Precision:** Balances are stored using `DecimalField` (12 digits, 2 decimal places).
- **Critical Choice:** We strictly avoid `Float` for money. `Decimal` provides constant precision, eliminating binary representation errors (e.g., `0.1 + 0.2 != 0.3`).

### 2. Transaction Model & Immutability
- **Audit Trail:** Every balance change is linked to a `Transaction` record.
- **Pattern:** Transactions are **Append-Only**. Instead of merely updating the `balance` field, we create a record of the event. This ensures a full history for debugging and auditing (standard banking practice).

### 3. ACID Compliance
By utilizing PostgreSQL and Django's `transaction.atomic`, we wrap multi-account operations (like transfers) in a single unit of work. If any part of the transfer fails, the entire operation is reversed, preventing data corruption.

## Alternatives Considered
- **NoSQL (e.g., MongoDB):** Rejected. Document databases lack the native, high-reliability multi-document transaction support required for banking cores. Relational SQL remains the industry gold standard for financial data.