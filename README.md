# Portfolio: Microservices Architecture Demo

![Status](https://img.shields.io/badge/Status-Production_Ready-success)
![UI](https://img.shields.io/badge/Design-Neon_Glass-blue)
![Stack](https://img.shields.io/badge/Stack-Python_|_React_|_Docker-blue)
[![Portfolio CI](https://github.com/Lukasz-Szymanski/Portfolio-v1/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Lukasz-Szymanski/Portfolio-v1/actions/workflows/ci.yml)

This repository serves as my **Main Portfolio Hub**, acting as a central gateway for a series of integrated technical projects. Rather than a static landing page, I built a living ecosystem of microservices that demonstrates full-stack engineering skills in a real-world environment.

---

## 🎯 Project Goal

The primary objective is to showcase modern approaches to building distributed web applications. The Frontend acts as a command center for several demo modules:
- **Fintech Core:** A high-integrity transaction simulation system.
- **B2B Data Verifier:** A real-time proxy for public government data.
- **AI Assistant:** An intelligent chat interface powered by Large Language Models (LLM).

---

## 🛠️ Featured Side Projects

Beyond the microservices ecosystem, this hub spotlights:
*   **Git-Sensei CLI:** An AI-powered terminal tool that automates the generation of professional git commit messages by analyzing code diffs. Supports Gemini, Claude, and local models via Ollama.

---

## 🏗 Architecture

The system consists of three independent microservices and an API Gateway, orchestrated using Docker containers.

### 1. Fintech Service (Banking Core)
- **Tech Stack:** Django 5.0 + Django Ninja + PostgreSQL
- **Role:** Handles account management, transaction history, and secure fund transfers (ACID compliant). Includes automated PDF confirmation generation.

### 2. B2B Data Service (Real-time Proxy & AI)
- **Tech Stack:** FastAPI + Redis + LangChain
- **Role:** Integrates with government APIs, manages WebSockets for price streaming, and powers the RAG-based AI Chatbot.

### 3. Price Monitor Service (Background Worker)
- **Tech Stack:** Celery + Redis (Broker)
- **Role:** Monitors cryptocurrency markets in the background, updating the shared state every 60 seconds.

---

## 💡 Unique Features

*   **🤖 AI Engineering:** `Status: ✅ COMPLETED` – Intelligent "Portfolio AI" chatbot using a Hybrid Model (Local Knowledge Base + Google Gemini 1.5 Flash).
*   **📡 Real-time WebSockets:** `Status: ✅ COMPLETED` – Live cryptocurrency price streaming (Push vs. Pull) utilizing Redis Pub/Sub and FastAPI.
*   **🚀 Automated CI/CD:** `Status: ✅ COMPLETED` – Full quality rigor via GitHub Actions – automated tests, linting (Ruff, ESLint), and build-checks on every commit.
*   **💳 Stripe Payments:** `Status: ✅ COMPLETED` – Integrated account top-up system using Stripe Checkout and secure Webhooks.
*   **🛡️ Architecture X-Ray Mode:** `Status: ✅ COMPLETED` – A developer-centric "X-Ray" toggle that deconstructs the UI into its technical components.
*   **📊 Data Visualization:** `Status: ✅ COMPLETED` – Interactive financial charts (Recharts) featuring a balance reconstruction algorithm.
*   **🧪 Automated E2E Testing:** `Status: ✅ COMPLETED` – Comprehensive Playwright test suite for critical path regression testing.
*   **✨ Quality Assurance:** Strict enforcement of Ruff (Python) and TypeScript (Strict Mode).
*   **🐳 Production-Ready Docker:** Multi-stage builds and optimized container orchestration.
*   **📱 Premium UI/UX:** Neon Glass aesthetic, Zero-Scroll policy, and full mobile responsiveness.

---

## 🔒 Security & Code Quality

### 🛡️ Security Hardening
*   **Authorization Checks on Protected Endpoints** - Transaction PDF access requires proper authentication and authorization validation.
*   **Secure Data Parsing** - Uses `json.loads()` instead of `eval()` for safe data deserialization across all services.
*   **Environment Variables Protection** - Sensitive credentials stored in `.env` files, excluded from version control via `.gitignore`.

### ♿ Accessibility (WCAG)
*   **ARIA Attributes on Interactive Elements** - All buttons, links, and form inputs have proper ARIA labels for screen readers.
*   **Screen Reader Support** - Comprehensive use of `aria-label`, `aria-expanded`, and `aria-hidden` attributes throughout the UI.
*   **Keyboard Navigation Support** - Full keyboard accessibility for all interactive components and navigation flows.

### ⚡ Performance Optimization
*   **Code Splitting with React.lazy() and Suspense** - Dynamic imports reduce initial bundle size and improve first contentful paint.
*   **Lazy-Loaded Pages** - Pages are loaded on-demand, minimizing the download footprint for users.

### 📘 TypeScript Strict Mode
*   **Proper Type Interfaces** - Eliminates `any` types in favor of explicit, well-defined interfaces.
*   **Full Type Safety** - Comprehensive type coverage across all React components and service layers prevents runtime type errors.

### 🧹 Clean Code
*   **Production-Ready Logging** - No `console.log()` statements in production builds; proper logging infrastructure in place.
*   **SEO Meta Tags** - Implements Open Graph and Twitter Card meta tags for improved social media previews and search engine visibility.

### 🏗️ Code Architecture
*   **React Error Boundary** - Graceful error handling with user-friendly fallback UI and dev-mode error details.
*   **Modular Component Structure** - DashboardPage refactored into smaller, reusable components (LoginScreen, Header, Tabs, Modal, FintechView).
*   **Global TypeScript Types** - Centralized type definitions in `src/types/` folder for consistent typing across the application.
*   **Environment Variables** - WebSocket URLs and API endpoints configurable via `.env` files with sensible defaults.

### 🧪 Testing Infrastructure
*   **E2E Test Suite** - Comprehensive Playwright tests covering: Landing navigation, Fintech flow, B2B Verifier, Crypto Monitor, and Contact form.
*   **ESLint Strict Mode** - Zero tolerance for unused variables, improper hooks usage, and type safety violations.

---

## 📚 Knowledge Base (ADR & Learning)

The project includes extensive **Architecture Decision Records (ADR)**. Each file explains the "why" behind every technology choice.

### 🏗️ Infrastructure & DevOps
* [Automated CI/CD (GitHub Actions)](docs/adr_cicd.md)
* [Docker Optimization & Network Debugging](docs/adr_docker_optimization.md)
* [API Gateway Strategy (Nginx)](docs/adr_infrastructure_gateway.md)
* [Infrastructure Orchestration](docs/adr_infrastructure.md)
* [Hybrid Architecture (Django + FastAPI)](docs/adr_hybrid_architecture.md)

### 🤖 AI & Modern Tech
* [Git-Sensei CLI Spotlight](docs/adr_git_sensei.md)
* [AI Integration (Hybrid RAG Model)](docs/adr_rag_ai.md)
* [Stripe Payments Integration](docs/adr_stripe.md)
* [Real-time WebSockets](docs/adr_websockets.md)
* [Redis as a Shared State & Broker](docs/adr_redis_advanced.md)

### ⚙️ Backend (Fintech & B2B)
* [Atomic Transactions & ACID Compliance](docs/adr_acid_transactions.md)
* [Periodic Tasks (Celery & Beat)](docs/adr_background_jobs_beat.md)
* [Fintech Core Stack (Django Ninja)](docs/adr_django_ninja_postgres.md)
* [FastAPI & Redis Integration](docs/adr_fastapi_redis.md)
* [Backend-side PDF Generation](docs/adr_pdf_generation.md)
* [Financial Data Schema & Integrity](docs/adr_fintech_schema.md)
* [Django Migrations & DB Management](docs/adr_django_migrations.md)

### 🎨 Frontend & UX
* [Neon Glass Design System](docs/adr_design_system.md)
* [Architecture X-Ray Mode](docs/adr_architecture_xray.md)
* [Responsive UI/UX Strategy](docs/adr_responsive_ui_ux.md)
* [Frontend State Management (TanStack Query)](docs/adr_frontend_state_management.md)
* [Frontend Architecture & API Integration](docs/adr_frontend_routing_api.md)

### 🧪 Testing & Validation
* [E2E Testing with Playwright](docs/adr_e2e_testing.md)
* [API Validation & Error Handling](docs/adr_validation_error_handling.md)

---

## 🚀 Quick Start

### 1. Spin up the system
```bash
cd portfolio
docker compose up --build
```
Access the dashboard at: **http://localhost**

### 2. Quality Verification
To run E2E tests and check code quality:

```bash
# End-to-End Tests (Docker must be running)
cd frontend-landing
npm run test:e2e

# Static Analysis (Python)
cd ..
python -m ruff check .
```

---

## Author
**Łukasz Szymański** - Aspiring Fullstack Developer.
This project was built to demonstrate the ability to bridge complex business logic (Django) with modern distributed infrastructure (Docker, Redis, AI).
**Connect:** [LinkedIn](https://www.linkedin.com/in/lukasz-szymanski94/) | [GitHub](https://github.com/Lukasz-Szymanski)