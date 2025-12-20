# Service B2B Data (Company Verifier)

Mikroserwis odpowiedzialny za weryfikację danych kontrahentów na podstawie numeru NIP.

## Technologia
- **Framework:** FastAPI
- **Cache:** Redis
- **Język:** Python 3.11
- **Zarządzanie pakietami:** Poetry

## Funkcjonalności
1. **Weryfikacja NIP:** Pobieranie danych o firmach (symulacja integracji z rejestrami zewnętrznymi).
2. **Inteligentny Cache:** Wyniki pierwszego zapytania są zapisywane w Redisie. Kolejne zapytania o ten sam NIP są obsługiwane natychmiastowo, bez obciążania zewnętrznych API.

## API Endpointy
- **Docs (Swagger):** `http://localhost:8001/docs`
- **Weryfikacja:** `GET /api/v1/companies/{nip}`

## Dlaczego FastAPI?
Wybraliśmy FastAPI ze względu na jego szybkość (podobnie jak Go czy Node.js) oraz natywne wsparcie dla programowania asynchronicznego (`async/await`), co jest idealne dla serwisów pełniących rolę "proxy" do innych API i baz danych.

## Jak testować
Dla celów demonstracyjnych serwis posiada "zmockowany" NIP, który zawsze zwraca poprawne dane:
- **NIP:** `1234567890`
- **Odpowiedź:** ACME Corp, Warszawa.
Każdy inny NIP spowoduje próbę połączenia z zewnętrznym API (lub błąd 404, jeśli API GUS nie jest skonfigurowane).
