# Learning: End-to-End Testing with Playwright

**Date:** 2025-12-22
**Status:** Implemented
**Context:** Phase 7 - Engineering Excellence

## 1. Context & Problem
In a microservices architecture, unit tests are not enough. Even if every service works in isolation, the system can still fail due to:
*   Incorrect Nginx routing.
*   CORS issues between Frontend and API.
*   Database connection failures.
*   Frontend state management bugs.

We needed a way to verify the "Critical Path" – the most important journey a user takes through the application.

## 2. Decision: Playwright vs. Cypress vs. Selenium
*   **Selenium:** Too slow, relies on external drivers, old architecture.
*   **Cypress:** Popular, but runs inside the browser (limitations with multiple tabs/iframes) and is slower than Playwright.
*   **Playwright:** **SELECTED.**
    *   **Pros:** Extremely fast (native WebSocket protocol), supports all modern browsers (Chromium, Firefox, WebKit), excellent auto-waiting logic (reduces flaky tests), and built-in "Trace Viewer".

## 3. Implementation: The "Critical Path" Test
Our test (`e2e/core-flow.spec.ts`) simulates a real guest user:
1.  **Navigation:** Loads the dashboard (verifying Nginx routing).
2.  **Auth Simulation:** Clicks "Guest Access", triggering the backend's demo initialization (verifying Django logic & Postgres persistence).
3.  **Cross-Module Flow:** Navigates from Overview to Fintech.
4.  **Transaction Integrity:** Performs a transfer. This is the ultimate test for our **ACID compliance** – it verifies that the frontend, FastAPI/Django, and Postgres all work together to move virtual money.
5.  **UI Feedback:** Asserts that the success message appears, ensuring the React state was updated correctly.

## 4. Key Takeaways
*   **Tests as Documentation:** A well-written E2E test shows exactly how the system is supposed to work.
*   **Confidence in Refactoring:** Now, if we change the backend code, we can run `npm run test:e2e` to be 100% sure we didn't break the money transfer logic.
*   **Infrastructure Verification:** Because the test runs against the Dockerized environment (`http://localhost`), it also verifies our `docker-compose.yml` and Nginx configurations.
