# Architecture Decision Record: Atomic Transactions & ACID Compliance

## Status
Accepted

## Context
In financial operations, specifically account transfers, we must guarantee that every operation is indivisible. A failure mid-process (e.g., server crash or database timeout) must not result in money being deducted from the sender without being credited to the receiver.

## Decision
We implemented strict **ACID compliance** using Django's `transaction.atomic` blocks and database-level row locking with `select_for_update()`.

## Technical Justification

### 1. Atomicity via transaction.atomic
The `with transaction.atomic():` block ensures that all SQL queries within it are treated as a single unit of work. If any exception occurs, the database performs a **ROLLBACK**, restoring the state to before the transaction started.

### 2. Preventing Race Conditions
We utilized `Account.objects.select_for_update().get(id=sender.id)`. 
- **Mechanism:** This issues a `SELECT ... FOR UPDATE` SQL command, which locks the specific row in PostgreSQL.
- **Benefit:** If two transfers occur simultaneously from the same account, the second transaction waits for the first to complete, preventing "Double Spending" bugs.

### 3. Data Integrity
- **Sender:** Identified by internal `UUID` for security and performance.
- **Receiver:** Identified by `Account Number` to mirror real-world banking logic.

## Consequences
- **Reliability:** The system is mathematically guaranteed to be consistent (Consistent in ACID).
- **Performance Trade-off:** Row-level locking introduces minor latency under extreme concurrency, which is an acceptable and standard trade-off for banking systems.