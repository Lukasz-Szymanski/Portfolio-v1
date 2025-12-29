# Architecture Decision Record: Asynchronous Background Tasks (Celery)

## Status
Zaakceptowane

## Kontekst
W systemach webowych niektóre operacje trwają zbyt długo, by wykonywać je w czasie obsługi żądania HTTP (np. generowanie raportu PDF, wysyłanie e-maili, cykliczne pobieranie cen kryptowalut). Zablokowanie użytkownika na 10 sekund, aż serwer pobierze dane, jest niedopuszczalne.

## Decyzja
Wdrażamy **Celery** jako system kolejkowy oraz **Redis** jako Broker wiadomości.

## Jak to działa?
Architektura składa się z trzech elementów:
1.  **Producer (Producent):** Ktoś, kto zleca zadanie (np. "Pobierz ceny Bitcoina").
2.  **Broker (Redis):** Pośrednik. Skrzynka pocztowa, do której trafiają zadania. Przechowuje je w pamięci RAM.
3.  **Worker (Celery):** Robot, który w tle patrzy na skrzynkę (Redis). Gdy pojawia się zadanie, bierze je i wykonuje.

## Dlaczego Celery?
*   **Standard w Pythonie:** Najbardziej dojrzałe i popularne rozwiązanie.
*   **Skalowalność:** Jeśli zadań jest za dużo, możemy po prostu uruchomić 5 kolejnych kontenerów z Workerami, a one same podzielą się pracą z jednej kolejki Redisa.
*   **Obsługa błędów:** Celery potrafi automatycznie ponawiać zadania (retries), które się nie udały (np. przez chwilowy brak internetu).

## Zastosowanie w projekcie
Serwis `service-price-monitor` będzie działał jako **Celery Beat** (harmonogram) oraz **Worker**. Będzie co minutę pobierał kursy walut z zewnętrznego API i zapisywał je do bazy danych.
