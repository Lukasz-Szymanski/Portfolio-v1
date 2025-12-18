# Engineering Portfolio: Microservices Ecosystem (2025)

## 🏗 System Architecture
Ten projekt to demonstracja architektury typu **Headless**, gdzie wiele wyspecjalizowanych mikroserwisów backendowych komunikuje się z jednym, nowoczesnym frontendem w React.

### Struktura Projektu (Monorepo)
- `/frontend-landing` - React + Vite (Dashboard integrujący wszystkie moduły).
- `/service-fintech` - Django Ninja + PostgreSQL (Symulator płatności, HMAC, Idempotency).
- `/service-b2b-data` - FastAPI + Redis (Weryfikator firm, Caching Strategy).
- `/service-price-monitor` - Python + Celery + Redis (Worker asynchroniczny, Scraping).
- `docker-compose.yml` - Orkiestracja całego środowiska.
- `nginx.conf` - Reverse Proxy (API Gateway).

## 🚀 Technologie & Standardy 2025
Jako backend-heavy developer, kładę nacisk na jakość kodu i bezpieczeństwo:
- **Code Quality:** `Ruff` (lint/format), `Mypy` (strict typing).
- **Architecture:** Domain Driven Design (DDD) elements, Repository Pattern, Dependency Injection.
- **Infrastructure:** Docker, Redis as Broker & Cache, PostgreSQL as Source of Truth.
- **Frontend:** TypeScript, TanStack Query (Server State Management), Tailwind CSS.

## 🛠 Jak uruchomić?
Całość jest zdokeryzowana, co pozwala na uruchomienie ekosystemu jedną komendą:

```bash
docker-compose up --build
```

Serwisy będą dostępne pod wspólnym portem przez Nginx Gateway:
- Frontend: `http://localhost/`
- Fintech API: `http://localhost/api/fintech/docs`
- B2B Data API: `http://localhost/api/company/docs`

---
*Dokumentacja techniczna poszczególnych modułów znajduje się w pliku `brief.md`.*
