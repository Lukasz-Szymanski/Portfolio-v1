# Decyzje Architektoniczne: Infrastruktura

## 1. Wybór: Docker Compose jako Orkiestrator
**Problem:** Potrzebujemy uruchomić 4 różne serwisy (React, FastAPI, Django, Redis, Postgres) w spójnym środowisku, które zadziała tak samo na Windowsie developera i na serwerze produkcyjnym.

**Opcje:**
1.  **Uruchamianie ręczne:** 5 okien terminala (`npm start`, `python main.py`...).
    *   *Wada:* "U mnie działa" - piekło z wersjami Pythona/Node. Trudne do odtworzenia.
2.  **Kubernetes (K8s):**
    *   *Wada:* Ogromny narzut zasobów i skomplikowania dla jednoosobowego zespołu. Overkill na start.
3.  **Docker Compose:**
    *   *Zaleta:* Definicja całej infrastruktury w jednym pliku YAML. Jedna komenda `up` stawia wszystko. Izolacja sieci.

**Decyzja:** Wybieramy **Docker Compose**. Jest to standard branżowy dla środowisk deweloperskich i małych wdrożeń produkcyjnych.

## 2. Wybór: Nginx jako API Gateway (Reverse Proxy)
**Problem:** Frontend (React) działa na porcie 5173. Backend B2B na 8001. Backend Fintech na 8000. Przeglądarka blokuje zapytania między różnymi portami (CORS), a użytkownik nie chce pamiętać, który serwis jest na którym porcie.

**Opcje:**
1.  **Wystawienie portów bezpośrednio (CORS):** Frontend strzela prosto do `localhost:8001`.
    *   *Wada:* Musimy konfigurować nagłówki `Access-Control-Allow-Origin` w każdym mikroserwisie. Bałagan w kodzie frontendu (sztywne adresy).
2.  **API Gateway (Nginx):** Wszystko jest dostępne pod jednym adresem (port 80).
    *   *Zaleta:* Frontend widzi API jako `/api/...`. Nginx zajmuje się kierowaniem ruchu do odpowiedniego kontenera.
    *   *Zaleta:* Łatwo dodać SSL (HTTPS) w jednym miejscu w przyszłości.

**Decyzja:** Wdrażamy **Nginx** jako punkt wejścia (Gateway). To profesjonalne podejście ("Pattern: API Gateway"), które upraszcza kod aplikacji i zwiększa bezpieczeństwo.

## 3. Sieci w Dockerze (Bridge Network)
**Decyzja:** Używamy dedykowanej sieci `portfolio_network`.
**Dlaczego?** Kontenery widzą się po nazwach usług (DNS). Kod FastAPI łączy się z Redisem wpisując host=`redis`, a nie sztywne IP `172.18.0.4`. To sprawia, że konfiguracja jest niezależna od restartów maszyny.
