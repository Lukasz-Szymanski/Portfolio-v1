# Portfolio: Microservices Architecture Demo

![Status](https://img.shields.io/badge/Status-Premium_UI_Ready-success)
![UI](https://img.shields.io/badge/Design-Neon_Glass-blue)
![Stack](https://img.shields.io/badge/Stack-Python_|_React_|_Docker-blue)

Kompletny system mikroserwisów symulujący środowisko **Fintech** oraz **B2B**. Projekt demonstruje umiejętności z zakresu architektury systemów rozproszonych, asynchroniczności oraz nowoczesnego frontendu klasy Premium.

---

## 🏗 Architektura

System składa się z trzech niezależnych mikroserwisów oraz bramy API (Gateway), uruchamianych w kontenerach Docker.

### 1. Service Fintech (Core Banking)
- **Technologia:** Django 5.0 + Django Ninja
- **Rola:** System transakcyjny. Obsługuje konta użytkowników, historię operacji oraz bezpieczne przelewy (ACID). Generuje potwierdzenia PDF.

### 2. Service B2B Data (Real-time Proxy)
- **Technologia:** FastAPI + Redis
- **Rola:** Integracja z prawdziwym API Ministerstwa Finansów (Biała Lista VAT) z inteligentnym cachingiem i fallbackiem do mocków.

### 3. Service Price Monitor (Background Worker)
- **Technologia:** Celery + Redis (Broker)
- **Rola:** Monitoring rynku krypto w czasie rzeczywistym.

---

## 💡 Unikalne Funkcjonalności

*   **🛡️ Architecture X-Ray Mode:** Przełącznik "DEV_MODE" w Dashboardzie dekonstruuje aplikację na techniczne komponenty, pokazując endpointy API i technologie użyte w każdym module.
*   **🗺️ Interactive System Map:** Dynamiczny diagram (Mermaid.js) wizualizujący przepływ danych między Reactem, Nginxem a bazami danych.
*   **💎 Neon Glass UI:** Nowoczesny interfejs oparty na Glassmorphismie, potężnej typografii i podejściu "Zero-Scroll" (One Screen Experience).
*   **🚀 One-Click Demo:** System inicjalizacji gościa, który na żądanie tworzy unikalne środowisko testowe z wirtualnym saldem i historią transakcji.

---

## 📚 Baza Wiedzy (ADR & Learning)

Szczegółowe opisy decyzji architektonicznych:
* [Architecture X-Ray Mode](docs/learning_architecture_xray.md)
* [Neon Glass Design System](docs/learning_design_system.md)
* [Hybrid Architecture (Django + FastAPI)](docs/learning_hybrid_architecture.md)
* [Guest Session Management](docs/learning_guest_auth.md)

---

## 🚀 Szybki Start

```bash
cd portfolio
docker compose up --build
```
Adres: **http://localhost**

---

## Autor
Projekt stworzony jako demonstracja umiejętności Backend & Architecture.
**Kontakt:** [Twój Link LinkedIn]