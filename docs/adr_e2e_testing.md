# Architecture Decision Record: End-to-End Testing with Playwright

## Status
Accepted

## Context
In a microservices architecture, individual unit tests cannot guarantee that the entire system works together. Issues with Nginx routing, CORS, or database connectivity only surface during integration. We needed a way to verify the "Critical Path" of the application.

## Decision
We chose **Playwright** as our End-to-End (E2E) testing framework.

## Technical Justification

### 1. Why Playwright (vs Cypress/Selenium)?
- **Speed:** Uses a native WebSocket protocol for faster execution compared to Cypress (which runs inside the browser) or Selenium (legacy architecture).
- **Multi-Browser Support:** Natively supports Chromium, Firefox, and WebKit out of the box.
- **Auto-Waiting:** Drastically reduces "flaky" tests by automatically waiting for elements to be actionable.

### 2. Test Suite Coverage
Our test file (`e2e/core-flow.spec.ts`) contains comprehensive test suites:

#### Fintech Critical Path
1.  **System Entry:** Verifies Nginx routing by loading the dashboard.
2.  **State Initialization:** Clicks "Guest Access" to verify Django/Postgres account creation logic.
3.  **Data Integrity:** Performs a virtual money transfer, acting as the ultimate test for our **ACID compliance** across Frontend, API, and Database.
4.  **UI Feedback:** Asserts that success messages and state updates are rendered correctly.

#### Landing Page Navigation
- Tests navigation between all sections (About, Tech Stack, AI Workflow, Projects, Hobby, Contact).
- Verifies section visibility and content rendering.

#### B2B Data Verifier
- Verifies company NIP lookup functionality.
- Tests integration with external government APIs.

#### Crypto Price Monitor
- Tests WebSocket connection and real-time price display.
- Verifies Bitcoin and Ethereum prices are displayed correctly.

#### Contact Form
- Tests form validation and submission.
- Verifies success message rendering.

## Consequences
- **Refactoring Confidence:** We can modify backend or frontend code and verify system integrity in seconds.
- **Infrastructure Verification:** Validates that `docker-compose.yml` and Nginx configurations are correct in a production-like environment.