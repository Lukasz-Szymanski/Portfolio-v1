# Architecture Decision Record: Dashboard Modularization & Data Aggregation

## Status
Zaakceptowane

## Kontekst
W miarę rozwoju projektu, Dashboard zaczął agregować funkcjonalności z trzech różnych mikroserwisów. Wyświetlanie wszystkiego na jednej długiej stronie stało się nieczytelne (zły UX). Dodatkowo musieliśmy rozwiązać problem wyświetlania danych z serwisu typu "Worker" (Price Monitor), który nie posiada własnego API HTTP.

## Decyzje

### 1. Dedicated Project Views (View Container)
Zamiast budować ogólny "Dashboard" z wieloma zakładkami, przekształciliśmy stronę `/dashboard` w kontener widoków dedykowanych.
*   **Routing:** Używamy Query Parameters (`?view=fintech`), aby określić, który mikroserwis ma zostać zaprezentowany.
*   **Minimalizm:** Usunęliśmy nawigację wewnątrz dashboardu. Użytkownik wybiera projekt na stronie głównej (Landing Page) i trafia bezpośrednio do izolowanego środowiska demo.
*   **Focus:** Każdy widok (Fintech, B2B, Monitor) posiada własny nagłówek i kontekst, co sprawia wrażenie korzystania z osobnej aplikacji.

### 2. Agregacja danych (Worker -> Redis -> API -> Frontend)
Serwis `Price Monitor` jest workerem Celery i nie wystawia portu HTTP. Aby wyświetlić jego dane na frontendzie:
1.  **Zapis:** Worker zapisuje ceny krypto do **Redisa** (klucze `crypto:bitcoin`).
2.  **Odczyt:** Serwis `B2B Data` (FastAPI), który ma dostęp do tego samego Redisa, wystawia endpoint `GET /api/v1/crypto`.
3.  **Prezentacja:** Frontend pobiera dane z tego endpointu.
*   **Wniosek:** Wykorzystaliśmy istniejącą infrastrukturę (współdzielony Redis), unikając tworzenia nadmiarowego serwera HTTP dla workera.

## Alternatywy
*   **Osobny serwer dla Monitora:** Odrzucone. Zwiększyłoby to skomplikowanie infrastruktury (kolejny kontener, kolejny port) dla prostej funkcjonalności odczytu dwóch wartości.
*   **WebSockets:** Rozważane do cen krypto w czasie rzeczywistym, ale uznane za "overkill" na tym etapie. Odświeżanie co 60s (React Query `refetchInterval`) jest wystarczające.
