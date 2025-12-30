# Architecture Decision Record: Stripe Payments Integration

## Status
Zakończone (30.12.2025)

## Wyzwania Techniczne i Rozwiązania

### 1. Problem precyzji finansowej (Decimal vs Float)
Podczas implementacji Webhooka wystąpił błąd `TypeError`. Stripe przesyła kwoty jako liczby zmiennoprzecinkowe (float), podczas gdy system bankowy (Django Models) operuje na typie `Decimal`.
- **Dlaczego to ważne?** Używanie `float` w finansach prowadzi do błędów zaokrągleń (np. `0.1 + 0.2 != 0.3`).
- **Rozwiązanie:** Wszystkie dane wejściowe ze Stripe są jawnie rzutowane na `Decimal` przed wykonaniem operacji arytmetycznych na saldzie konta.

### 2. Sidecar Container (Dockerized Stripe CLI)
Zamiast wymagać od programisty instalacji lokalnych narzędzi, Stripe CLI został zintegrowany bezpośrednio z `docker-compose.yml`.
- **Zaleta:** Środowisko deweloperskie jest w 100% przenośne. Wystarczy `docker compose up`, aby automatycznie wystartować tunelowanie webhooków.
- **Konfiguracja:** Wykorzystano oficjalny obraz `stripe/stripe-cli` z flagą `--forward-to`, kierującą ruch do kontenera `nginx`.

## Szczegóły Implementacji
### 1. Backend (Django)
- Wykorzystano oficjalną bibliotekę `stripe`.
- Implementacja `create_stripe_checkout_session`: Endpoint generujący bezpieczny link do płatności, przesyłający ID konta w metadanych sesji.
- Implementacja `stripe_webhook`: Kluczowy element bezpieczeństwa. Endpoint odbiera sygnały od Stripe, weryfikuje ich autentyczność (Signature Verification) i atomowo aktualizuje saldo w bazie danych.

### 2. Środowisko testowe
- Wykorzystano **Stripe CLI** do tunelowania webhooków na localhost.
- Zastosowano model `DEPOSIT` w historii transakcji, aby zachować spójność z systemem bankowym.

### 3. Frontend (React)
- Integracja przycisku "Refill Account" wyzwalającego sesję płatniczą.
- Obsługa loading state podczas komunikacji z API Stripe.

## Bezpieczeństwo
Webhooki są chronione przed atakami typu "Replay" i "Spoofing" poprzez weryfikację nagłówka `HTTP_STRIPE_SIGNATURE` za pomocą tajnego klucza `STRIPE_WEBHOOK_SECRET`.

## Wnioski
Integracja udowadnia umiejętność budowy systemów typu SaaS, gdzie stan lokalnej bazy danych musi być synchronizowany z zewnętrznymi zdarzeniami finansowymi w sposób pewny i bezpieczny.
