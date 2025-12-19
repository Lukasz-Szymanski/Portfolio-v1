# Frontend Landing Page & Dashboard

Nowoczesny frontend SPA zbudowany w React, pełniący rolę wizytówki (Landing Page) oraz panelu sterowania mikroserwisami (Fintech Dashboard).

## Technologia
- **Framework:** React 19 (Vite)
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS + Framer Motion
- **API Client:** Axios + TanStack Query
- **Język:** TypeScript

## Struktura Projektu
- `src/api/` - Warstwa komunikacji z mikroserwisami.
- `src/pages/` - Główne widoki (Landing Page, Dashboard).
- `src/components/` - Komponenty UI.

## Integracja z Backendem
Aplikacja łączy się z backendem przez Nginx Gateway. Wszystkie zapytania są kierowane pod relatywny adres `/api/...`, który jest obsługiwany przez Reverse Proxy.

## Rozwój
Aby dodać nowy widok:
1. Stwórz plik w `src/pages/`.
2. Zarejestruj nową ścieżkę w `src/App.tsx`.
3. Jeśli potrzebujesz danych z backendu, dodaj nową usługę w `src/api/`.