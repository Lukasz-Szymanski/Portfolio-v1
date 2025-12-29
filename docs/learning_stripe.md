# Architecture Decision Record: Stripe Payments Integration

## Status
W trakcie implementacji (29.12.2025)

## Kontekst
W Fazie 10 ("Biznes & Płatności") celem było zademonstrowanie umiejętności obsługi zewnętrznych systemów finansowych i asynchronicznego przetwarzania wpłat.

## Decyzja
Wybrano **Stripe Checkout** ze względu na najwyższe standardy bezpieczeństwa (PCI Compliance) oraz doskonałe API.

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
