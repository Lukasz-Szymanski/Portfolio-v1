# Portfolio v1.0: Microservices Architecture 🚀

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![Docker](https://img.shields.io/badge/docker-compose-blue.svg)](https://www.docker.com/)
[![Python](https://img.shields.io/badge/python-3.11-yellow.svg)](https://www.python.org/)
[![React](https://img.shields.io/badge/react-18-blue.svg)](https://react.dev/)

Profesjonalne portfolio Software Developera zbudowane w oparciu o architekturę mikroserwisów.
Projekt demonstruje umiejętność łączenia nowoczesnego Frontendu (React/Vite) z wydajnym Backendem (FastAPI, Django Ninja) oraz infrastrukturą kontenerową (Docker, Nginx, Redis, PostgreSQL).

## 🎯 O Projekcie

Ten projekt to moja osobista droga do zostania **Junior Python Developerem**. Zamiast tworzyć statyczną stronę "O mnie", postanowiłem zbudować pełnoprawny system mikroserwisowy, który pokazuje moje rzeczywiste umiejętności w zakresie:
- Projektowania systemów (System Design).
- Pracy z kontenerami (Docker).
- Komunikacji między usługami (REST API, Redis).
- Nowoczesnego frontendu (React SPA).

To portfolio jest "żywym dokumentem" mojego rozwoju – każda linijka kodu została napisana z myślą o dobrych praktykach i skalowalności.

## 🏗️ Architektura Systemu

System składa się z niezależnych kontenerów orkiestrowanych przez Docker Compose:

| Usługa | Technologia | Rola | Port (Wew.) |
|--------|------------|------|-------------|
| **Gateway** | Nginx | Reverse Proxy, Routing, SSL Termination | 80 |
| **Frontend** | React + Vite + Tailwind | Interfejs użytkownika (SPA) | 5173 |
| **B2B Service** | Python (FastAPI) | Weryfikacja NIP, Cache'owanie danych firm | 8001 |
| **Fintech Core** | Python (Django Ninja) | Symulator transakcji, HMAC, Idempotency | 8002 |
| **Price Monitor** | Python (Celery) | Asynchroniczne zadania w tle, Scraping | - |
| **Cache** | Redis | Szybki dostęp do danych, Broker wiadomości | 6379 |
| **Database** | PostgreSQL | Główny magazyn danych relacyjnych | 5432 |

---

## 🌟 Główne Funkcjonalności (Live Demo)

### 1. B2B Company Verifier (Dostępny)
Mikroserwis do weryfikacji danych kontrahenta na podstawie NIP.
- **Cache Strategy:** Pierwsze zapytanie trwa 1.5s (symulacja GUS), kolejne są natychmiastowe (Redis).
- **Endpoint:** `/api/v1/companies/{nip}`

### 2. Fintech Simulator (W budowie) 🚧
Symulacja systemu bankowego.
- Podpisywanie requestów (HMAC SHA256).
- Klucze idempotentności (zapobieganie podwójnym przelewom).
- **Endpoint:** `http://localhost:8002/api/docs`

---

## 🛠️ Instrukcja Uruchomienia

Wymagania: `Docker` oraz `Docker Compose`.

1. **Sklonuj repozytorium:**
   ```bash
   git clone https://github.com/TwojNick/portfolio-v1.git
   cd portfolio-v1
   ```

2. **Uruchom środowisko:**
   ```bash
   docker compose up -d --build
   ```

3. **Dostęp do aplikacji:**
   - **Frontend:** [http://localhost](http://localhost)
   - **API Docs (B2B):** [http://localhost:8001/docs](http://localhost:8001/docs)
   - **API Docs (Fintech):** [http://localhost:8002/api/docs](http://localhost:8002/api/docs)

---

## 📂 Struktura Projektu

```bash
├── docker-compose.yml    # Orkiestracja całej infrastruktury
├── nginx/                # Konfiguracja Gateway (Reverse Proxy)
├── frontend-landing/     # Kod źródłowy SPA (React + TypeScript)
├── service-b2b-data/     # Mikroserwis FastAPI (Redis Cache)
├── service-fintech/      # Mikroserwis Django Ninja (Fintech Core)
└── docs/                 # Dokumentacja techniczna i plany rozwoju
```

## 👨‍💻 Autor

**Łukasz** - *Aspiring Python Architect & Backend Developer*
- Specjalizacja: Python, Docker, Cloud Architecture.
- Kontakt: [Link do LinkedIn]

---
*Projekt stworzony w celach edukacyjnych i demonstracyjnych.*