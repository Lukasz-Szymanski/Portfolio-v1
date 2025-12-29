# Edukacja: FastAPI i Redis (Faza 2)

Zbudowaliśmy Twój pierwszy mikroserwis. Oto dlaczego to rozwiązanie jest "Senior+":

---

## 1. FastAPI i Asynchroniczność (`async def`)
Zauważyłeś, że funkcje zaczynają się od `async def`? 
- W tradycyjnym Pythonie (np. stary Flask), gdy jeden użytkownik czekał na odpowiedź z bazy, cały serwer był zablokowany.
- W FastAPI używamy **pętli zdarzeń (Event Loop)**. Serwer może obsługiwać tysiące zapytań naraz. Gdy Python czeka na dane z Redisa, zajmuje się obsługą innego użytkownika. To klucz do skalowalności.

## 2. Dependency Injection (`Depends`)
W funkcji `get_company` mamy argument: `r: redis.Redis = Depends(get_redis)`.
To jest "Wstrzykiwanie Zależności". 
- **Dlaczego tak?** Bo jeśli jutro będziemy chcieli napisać testy, możemy bardzo łatwo "podstawić" pod `r` fałszywego Redisa (Mock), nie zmieniając ani jednej linijki w logice biznesowej. To podstawa **Clean Architecture**.

## 3. Strategia Cachowania (Cache-Aside Pattern)
Nasz kod realizuje klasyczny wzorzec:
1. Sprawdź czy dane są w szybkim magazynie (Redis).
2. Jeśli są (**Hit**) -> Zwróć od razu.
3. Jeśli ich nie ma (**Miss**) -> Wykonaj kosztowną operację (odpytaj API GUS), zapisz wynik do Cache i zwróć użytkownikowi.
4. **TTL (Time To Live):** Ustawiliśmy `60` sekund. Dzięki temu dane w Cache same "wyparują", co zapobiega serwowaniu nieaktualnych informacji.

---

## Pytania na rozmowę:

1. **"Co się stanie, jeśli Redis padnie?"**
   *Odpowiedź:* "W obecnej wersji rzuci błędem 500. Profesjonalnie dodałbym `try/except` wokół Redisa, aby w przypadku jego awarii system po prostu zawsze pytał Live API (tzw. Graceful Degradation)".

2. **"Dlaczego używasz Pydantic (typowań) w FastAPI?"**
   *Odpowiedź:* "Dzięki temu FastAPI automatycznie generuje dokumentację Swagger i waliduje dane wejściowe. Jeśli ktoś wyśle NIP jako listę zamiast stringa, serwer sam odrzuci żądanie z czytelnym błędem".

---

### Twój następny krok:
1. Musimy uruchomić `docker-compose up --build`, aby zobaczyć, czy Python wstaje.
2. Musimy odblokować routing w Nginx dla tego serwisu.
