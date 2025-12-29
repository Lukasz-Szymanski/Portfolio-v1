# ADR: Hybrid Microservices Architecture (Django Ninja + FastAPI)

## Status
Zaakceptowany

## Kontekst
Projekt Portfolio wymagał stworzenia ekosystemu mikroserwisów, które symulują realne środowisko biznesowe. Mieliśmy do zrealizowania dwa odrębne domeny biznesowe:
1. **Fintech Core:** System transakcyjny wymagający spójności danych (ACID) i stabilnego ORM.
2. **B2B Data Service:** Serwis proxy/cache dla danych zewnętrznych.

## Decyzja
Wykorzystaliśmy różne frameworki dla różnych zadań:
* **Django + Django Ninja** dla Fintechu (stabilność, ORM, migracje).
* **FastAPI** dla B2B Data (lekkość, szybkość, async I/O).

## Uzasadnienie edukacyjne
Wybór "najlepszego narzędzia do zadania" (Best tool for the job) to kluczowa umiejętność architekta. Django Ninja daje nam bezpieczeństwo typów (Pydantic) przy potędze ekosystemu Django, podczas gdy FastAPI idealnie radzi sobie z prostymi, asynchronicznymi zapytaniami do Redisa i zewnętrznych API.

## Czego się nauczyłem?
* Jak integrować dwa różne frameworki w jednym systemie (Docker Compose + Nginx).
* Jakie są różnice w wydajności między synchronicznym Django a asynchronicznym FastAPI.
