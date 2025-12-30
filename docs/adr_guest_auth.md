# Architecture Decision Record: Guest Session Management (Auth-Lite Strategy)

## Status
Accepted

## Context
The portfolio project is designed for recruiters and technical leads. Requiring a full account registration (sign-up/sign-in) creates unnecessary friction, often leading to potential employers skipping the live demo entirely.

## Decision
We implemented a **"Guest Access"** mechanism based on client-side `localStorage` and a dedicated backend initialization endpoint.

## Technical Justification

### 1. Zero-Friction Experience
Instead of a standard OAuth2 or JWT-based auth flow, we generate a unique `Guest_ID` on the first click. This provides an immediate, interactive experience while maintaining data isolation.

### 2. On-Demand Data Seeding
Upon initializing a guest session, the backend triggers a specialized "Seed Process" that creates a temporary bank account, generates a realistic transaction history, and links it to the session ID.

### 3. Client-Side Persistence
Using `localStorage` ensures that if a recruiter refreshes the page or returns later, their "Vault" remains accessible without requiring a database session or cookies.

## Consequences
- **User-Centric Design:** Demonstrates the ability to design systems around the end-user's journey (User-Centric Architecture).
- **Security Limitation:** This is a "Simulated Auth" pattern. In a real-world production environment, this would be replaced by a hardened JWT/Cookie strategy.