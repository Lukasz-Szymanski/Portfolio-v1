# Service Price Monitor

Mikroserwis typu Worker odpowiedzialny za zadania asynchroniczne i monitorowanie danych zewnętrznych.

## Technologia
- **Silnik zadań:** Celery
- **Broker:** Redis
- **Język:** Python 3.11
- **API Klient:** Requests (pobieranie z CoinGecko)

## Główne Funkcjonalności
1. **Periodic Tasks:** Automatyczne pobieranie kursów BTC i ETH co 60 sekund.
2. **On-demand Tasks:** Możliwość wywołania zadań przez inne mikroserwisy (np. Fintech) via Redis.

## Jak to działa?
Serwis uruchamia się w trybie `worker` z włączonym harmonogramem `beat` (`-B`). 
Konfiguracja zadań znajduje się w `main.py` pod kluczem `app.conf.beat_schedule`.

## Rozbudowa
Aby dodać nową walutę:
1. Zmodyfikuj listę `ids` w URL wewnątrz funkcji `fetch_crypto_prices`.
2. Dodaj wypisywanie logów dla nowej waluty.
3. Restartuj kontener: `docker compose restart monitor_service`.
