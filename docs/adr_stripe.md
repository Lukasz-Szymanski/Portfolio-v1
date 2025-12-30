# Architecture Decision Record: Stripe Payments Integration

## Status
Accepted

## Context
Phase 10 required a secure, reliable way to handle real-world financial transactions for account top-ups within the simulation.

## Decision
We integrated **Stripe Checkout** for payment processing and implemented a secure **Webhook Handler** for real-time balance synchronization.

## Technical Challenges & Solutions

### 1. Financial Precision (Decimal vs. Float)
During implementation, we resolved a `TypeError` arising from type mismatch. Stripe provides amounts as `floats/cents`, while our banking core uses `Decimal`.
- **Solution:** Explicit casting to `Decimal` within the webhook logic to ensure 100% mathematical accuracy and prevent rounding errors common in standard floating-point arithmetic.

### 2. Sidecar Utility (Dockerized Stripe CLI)
To simplify the developer experience (DX), we containerized the Stripe CLI.
- **Benefit:** The environment is fully portable. `docker compose up` automatically starts the webhook forwarding service, eliminating the need for local tool installation.

## Security
- **Signature Verification:** All incoming webhooks are validated against the `STRIPE_WEBHOOK_SECRET` to prevent spoofing attacks.
- **Atomic Updates:** Balance updates are wrapped in database transactions to ensure data consistency.

## Consequences
The system demonstrates the ability to integrate with high-compliance third-party financial services while maintaining strict local data integrity.