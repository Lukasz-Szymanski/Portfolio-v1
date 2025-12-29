# Portfolio Projects Brief - Python Backend (2025)

## 1. PROJEKT "FINTECH": Secure Payment Simulator
**Cel:** Symulacja procesu płatności e-commerce z naciskiem na bezpieczeństwo i spójność danych.
**Stack:** Django + Django Ninja + PostgreSQL + Docker.

### User Flow
1. **Inicjalizacja:** Użytkownik (Merchant) tworzy `PaymentIntent` (kwota, waluta, order_id).
2. **Przekierowanie:** Backend zwraca unikalny token/link do symulatora.
3. **Akcja:** Płatnik wybiera status (SUCCESS/FAIL) w UI Reactowym.
4. **Proces:** Backend wykonuje operację atomową (update statusu, log transakcyjny).
5. **Notyfikacja:** Worker (lub sygnał) wysyła podpisany Webhook (HMAC-SHA256) do Merchanta.

### Endpoints Contract
| Metoda | Endpoint | Opis |
| :--- | :--- | :--- |
| POST | `/api/v1/payments/create` | Tworzy intencję płatności, zwraca `payment_token`. |
| GET | `/api/v1/payments/{token}` | Pobiera szczegóły płatności dla frontendu. |
| POST | `/api/v1/payments/{token}/process` | Finalizuje płatność (symulacja sukcesu/porażki). |
| GET | `/api/v1/webhooks/history` | Lista wysłanych powiadomień i ich statusów (delivery check). |

### Database Schema
- **Merchants:** `id, name, api_key, webhook_secret`.
- **PaymentIntents:** `id, merchant_id, amount, currency, status (enum), idempotency_key`.
- **Transactions:** `id, payment_intent_id, type, raw_response, created_at`.
- **WebhookLogs:** `id, payment_intent_id, url, payload, status_code, attempt_count`.

### 🏆 Seniority Check
- **Idempotency:** Obsługa nagłówka `Idempotency-Key` zapobiegająca podwójnemu obciążeniu.
- **Atomic Transactions:** Wykorzystanie `transaction.atomic()` w Django dla zapewnienia spójności statusu.
- **HMAC Signatures:** Implementacja podpisywania payloadu Webhooka kluczem prywatnym Merchanta.

---

## 2. PROJEKT "B2B DATA": Company Verifier & Cache
**Cel:** Szybka wyszukiwarka danych firmowych z optymalizacją zapytań do zewnętrznych API.
**Stack:** FastAPI + Redis + PostgreSQL + React.

### User Flow
1. **Zapytanie:** Użytkownik wpisuje NIP w wyszukiwarce.
2. **Warstwa Cache:** Backend sprawdza Redisa (klucz: `nip:{numer}`).
3. **Fallback:** Jeśli brak w Redis, Backend odpytuje zewnętrzne API (np. symulowany GUS).
4. **Persystencja:** Dane trafiają do Redis (TTL: 24h) oraz do PostgreSQL (jako historia wyszukiwań).
5. **Wynik:** Frontend wyświetla dane firmy z informacją o źródle (Cache/Live).

### Endpoints Contract
| Metoda | Endpoint | Opis |
| :--- | :--- | :--- |
| GET | `/api/v1/companies/{nip}` | Zwraca dane firmy (logic: Cache -> API -> DB). |
| GET | `/api/v1/analytics/popular` | Zwraca najczęściej wyszukiwane NIP-y z bazy. |
| POST | `/api/v1/cache/clear` | Czyści cache dla danego NIP-u (admin tool). |

### Database Schema
- **CompanySearches:** `id, nip, company_name, address, raw_json, last_updated`.
- **SearchStats:** `id, nip, count, last_searched_at`.

### 🏆 Seniority Check
- **Dependency Injection:** Czyste wstrzykiwanie klientów Redis/DB w FastAPI.
- **Circuit Breaker:** Prosty mechanizm (np. w Redis), który blokuje odpytywanie API GUS, jeśli to zwraca błędy 5xx.
- **Pydantic Models:** Pełna walidacja i typowanie danych przychodzących z niepewnego zewnętrznego źródła.

---

## 3. PROJEKT "E-COMMERCE INTEL": Price Monitor MVP
**Cel:** Asynchroniczny monitoring cen produktów z powiadomieniami.
**Stack:** Python + Celery + Redis + PostgreSQL + React (Recharts).

### User Flow
1. **Subskrypcja:** Użytkownik podaje URL produktu i cenę docelową.
2. **Task:** Celery rejestruje zadanie okresowe (Periodic Task).
3. **Scraping:** Worker pobiera stronę, parsuje cenę i zapisuje w `PriceHistory`.
4. **Alert:** Jeśli cena <= docelowa, system loguje zdarzenie (możliwość rozbudowy o email).
5. **Wizualizacja:** Frontend pobiera historię i rysuje wykres zmian ceny w czasie.

### Endpoints Contract
| Metoda | Endpoint | Opis |
| :--- | :--- | :--- |
| POST | `/api/v1/monitors` | Dodaje produkt do śledzenia. |
| GET | `/api/v1/monitors/{id}/history` | Pobiera dane do wykresu liniowego. |
| DELETE | `/api/v1/monitors/{id}` | Usuwa monitoring i czyści zadania Celery. |

### Database Schema
- **TrackedProducts:** `id, user_id, url, target_price, current_price, is_active`.
- **PriceHistory:** `id, product_id, price, measured_at`.

### 🏆 Seniority Check
- **Async Workers:** Separacja procesu API od ciężkiego scrapingu (Celery Workers).
- **Graceful Retries:** Konfiguracja `exponential backoff` dla zadań scrapowania, które mogą zawieść.
- **Headless Browser/Parser:** Użycie `BeautifulSoup` z customowymi nagłówkami (User-Agent rotation) dla uniknięcia blokad.

---

## Stack "Must Have" 2025
- **Lint/Format:** `Ruff` (zastępuje Black, Isort, Flake8).
- **Typowanie:** `Mypy` (strict mode).
- **Zależności:** `Poetry` lub `uv`.
- **Testy:** `Pytest` + `FactoryBoy`.
- **Frontend:** `Vite` + `TypeScript` + `TanStack Query`.
