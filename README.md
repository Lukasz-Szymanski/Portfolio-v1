# Portfolio: Microservices Architecture Demo

![Status](https://img.shields.io/badge/Status-Premium_UI_Ready-success)
![UI](https://img.shields.io/badge/Design-Neon_Glass-blue)
![Stack](https://img.shields.io/badge/Stack-Python_|_React_|_Docker-blue)
[![Portfolio CI](https://github.com/Lukasz-Szymanski/Portfolio-v1/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Lukasz-Szymanski/Portfolio-v1/actions/workflows/ci.yml)

To repozytorium to moja **główna strona Portfolio (Landing Page)**, będąca jednocześnie centralnym hubem dla zintegrowanych projektów technicznych. Zamiast statycznej strony, stworzyłem żywy ekosystem mikroserwisów, który demonstruje moje umiejętności fullstackowe w rzeczywistym działaniu.

---

## 🎯 Cel Projektu

Głównym celem jest prezentacja nowoczesnego podejścia do budowy aplikacji webowych. Strona główna (Frontend) służy jako brama do zaawansowanych modułów demonstracyjnych:
- **Fintech Bank:** Pełna symulacja systemu transakcyjnego.
- **B2B Data Verifier:** Narzędzie do integracji z danymi publicznymi.
- **AI Assistant:** Inteligentny pomocnik oparty o modele LLM.

---

## 🛠️ Inne Wybitne Projekty

Poza systemem mikroserwisów, w ramach tego Hubu prezentuję:
*   **Git-Sensei CLI:** Inteligentne narzędzie terminalowe (AI), które automatyzuje generowanie profesjonalnych wiadomości commit poprzez analizę `git diff`. Obsługuje modele Gemini, Claude oraz lokalne (Ollama).

---

## 🏗 Architektura

System składa się z trzech niezależnych mikroserwisów oraz bramy API (Gateway), uruchamianych w kontenerach Docker.

### 1. Service Fintech (Core Banking)
- **Technologia:** Django 5.0 + Django Ninja
- **Rola:** System transakcyjny. Obsługuje konta użytkowników, historię operacji oraz bezpieczne przelewy (ACID). Generuje potwierdzenia PDF.

### 2. Service B2B Data (Real-time Proxy & AI)
- **Technologia:** FastAPI + Redis + LangChain (PGVector)
- **Rola:** Integracja z API rządowymi, obsługa WebSocketów do streamingu cen oraz silnik AI (RAG Chatbot).

### 3. Service Price Monitor (Background Worker)
- **Technologia:** Celery + Redis (Broker)
- **Rola:** Monitoring rynku krypto w czasie rzeczywistym.

---

## 💡 Unikalne Funkcjonalności

*   **🤖 AI Engineering:** `Status: ✅ BETA` – Inteligentny chatbot "Portfolio AI" działający w modelu hybrydowym (Lokalna Baza Wiedzy + Google Gemini 1.5).
*   **📡 Real-time WebSockets:** `Status: ✅ ZAKOŃCZONE` – Streaming cen kryptowalut w czasie rzeczywistym (Push zamiast Pull) z wykorzystaniem Redis Pub/Sub i FastAPI.
*   **🚀 Automated CI/CD:** `Status: ✅ ZAKOŃCZONE` – Pełny rygor jakościowy dzięki GitHub Actions – automatyczne testy, lintery (Ruff, ESLint) i build-check przy każdym commicie.
*   **💳 Stripe Payments:** `Status: ✅ ZAKOŃCZONE` – Pełny system doładowań konta (Checkout Session + Webhooks). Zintegrowany z Dockerem (Stripe Listener) dla bezpiecznej weryfikacji płatności w czasie rzeczywistym.
*   **🛡️ Architecture X-Ray Mode:** `Status: ✅ ZAKOŃCZONE` – Przełącznik "DEV_MODE" dekonstruujący interfejs na komponenty techniczne.
*   **📊 Data Visualization:** `Status: ✅ ZAKOŃCZONE` – Interaktywne wykresy finansowe (Recharts) z algorytmem rekonstrukcji salda.
*   **🧪 Automated E2E Testing:** `Status: ✅ ZAKOŃCZONE` – Kompleksowe testy Playwright dla ścieżki krytycznej.
*   **✨ Code Quality Assurance:** `Status: ✅ ZAKOŃCZONE` – Kod sprawdzany przez Ruff i TypeScript (Strict Mode).
*   **🐳 Production-Ready Docker:** `Status: ✅ ZAKOŃCZONE` – Multi-stage builds i pełna orkiestracja kontenerów.
*   **📱 Premium UI/UX:** `Status: ✅ ZAKOŃCZONE` – Styl Neon Glass, Zero-Scroll oraz pełna responsywność.

---

## 📚 Baza Wiedzy (ADR & Learning)

Projekt zawiera obszerną dokumentację decyzji architektonicznych (Architecture Decision Records) oraz przemyśleń edukacyjnych. Każdy plik to konkretne "dlaczego" za daną technologią.

### 🏗️ Architektura i DevOps
* [Automated CI/CD (GitHub Actions)](docs/learning_cicd.md) – Automatyzacja jakości.
* [Docker Optimization & Debugging](docs/learning_docker_optimization.md) – Multi-stage builds i rygor obrazów.
* [Infrastructure & Gateway (Nginx)](docs/learning_infrastructure_gateway.md) – Reverse Proxy i routing.
* [Hybrid Architecture (Django + FastAPI)](docs/learning_hybrid_architecture.md) – Dlaczego dwa frameworki?
* [Infrastructure & Docker Compose](docs/learning_infrastructure.md) – Orkiestracja lokalna.

### 🤖 AI i Nowoczesne Technologie
* [Git-Sensei CLI Spotlight](docs/learning_git_sensei.md) – AI w służbie DevOps.
* [AI Integration (RAG & Gemini)](docs/learning_rag_ai.md) – Chatbot z opisem fallbacku (Context Stuffing).
* [Stripe Payments Integration](docs/learning_stripe.md) – Obsługa płatności i Webhooków.
* [Real-time WebSockets](docs/learning_websockets.md) – Streaming cen z wykorzystaniem Redis Pub/Sub.
* [Advanced Redis Patterns](docs/learning_redis_advanced.md) – Cache, Broker i Pub/Sub.

### ⚙️ Backend (Fintech & B2B)
* [ACID Transactions in Django](docs/learning_acid_transactions.md) – Bezpieczeństwo przelewów.
* [Background Jobs (Celery & Beat)](docs/learning_background_jobs_beat.md) – Zadania okresowe.
* [Django Ninja & Postgres](docs/learning_django_ninja_postgres.md) – Szybkie API typowane.
* [FastAPI & Company Data](docs/learning_fastapi_redis.md) – Integracja z API zewnętrznym.
* [PDF Generation Service](docs/learning_pdf_generation.md) – Generowanie dokumentów w kontenerze.
* [Schema Design & Validation](docs/learning_fintech_schema.md) – Projektowanie struktur danych.

### 🎨 Frontend i UX
* [Neon Glass Design System](docs/learning_design_system.md) – Estetyka i UI/UX.
* [Data Visualization (Recharts)](docs/learning_data_visualization.md) – Wykresy finansowe.
* [Architecture X-Ray Mode](docs/learning_architecture_xray.md) – Transparentność systemowa.
* [Responsive UI/UX Strategy](docs/learning_responsive_ui_ux.md) – Mobile-first i Zero-Scroll.
* [Frontend State & Routing](docs/learning_frontend_state_management.md) – Zarządzanie danymi po stronie klienta.

### 🧪 Jakość i Testy
* [E2E Testing with Playwright](docs/learning_e2e_testing.md) – Automatyzacja ścieżki krytycznej.
* [Validation & Error Handling](docs/learning_validation_error_handling.md) – Spójna komunikacja błędów.

---

## 🚀 Szybki Start

### 1. Uruchomienie Systemu
```bash
cd portfolio
docker compose up --build
```
Adres: **http://localhost**

### 2. Weryfikacja Jakości (Quality Gates)
Aby uruchomić testy E2E i sprawdzić jakość kodu:

```bash
# Testy End-to-End (wymaga uruchomionego Dockera)
cd frontend-landing
npm run test:e2e

# Statyczna Analiza Kodu (Python)
cd ..
python -m ruff check .
```

---

## Autor
**Łukasz Szymański** - Aspiring Backend Developer.
Projekt stworzony jako demonstracja umiejętności łączenia logiki biznesowej (Django) z nowoczesną infrastrukturą (Docker, Redis).
**Kontakt:** [LinkedIn](https://www.linkedin.com/in/lukasz-szymanski94/) | [GitHub](https://github.com/Lukasz-Szymanski)
