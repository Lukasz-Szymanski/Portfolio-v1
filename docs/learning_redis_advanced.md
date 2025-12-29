# ADR: Redis as a Shared State & Broker

## Status
Zaakceptowany

## Kontekst
Potrzebowaliśmy mechanizmu do cacheowania danych i komunikacji między serwisami (API <-> Worker).

## Decyzja
Wykorzystanie Redisa jako centralnego brokera wiadomości i magazynu klucz-wartość.

## Uzasadnienie edukacyjne
Użycie Redisa pokazuje zrozumienie architektury rozproszonej. Serwis Monitor (Worker) nie "wie" o istnieniu Frontendu – on tylko zapisuje dane do Redisa. Serwis B2B tylko je odczytuje. To klasyczny przykład **decouplingu** (rozluźnienia powiązań), co pozwala na niezależne skalowanie tych komponentów.

## Czego się nauczyłem?
* Konfiguracji Redisa w Dockerze.
* Wykorzystania Redisa jako brokera dla Celery.
* Implementacji wzorca Cache-Aside w FastAPI.
