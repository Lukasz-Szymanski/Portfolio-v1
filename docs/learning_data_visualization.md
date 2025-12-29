# Learning: Data Visualization & Client-Side Reconstruction

**Date:** 2025-12-22
**Status:** Implemented
**Context:** Phase 6 - Frontend Polish

## 1. Context & Problem
Tabular data (transaction lists) provides detail but lacks immediate insight. Users need to understand trends (e.g., "Is my wealth growing?") and system performance (e.g., "Is the cache working?") at a glance. We needed a charting solution for the React frontend that integrates seamlessly with our "Neon Glass" aesthetic.

## 2. Decision: Recharts vs. Chart.js vs. D3
We evaluated three options:

*   **D3.js:** Powerful but too low-level. Requires massive boilerplate for simple line charts.
*   **Chart.js:** Imperative API, harder to integrate cleanly with React's component lifecycle and Tailwind styling.
*   **Recharts:** **SELECTED.**
    *   **Pros:** Native React components (`<AreaChart>`, `<Pie>`), composable, uses SVG (scales well), easy customization of tooltips/gradients.
    *   **Cons:** Bundle size can be large (mitigated by tree-shaking).

## 3. Implementation Details

### A. Balance History Reconstruction (The "Reverse Ledger" Algorithm)
The Fintech API provides the *Current Balance* and a list of *Recent Transactions*. It does **not** store historical daily balances (to save DB space).

To visualize the balance over time, we implemented a Client-Side Reconstruction algorithm:
1.  Start with `Current Balance`.
2.  Sort transactions by date (newest to oldest).
3.  Iterate backwards: `Previous Balance = Current Balance - Transaction Amount` (reversing the operation).
4.  Map these points to a time series for the chart.

**Trade-off:** This moves computation to the Client (Browser). For a user with <1000 transactions, this is instant. For millions, we would need server-side aggregation (SQL `WINDOW functions`), but for a portfolio prototype, client-side is more responsive and reduces backend complexity.

### B. Real-time Cache Analytics (Redis)
To visualize the B2B Service efficiency, we modified the FastAPI backend to track:
*   `stats:cache_hits`: Incremented when data is found in Redis.
*   `stats:cache_misses`: Incremented when we fallback to the Ministry of Finance API.

This data is exposed via `/api/b2b/system-status` and rendered as a Donut Chart. It provides visual proof of the "Circuit Breaker / Caching" pattern implementation.

## 4. Key Takeaways
*   **Visual Feedback:** Charts make the "invisible" backend work (caching) visible to the user.
*   **Data Derived UI:** We don't always need new API endpoints. Often, the data for visualization (like balance history) is already there, just hidden in the math.
