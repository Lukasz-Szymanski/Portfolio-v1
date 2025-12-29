# ADR: Guest Session Management (Auth-Lite)

## Status
Zaakceptowany

## Kontekst
Projekt ma być dostępny dla rekruterów bez konieczności rejestracji konta (eliminacja "friction").

## Decyzja
Implementacja mechanizmu **"Guest Access"** opartego na `localStorage` i dedykowanym endpoincie inicjalizującym.

## Uzasadnienie edukacyjne
Zamiast budować pełny system OAuth2, który byłby przeszkodą dla kogoś, kto chce tylko "zobaczyć demo", stworzyliśmy system, który generuje unikalne środowisko dla każdego gościa. To podejście uczy, jak projektować systemy z myślą o użytkowniku końcowym (User-Centric Design), zachowując przy tym czystą separację danych na backendzie.

## Czego się nauczyłem?
* Jak zarządzać stanem sesji po stronie klienta bez ciasteczek (LocalStorage).
* Jak tworzyć "seeding danych" na żądanie (dynamiczne tworzenie konta i historii transakcji).
