# Architecture Decision Record: Frontend Setup & Tooling

## Status
Accepted

## Context
We needed a modern, high-performance development environment for the React frontend that supports TypeScript and provides fast feedback loops.

## Decision
We chose **Vite** as the build tool and **React (TS)** as the core framework.

## Technical Justification

### 1. Vite vs. Create React App (CRA)
- **Vite:** Uses native ES Modules for lightning-fast server starts and Hot Module Replacement (HMR). Its build process (using Rollup) is significantly more optimized for production.
- **CRA:** Now deprecated and relies on legacy Webpack architecture, resulting in slow build times and bloated bundles.
- **Version Pinning:** We use Vite 6.x (LTS) instead of Vite 7.x due to a build regression in v7 causing EISDIR errors during HTML processing.

### 2. Single Page Application (SPA) vs. SSR
We opted for a pure SPA architecture because our business logic is heavily distributed across Python-based microservices. This separation allows the frontend to act as a lightweight "Command Center" while the backends handle data processing.

### 3. Backend Communication via Nginx Proxy
During development, the API resides in a separate Docker container. We configured Nginx to act as a **Reverse Proxy**.
- **Result:** The frontend makes requests to `/api/...` regardless of the environment. This eliminates hardcoded URLs (`localhost:8000`) and resolves Cross-Origin Resource Sharing (CORS) issues before they reach the application code.

### 4. Code Splitting with React.lazy()
- **Lazy Loading:** Pages (LandingPage, DashboardPage) are lazy-loaded using `React.lazy()` to decouple route-based code bundles.
- **Suspense Fallback:** `React.Suspense` provides a loading UI while chunks are being fetched over the network.
- **Bundle Optimization:** Reduces initial bundle size significantly, allowing faster First Contentful Paint (FCP) and Time to Interactive (TTI) metrics.

### 5. Accessibility (WCAG Compliance)
- **ARIA Attributes:** All interactive elements include proper ARIA attributes to support assistive technologies.
- **Icon Buttons:** `aria-label` provides meaningful labels for buttons that use icons only (e.g., close, menu toggle).
- **Toggle States:** `aria-expanded` indicates the open/closed state of collapsible elements and modals.
- **Decorative Icons:** `aria-hidden="true"` hides purely decorative icons from screen readers, reducing noise for users relying on assistive technology.

### 6. SEO Optimization
- **Meta Tags:** Meta description and keywords are dynamically injected for each page, improving search engine visibility.
- **Open Graph Tags:** OG tags (og:title, og:description, og:image, og:url) enable rich previews when content is shared on social platforms.
- **Twitter Card Support:** Twitter-specific meta tags ensure consistent branding and preview quality on Twitter/X.

### 7. Error Handling with React Error Boundary
- **Graceful Degradation:** A class-based Error Boundary component wraps the entire application, preventing full-page crashes.
- **User-Friendly Fallback:** Displays a styled error screen with a "Try Again" button when errors occur.
- **Dev Mode Details:** In development mode, shows detailed error messages and component stack traces for debugging.

### 8. Modular Component Architecture
- **Component Extraction:** Large components (DashboardPage: 275 → 133 lines) were refactored into smaller, focused modules:
  - `DashboardLoginScreen` - Guest authentication UI
  - `DashboardHeader` - Navigation and controls
  - `DashboardTabs` - Tab-based navigation
  - `ArchitectureModal` - System diagram modal
  - `FintechView` - Financial dashboard section
- **Reusability:** Extracted components can be reused across different pages and contexts.
- **Maintainability:** Smaller files are easier to test, review, and modify.

### 9. Centralized Type Definitions
- **Types Folder:** Global TypeScript interfaces are defined in `src/types/index.ts`.
- **Consistent Typing:** Shared types (Account, Transaction, ApiResponse) are imported from a single source.
- **Type Safety:** Eliminates `any` types and ensures compile-time type checking across the codebase.

### 10. Environment Variable Configuration
- **Configurable URLs:** WebSocket and API endpoints are configurable via `.env` files (`VITE_WS_URL`, `VITE_API_URL`).
- **Sensible Defaults:** Fallback values ensure the app works out-of-the-box in local development.
- **Environment Parity:** `.env.example` documents required variables for new developers.

## Consequences
- **Developer Experience (DX):** Near-instant reloads during coding.
- **Portability:** The same Nginx configuration handles routing in both local development and production VPS environments.
