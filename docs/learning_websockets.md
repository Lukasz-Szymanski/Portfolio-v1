# Architecture Decision Record: Real-time Updates via WebSockets

## Status
Zaimplementowano (29.12.2025)

## Kontekst
W Fazie 11 ("Real-time Architecture") celem było odejście od statycznego odświeżania strony (polling) na rzecz komunikacji dwukierunkowej w czasie rzeczywistym. Głównym przypadkiem użycia jest "Live Crypto Ticker" – aktualizacja cen Bitcoina i Ethereum bez przeładowania strony.

## Decyzja
Zdecydowano się na użycie **FastAPI WebSockets** (w serwisie `service-b2b-data`) w połączeniu z **Redis Pub/Sub**, zamiast Django Channels.

## Alternatywy
1. **Django Channels (service-fintech)**
   - *Zalety:* Pełna integracja z Django ORM, dobre do powiadomień użytkownika (np. "Otrzymałeś przelew").
   - *Wady:* Wymaga serwera ASGI (Daphne/Uvicorn) skonfigurowanego pod Django, osobnego workera, cięższa konfiguracja dla prostego streamingu danych rynkowych.

2. **Socket.io (Node.js)**
   - *Zalety:* Bardzo popularne w świecie JS.
   - *Wady:* Wprowadza nową technologię backendową (Node.js) do stacku Pythonowego, overkill dla prostego broadcastu.

3. **Polling (React Query)**
   - *Zalety:* Proste, działało do tej pory.
   - *Wady:* Opóźnienia (min. 60s), zbędny ruch sieciowy (HTTP overhead), brak efektu "Live".

## Szczegóły Implementacji
### 1. Backend (FastAPI + Redis)
- Serwis `service-b2b-data` (FastAPI) wystawia endpoint `WebSocket /ws/crypto`.
- Użyto biblioteki `redis-py` (async) do subskrypcji kanału `crypto_updates`.
- Gdy `service-price-monitor` (Celery) lub Cron Vercel pobierze nową cenę, publikuje ją na kanale Redis: `r.publish("crypto_updates", json_data)`.
- FastAPI natychmiast wypycha wiadomość do wszystkich podłączonych klientów WebSocket.

### 2. Infrastructure (Nginx)
- Dodano blok `location /ws/` w Nginx, który obsługuje Upgrade nagłówków (HTTP 1.1 -> WebSocket).
- Przekierowanie ruchu na port 8001 (service-b2b).

### 3. Frontend (React)
- Komponent `CryptoTicker` został przepisany z `useQuery` na `useEffect` + `WebSocket`.
- Dodano wskaźnik stanu połączenia (ikona "Live/Zap").
- Logika automatycznie wykrywa protokół (`ws://` lub `wss://`) i łączy się z gatewayem.

## Wnioski
Rozwiązanie jest "Cloud Native" i bardzo wydajne. Redis działa jako centralna szyna danych, oddzielając producenta danych (Celery/Cron) od konsumenta (WebSockets). FastAPI świetnie radzi sobie z obsługą wielu połączeń asynchronicznych.
