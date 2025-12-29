# Architecture Decision Record: Frontend Architecture & API Integration

## Status
Zaakceptowane

## Kontekst
Przygotowujemy frontend do obsługi wielu widoków (Landing Page oraz Dashboardy dla mikroserwisów) oraz komunikacji z backendem przez API Gateway.

## Decyzja
Wybieramy modularne podejście do architektury frontendu oparte na **React Router** oraz dedykowanej warstwie **API Services**.

## Uzasadnienie Techniczne

### 1. Routing (React Router v7/DOM)
Zamiast warunkowego renderowania (`if/switch`) w `App.tsx`, używamy routingu opartego na URL. 
*   **Zaleta:** Możliwość bezpośredniego linkowania do konkretnych części aplikacji (np. `/dashboard`), lepsza obsługa przycisku "wstecz" w przeglądarce i czystszy kod.

### 2. Centralny API Client (Axios)
Tworzymy instancję `apiClient` w `src/api/client.ts`.
*   **Base URL:** Ustawiony na `/api`, co pozwala na automatyczne korzystanie z Nginx Gateway bez konieczności wpisywania pełnych adresów (np. `http://localhost:8001`).
*   **Interceptors:** Miejsce na globalną obsługę błędów (np. logowanie błędów API w konsoli).

### 3. Warstwa Serwisów (API Services)
Każdy mikroserwis ma swój plik (np. `fintech.ts`), który zawiera funkcje asynchroniczne i interfejsy TypeScript.
*   **Zaleta:** Komponenty nie wiedzą *jak* pobrać dane, tylko *jakie* dane są im potrzebne. Ułatwia to testowanie i zmiany w API.

## Struktura Katalogów
*   `src/api/` - Klient i definicje usług backendowych.
*   `src/pages/` - Główne widoki aplikacji (widok Landing, widok Dashboard).
*   `src/components/` - Współdzielone elementy interfejsu (Navbar, przyciski).

## UX: Navigation Persistence (Update)
Ponieważ strona główna (Landing Page) zarządza sekcjami za pomocą lokalnego stanu (`activeSection`), zwykły link powrotny z Dashboardu (`/#projects`) powodowałby otwarcie strony na sekcji "Start" (domyślnej).
*   **Rozwiązanie:** W `LandingPage.tsx` dodano `useEffect`, który przy każdym załadowaniu sprawdza `location.hash`. Jeśli wykryje `#projects`, automatycznie przełącza stan na sekcję projektów i przewija ekran do odpowiedniego miejsca. Zapewnia to płynne przejście między trybem Demo a wyborem projektów.
