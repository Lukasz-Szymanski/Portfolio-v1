# Decyzje Architektoniczne: Frontend

## 1. Wybór: React + Vite (zamiast Create React App)
**Problem:** Potrzebujemy nowoczesnego środowiska dla Reacta, które jest szybkie i wspiera TypeScript.

**Opcje:**
1.  **Create React App (CRA):**
    *   *Status:* Przestarzałe (Deprecated). Wolne budowanie (Webpack). Ogromne paczki.
2.  **Next.js:**
    *   *Wada:* To framework fullstackowy (Server Side Rendering). My chcemy czyste SPA, bo backend mamy w Pythonie. Mieszanie Next.js z Django/FastAPI w jednym repo to dodatkowa komplikacja na start.
3.  **Vite:**
    *   *Zaleta:* Błyskawiczny start serwera (używa ES Modules). Natywne wsparcie dla TypeScript. Lekki build produkcyjny.

**Decyzja:** Wybieramy **Vite**. To obecnie standard dla aplikacji typu SPA (Single Page Application).

## 2. Architektura Nawigacji: Conditional Rendering vs React Router
**Problem:** Chcemy, aby strona miała podstrony ("O mnie", "Projekty"), ale działała płynnie bez przeładowania.

**Opcje:**
1.  **React Router DOM:** Standardowa biblioteka do routingu. Zmienia URL w przeglądarce (`/about`, `/projects`).
    *   *Zaleta:* Obsługa przycisku "Wstecz" w przeglądarce.
    *   *Wada:* Wymaga konfiguracji Nginxa (przekierowanie wszystkich 404 na index.html), bo inaczej odświeżenie strony `/about` zwróci błąd serwera.
2.  **Conditional Rendering (State-based SPA):** Prosty `switch(activeSection)` w głównym komponencie.
    *   *Zaleta:* Banalna implementacja. Działa "out of the box" na każdym serwerze. Idealne dla portfolio "wizytówkowego".
    *   *Wada:* Brak zmiany URL w pasku adresu (chyba że dodamy ręczną obsługę History API).

**Decyzja:** Na etapie MVP wybieramy **Conditional Rendering**.
**Dlaczego?** Pozwala nam to skupić się na treści i backendzie, zamiast walczyć z konfiguracją routingu w Nginx. Efekt wizualny dla użytkownika jest identyczny (płynne przejścia).

## 3. Komunikacja z Backendem: Proxy w dev vs Production
**Problem:** W Dockerze API jest na innym "komputerze" (kontenerze) niż Frontend.
**Rozwiązanie:** W `vite.config.ts` (lub przez Nginx w produkcji) ustawiamy proxy.
Frontend strzela na `/api`, a serwer w tle przekazuje to do `http://backend:8000`.
To pozwala pisać kod frontendu (`fetch('/api/users')`), który jest agnostyczny względem domeny. Nie hardkodujemy `localhost:8000` w kodzie Reacta.