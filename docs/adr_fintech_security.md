# Architecture Decision Record: Fintech Security & Data Integrity

## Status
Accepted

## Context
A financial simulation requires higher security standards than a typical web app. We needed to ensure that transactions are immutable, protected from tampering, and mathematically accurate.

## Decision
We implemented a multi-layered security and integrity strategy focusing on ACID compliance, precise arithmetic, and secure third-party integrations.

## Technical Justification

### 1. Data Integrity: Decimal vs. Float
We strictly use the `Decimal` data type for all currency operations. 
- **Reason:** Floating-point numbers (float/double) cannot accurately represent base-10 fractions (e.g., `0.1 + 0.2` results in `0.30000000000000004`). 
- **Impact:** Ensures that account balances are always exact, preventing "missing cents" over time.

### 2. Transaction Integrity: ACID Compliance
All fund movements (transfers, deposits) are wrapped in `transaction.atomic()` blocks.
- **Atomicity:** Guarantees that if one part of a transfer fails (e.g., receiver account not found), the entire operation is rolled back.
- **Isolation:** We use `select_for_update()` to lock account rows during processing, preventing race conditions where two simultaneous transfers could overdraw an account.

### 3. Integration Security: Stripe Webhooks
For the top-up system, we implemented a signature-verified webhook handler.
- **Verification:** Every incoming request from Stripe is validated using a shared secret (`STRIPE_WEBHOOK_SECRET`).
- **Impact:** Prevents attackers from spoofing "successful payment" signals to artificially inflate their balance.

### 4. Endpoint Authorization
The transaction PDF generation endpoint implements authorization checks to ensure users can only access their own transaction documents.
- **Verification:** Before generating or serving a transaction PDF, the system verifies that the requesting user owns the account associated with the transaction. This check compares the user's account ID against the transaction's linked account.
- **Protection:** Prevents unauthorized access to sensitive financial documents by rejecting requests for transactions belonging to other users.
- **Response:** Returns a `403 Forbidden` HTTP status code when an unauthenticated or unauthorized access attempt is made, clearly signaling that the requested resource is inaccessible without proper authorization.

## Consequences
- **Trust:** The system mimics real-world banking reliability.
- **Auditability:** Every balance change is linked to an immutable transaction log, making the system easy to audit and debug.