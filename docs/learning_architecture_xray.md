# ADR: Architecture X-Ray Mode (Interactive Technical Documentation)

## Status
Zaakceptowany

## Kontekst
Większość portfolio programistycznych to "czarne skrzynki" – rekruter widzi ładny interfejs, ale musi wejść na GitHub i przeszukać tysiące linii kodu, aby zrozumieć, jak system działa pod spodem. Chciałem skrócić tę drogę i pokazać architekturę bezpośrednio w działającej aplikacji.

## Decyzja
Implementacja autorskiego trybu **"X-Ray Mode"** (Architecture Transparency Mode). Jest to warstwa wizualna nakładana na interfejs użytkownika, która dekonstruuje aplikację na jej techniczne składowe.

## Uzasadnienie edukacyjne
Tryb X-Ray pokazuje, że programista:
1. **Rozumie High-Level Architecture:** Wie, który komponent łączy się z którą bazą danych i przez jakie API.
2. **Dba o Developer Experience (DX):** Potrafi tworzyć narzędzia ułatwiające zrozumienie systemu innym programistom.
3. **Potrafi pracować ze stanem globalnym:** Wykorzystanie React Context do sterowania widocznością metadanych w całej aplikacji.

## Implementacja techniczna
* **XRayWrapper:** Komponent wyższego rzędu (Higher Order Component-like), który wykorzystuje `framer-motion` do animowanego wyświetlania ramek technicznych.
* **Visual Masking:** Etykiety techniczne wykorzystują tło identyczne z tłem aplikacji (`bg-slate-950`), co pozwala na efektowne "przecinanie" linii przerywanych i poprawia czytelność tekstu (Masking Pattern).
* **Metadata Injection:** Każdy kluczowy moduł systemu (Fintech, B2B, Monitor) jest opisany przez parametry: `tech` (technologia), `endpoint` (punkt końcowy API) oraz `description` (wzorzec projektowy).
* **Isolation:** Tryb deweloperski jest całkowicie odizolowany od logiki biznesowej, dzięki czemu nie wpływa na wydajność ani stabilność aplikacji w trybie użytkownika.

## UI/UX Szlify
* **Deep Contrast:** Wykorzystanie białego tekstu na ciemnych plakietkach z grubym obramowaniem (`border-2`), aby informacje techniczne odcinały się od dynamicznych treści Dashboardu.
* **Spatial Awareness:** Zastosowanie ujemnych marginesów (`-inset-6`) zapewnia "oddech" między ramką Rentgena a interfejsem użytkownika, zapobiegając wizualnemu tłokowi.

## Czego się nauczyłem?
* Projektowania komponentów typu "wrapper" o wysokim stopniu reużywalności.
* Efektywnego zarządzania `z-index` i pozycjonowaniem absolutnym w skomplikowanych layoutach.
* Tworzenia "edukacyjnego UX", który pomaga sprzedać techniczne umiejętności w wizualny sposób.
