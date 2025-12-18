# Historia Projektu: Portfolio Mikroserwisowe

Ten plik dokumentuje chronologiczny postęp prac, kamienie milowe oraz rozwiązane problemy.

## [18.12.2025] - Dzień 1: Fundamenty i Faza 2 (B2B Service)

### ✅ Osiągnięcia:
- **Infrastruktura:** Skonfigurowano środowisko Docker Compose z 4 kontenerami (Nginx, React, FastAPI, Redis, PostgreSQL).
- **API Gateway:** Wdrożono Nginxa jako Reverse Proxy, rozwiązując problemy z CORS i ujednolicając dostęp do usług przez port 80.
- **B2B Service:** Implementacja mikroserwisu w FastAPI do weryfikacji NIP z systemem cache'owania opartym na Redis (Pattern: Cache-Aside).
- **Frontend SPA:** 
    - Inicjalizacja projektu Vite + React + Tailwind.
    - Architektura Single Page Application (SPA) z nawigacją opartą na stanie (Conditional Rendering).
    - Implementacja komponentów: `Hero`, `About`, `TechStack`, `Projects`, `Hobby`, `Contact`.
    - Integracja z backendem B2B (interaktywna karta projektu).
- **DevOps:**
    - Przygotowanie profesjonalnego `README.md`.
    - Konfiguracja `.gitignore` i pierwsza publikacja na GitHubie.
    - Wdrożenie dokumentacji w formie ADR (Architecture Decision Records) w folderze `docs/`.

### 🛠️ Rozwiązane Problemy:
- **Błąd synchronizacji wolumenów (Windows/Docker):** Rozwiązano problem braku odświeżania zmian przez włączenie `polling` w konfiguracji Vite.
- **Błąd "Black Screen":** Zdiagnozowano i naprawiono crash aplikacji React spowodowany brakującym importem `useState` po refaktoryzacji.
- **Nginx Routing:** Poprawnie skonfigurowano URL Rewriting dla mikroserwisów, aby ścieżki `/api/company/` trafiały do odpowiednich punktów końcowych FastAPI.

---
**Następny cel:** Faza 3 - Fintech Simulator (Django Ninja + PostgreSQL + HMAC Security).
