# Portfolio: Microservices Architecture Demo

![Status](https://img.shields.io/badge/Status-MVP_Ready-success)
![Stack](https://img.shields.io/badge/Stack-Python_|_React_|_Docker-blue)
![License](https://img.shields.io/badge/License-MIT-green)

Kompletny system mikroserwisów symulujący środowisko **Fintech** oraz **B2B**. Projekt został stworzony w celu demonstracji umiejętności z zakresu architektury systemów rozproszonych, asynchroniczności oraz nowoczesnego frontendu.

---

## 🏗 Architektura

System składa się z trzech niezależnych mikroserwisów oraz bramy API (Gateway), uruchamianych w kontenerach Docker.

### 1. Service Fintech (Core Banking)
- **Technologia:** Django 5.0 + Django Ninja (Fast API-like for Django)
- **Baza Danych:** PostgreSQL
- **Rola:** Główny system transakcyjny. Obsługuje konta użytkowników, historię operacji oraz bezpieczne przelewy (ACID Transactions). Generuje potwierdzenia PDF.

### 2. Service B2B Data (High Performance Proxy)
- **Technologia:** FastAPI
- **Cache:** Redis
- **Rola:** Szybki serwer proxy do weryfikacji danych kontrahentów (NIP/REGON) oraz pobierania kursów walut. Wykorzystuje wzorzec Cache-Aside do minimalizacji opóźnień.

### 3. Service Price Monitor (Background Worker)
- **Technologia:** Celery + Redis (Broker)
- **Rola:** System zadań asynchronicznych działających w tle. Cyklicznie (co 60s) pobiera aktualne kursy kryptowalut z zewnętrznych API i aktualizuje współdzielony stan w Redis.

### 4. Frontend (Dashboard)
- **Technologia:** React + Vite + TypeScript + Tailwind CSS
- **Rola:** Nowoczesne SPA (Single Page Application) komunikujące się z mikroserwisami poprzez Nginx Gateway. Posiada tryb "Guest Demo" dla rekruterów.

---

## 🚀 Jak uruchomić (Quick Start)

Wymagany Docker oraz Docker Compose.

```bash
# 1. Sklonuj repozytorium
git clone https://github.com/TwojNick/portfolio-microservices.git
cd portfolio-microservices

# 2. Uruchom środowisko (to zbuduje obrazy i postawi kontenery)
docker compose up --build
```

Po uruchomieniu aplikacja jest dostępna pod adresem:
👉 **http://localhost**

### Dostępne Usługi:
| Usługa | URL Wewnętrzny | Opis |
|--------|---------------|------|
| **Frontend** | `http://localhost:80` | Główny interfejs użytkownika |
| **Fintech API** | `http://localhost:8002/api/docs` | Swagger UI dla systemu bankowego |
| **B2B API** | `http://localhost:8001/docs` | Swagger UI dla serwisu danych |

---

## 💡 Funkcjonalności Demo

Projekt posiada wbudowany tryb demonstracyjny. Nie musisz się rejestrować!
1. Wejdź na Dashboard.
2. Kliknij **"Uruchom Demo (Jako Gość)"**.
3. **NOWOŚĆ! 🛡️ Architecture X-Ray Mode:** Włącz przełącznik "DEV_MODE" w nagłówku, aby zobaczyć architekturę systemu "na żywo". Aplikacja podświetli mikroserwisy, punkty końcowe API oraz wzorce projektowe użyte w każdym komponencie.
4. Możesz wykonywać przelewy, pobierać potwierdzenia PDF i sprawdzać firmy po NIP.

---

## 📚 Baza Wiedzy (ADR & Learning)

W katalogu `docs/` znajdują się szczegółowe opisy decyzji architektonicznych:

* [Hybrid Architecture (Django + FastAPI)](docs/learning_hybrid_architecture.md) - Dlaczego użyłem dwóch różnych frameworków?
* [Architecture X-Ray Mode](docs/learning_architecture_xray.md) - Jak pokazać architekturę systemu "na żywo"?
* [PDF Generation Strategy](docs/learning_pdf_generation.md) - Dlaczego generuję PDF na backendzie?
* [Guest Session Management](docs/learning_guest_auth.md) - Jak działa logowanie bez hasła?
* [Redis Advanced Usage](docs/learning_redis_advanced.md) - Rola Redisa jako brokera i cache.

---

## 🛠 Tech Stack

* **Backend:** Python 3.11, Django, FastAPI, Celery
* **Frontend:** React 18, TypeScript, Tailwind, React Query, Framer Motion
* **Infrastructure:** Docker Compose, Nginx (Reverse Proxy), PostgreSQL 15, Redis 7
* **Tools:** Poetry, Ruff, Black, ESLint

---

## Autor
Projekt stworzony jako portfolio inżynierskie.
**Kontakt:** [Twoj Link LinkedIn / Email]
