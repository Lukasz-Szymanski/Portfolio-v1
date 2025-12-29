# Architecture Decision Record: API Gateway (Nginx Reverse Proxy)

## Status
Zaakceptowane

## Kontekst
W architekturze mikroserwisowej każdy serwis działa na własnym porcie (8001, 8002, itd.). Wystawianie tych portów bezpośrednio dla użytkownika końcowego jest niebezpieczne i niepraktyczne (wymagałoby otwierania wielu portów w firewallu i komplikuje konfigurację frontendu).

## Decyzja
Używamy Nginxa jako **API Gateway / Reverse Proxy** działającego na standardowym porcie 80.

## Uzasadnienie Techniczne

### 1. Unified Entry Point (Pojedynczy punkt wejścia)
Użytkownik łączy się tylko z portem 80. Nginx analizuje ścieżkę URL i kieruje ruch do odpowiedniego kontenera wewnątrz sieci Dockera:
*   `/` -> Frontend (React)
*   `/api/company/` -> Service B2B (FastAPI)
*   `/api/fintech/` -> Service Fintech (Django Ninja)

### 2. Abstrakcja Technologii
Frontend nie musi wiedzieć, że jeden serwis jest w FastAPI, a drugi w Django. Dla niego to po prostu różne ścieżki pod tym samym adresem IP. Pozwala to na łatwą wymianę technologii w przyszłości bez zmiany konfiguracji frontendu.

### 3. Bezpieczeństwo
Kontenery mikroserwisów nie muszą wystawiać portów na zewnątrz (`ports` w docker-compose mogą zostać ograniczone tylko do localhosta lub usunięte), ponieważ komunikacja Nginx -> Serwis odbywa się wewnątrz izolowanej sieci Dockerowej (`portfolio_network`).

## Konfiguracja
Użyliśmy dyrektywy `proxy_pass`. Kluczowym elementem było poprawne mapowanie ścieżek (slash na końcu `proxy_pass` powoduje, że Nginx "obcina" prefiks z zapytania przed wysłaniem go do serwisu docelowego).

## Alternatywy
*   **Traefik / Kong:** Potężne narzędzia typu API Gateway, ale dla projektu tej skali Nginx jest lżejszy i oferuje wystarczającą wydajność przy znacznie prostszej konfiguracji.
