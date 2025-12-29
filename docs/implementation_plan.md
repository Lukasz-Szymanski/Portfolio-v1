# Implementation Plan: Python Microservices Portfolio

Dokument ten definiuje harmonogram prac oparty na specyfikacji z `brief.md`. Celem jest zbudowanie działającego MVP w architekturze Monorepo.

---

## FAZA 0: Frontend Foundation & Design
**Cel:** Stworzenie bazy pod główną stronę portfolio, która będzie hostować projekty.

- [ ] **0.1. Inicjalizacja Vite + React (TS)**
    - Setup Tailwind CSS i podstawowej struktury katalogów (`components`, `hooks`, `services`).
- [ ] **0.2. Design System Setup**
    - Konfiguracja motywu (Dark Mode) i fontów inżynierskich (np. Inter / JetBrains Mono).
- [ ] **0.3. Layout & Navigation**
    - Stworzenie Main Layout (Sidebar/Header) z miejscem na 3 mikroserwisy.

---

## FAZA 1: Infrastruktura i Scaffolding (Fundament)
**Cel:** Przygotowanie środowiska, w którym usługi mogą się komunikować. Bez tego nie piszemy kodu biznesowego.

- [ ] **1.1. Inicjalizacja Monorepo**
    - Utworzenie struktury katalogów (`service-fintech`, `service-b2b`, `service-monitor`, `frontend`).
    - Konfiguracja Git (`.gitignore` dla Python/Node).
- [ ] **1.2. Docker Orchestration**
    - Stworzenie `docker-compose.yml` definiującego:
        - `postgres` (Baza danych).
        - `redis` (Cache & Broker).
        - `nginx` (Gateway).
- [ ] **1.3. API Gateway (Nginx)**
    - Konfiguracja `nginx.conf` jako Reverse Proxy.
    - Routing: `/api/fintech/` -> Service 1, `/api/company/` -> Service 2.

---

## FAZA 2: Service B2B Data (FastAPI + Redis)
**Cel:** Najszybsze wdrożenie ("Quick Win"). Prosta logika, nacisk na wydajność.

- [ ] **2.1. Setup Projektu**
    - Inicjalizacja `poetry`.
    - Konfiguracja `pyproject.toml` (Ruff, Mypy).
- [ ] **2.2. Połączenie z Redis**
    - Implementacja wzorca Dependency Injection dla klienta Redis.
    - Stworzenie helpera `CacheService`.
- [ ] **2.3. Logika Biznesowa (GUS Mock)**
    - Endpoint `/company/{nip}`.
    - Logika: `Check Redis -> If Miss -> Fetch External -> Save Redis`.
- [ ] **2.4. Testy**
    - Testy integracyjne z `pytest` (mockowanie Redis i zewn. API).

---

## FAZA 3: Service Fintech (Django + Ninja)
**Cel:** Złożona logika biznesowa, bezpieczeństwo, SQL.

- [ ] **3.1. Setup Django**
    - Start projektu Django.
    - Konfiguracja `django-ninja` (Pydantic schemas).
- [ ] **3.2. Modele Danych (PostgreSQL)**
    - Tabele: `Merchant`, `PaymentIntent`, `Transaction`.
    - Migracje.
- [ ] **3.3. Logika Płatności (Core)**
    - Endpoint `create_payment` (generowanie tokena).
    - Endpoint `process_payment` (Atomic Transaction).
- [ ] **3.4. Webhooks & Security**
    - Implementacja HMAC Signature Service.
    - Mechanizm wysyłania POST request do Merchanta po zmianie statusu.

---

## FAZA 4: Service Price Monitor (Celery + Async)
**Cel:** Przetwarzanie w tle, oddzielenie Workera od API.

- [ ] **4.1. Setup Workerów**
    - Konfiguracja Celery z Redisem jako Brokerem.
    - Definicja kontenera `worker` w Docker Compose.
- [ ] **4.2. Scraper Logic**
    - Zadanie Celery: `fetch_price_task(url)`.
    - Parsowanie HTML (BeautifulSoup).
- [ ] **4.3. Scheduling**
    - Konfiguracja `Celery Beat` do cyklicznego sprawdzania cen.
- [ ] **4.4. API**
    - Endpointy do dodawania produktów i odczytu historii.

---

## FAZA 5: Portfolio Landing Page (The Command Center)
**Cel:** Integracja mikroserwisów w jeden spójny dashboard wizytówkowy.

- [ ] **5.1. Hero Section & Skills**
    - Implementacja interaktywnej sekcji z opisem profilu i stacku 2025.
- [ ] **5.2. Microservices Connector**
    - Stworzenie generycznego hooka `useServiceStatus` sprawdzającego dostępność API (Fintech, B2B, Monitor).
- [ ] **5.3. Project Cards**
    - Implementacja komponentów prezentujących 3 główne projekty z dynamicznymi danymi.
- [ ] **5.4. Global Analytics View**
    - Dashboard agregujący statystyki ze wszystkich serwisów (np. łączna liczba rekordów w DB).
- [ ] **5.5. AI Mentoring Section**
    - Sekcja opisująca rozwój pod okiem mentora i wykorzystanie AI w procesie (RAG/Prompt Engineering).

---

## FAZA 6: Finalizacja i Dokumentacja
- [ ] **6.1. Code Quality Pass**
    - Uruchomienie `ruff check` i `mypy` na wszystkim.
- [ ] **6.2. README Update**
    - Opisanie jak uruchomić każdy serwis.
    - Zrzuty ekranu.
