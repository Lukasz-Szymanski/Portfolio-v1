# Portfolio: Microservices Architecture Demo

![Status](https://img.shields.io/badge/Status-Premium_UI_Ready-success)
![UI](https://img.shields.io/badge/Design-Neon_Glass-blue)
![Stack](https://img.shields.io/badge/Stack-Python_|_React_|_Docker-blue)
[![Portfolio CI](https://github.com/Lukasz-Szymanski/Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Lukasz-Szymanski/Portfolio/actions/workflows/ci.yml)

Kompletny system mikroserwisów symulujący środowisko **Fintech** oraz **B2B**. Projekt demonstruje umiejętności z zakresu architektury systemów rozproszonych, asynchroniczności oraz nowoczesnego frontendu klasy Premium.

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

*   **🤖 AI Engineering (RAG):** Wbudowany Chatbot "Mentus AI" wykorzystujący Google Gemini i bazę wektorową (PGVector) do odpowiadania na pytania o kod i architekturę projektu.
*   **📡 Real-time WebSockets:** Streaming cen kryptowalut w czasie rzeczywistym (Push zamiast Pull) z wykorzystaniem Redis Pub/Sub i FastAPI.
*   **🛡️ Architecture X-Ray Mode:** Przełącznik "DEV_MODE" w Dashboardzie dekonstruuje aplikację na techniczne komponenty, pokazując endpointy API i technologie użyte w każdym module.
*   **📊 Data Visualization:** Interaktywne wykresy finansowe (Recharts) z algorytmem rekonstrukcji salda po stronie klienta oraz wizualizacja skuteczności cache'owania Redis.
*   **🧪 Automated E2E Testing:** Kompletny zestaw testów regresyjnych (Playwright) pokrywający ścieżkę krytyczną: od logowania, przez nawigację, aż po weryfikację poprawności transakcji atomowych.
*   **✨ Code Quality Assurance:** Kod utrzymywany w rygorze produkcyjnym. Python sprawdzany przez **Ruff**, Frontend przez **TypeScript Strict Mode**. Zero błędów, zero warningów.
*   **🐳 Production-Ready Docker:** Zastosowanie **Multi-Stage Builds** (obrazy <50MB) oraz separacja środowisk Dev/Prod w jednym pliku Compose.
- **Premium UI/UX:** Styl "Neon Glass", tryb Zero-Scroll na desktopie oraz pełna responsywność (RWD) na urządzeniach mobilnych.

---

## 📚 Baza Wiedzy (ADR & Learning)

Szczegółowe opisy decyzji architektonicznych:
* [AI Integration (RAG & PGVector)](docs/learning_rag_ai.md)
* [Real-time WebSockets](docs/learning_websockets.md)
* [Docker Optimization & Debugging](docs/learning_docker_optimization.md)
* [Authentic Content Strategy](docs/learning_content_strategy.md)
* [E2E Testing with Playwright](docs/learning_e2e_testing.md)
* [Data Visualization & Recharts](docs/learning_data_visualization.md)
* [Architecture X-Ray Mode](docs/learning_architecture_xray.md)
* [Neon Glass Design System](docs/learning_design_system.md)
* [Hybrid Architecture (Django + FastAPI)](docs/learning_hybrid_architecture.md)
* [Guest Session Management](docs/learning_guest_auth.md)

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