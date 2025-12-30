# Architecture Decision Record: Frontend State Management (TanStack Query)

## Status
Accepted

## Context
Synchronizing local UI state with server-side data (Postgres/Redis) is a complex task. We needed a way to handle data fetching, caching, and state invalidation (e.g., updating the balance after a transfer) without writing manual, error-prone boilerplate code.

## Decision
We implemented **TanStack Query** (formerly React Query) for asynchronous state management.

## Technical Justification

### 1. Declarative Data Fetching
Instead of complex `useEffect` chains, we use the `useQuery` hook.
- **Benefit:** Natively provides `isLoading`, `isError`, and `data` states, making it easy to build resilient UIs that handle network failures gracefully.

### 2. Intelligent Cache Invalidation
This is the "core engine" of our Dashboard:
- When a user performs an action (e.g., a money transfer via `useMutation`), we trigger `queryClient.invalidateQueries({ queryKey: ['accounts'] })`.
- TanStack Query automatically marks the account data as "stale" and re-fetches it in the background.
- **Result:** The user sees the updated balance instantly without a full page refresh.

### 3. Network Optimization
The library prevents redundant API calls by serving "fresh" data from the cache, reducing the load on our microservices and providing a snappier user experience.

## Alternatives Considered
- **Redux / Context API:** Rejected for data fetching. These tools require massive amounts of boilerplate code for simple HTTP operations. TanStack Query is specifically designed for server-state.
- **Native Fetch + useState:** Rejected due to lack of built-in caching, re-validation, and difficulty in synchronizing data across multiple components.

## Consequences
The frontend logic is significantly cleaner and more reliable. We have a robust system for handling real-time data synchronization with minimal code complexity.