# Architecture Decision Record: Fintech Simulator Tech Stack

## Status
Zaakceptowane

## Kontekst
W ramach Fazy 3 budujemy "Fintech Simulator". Będzie to usługa odpowiedzialna za bardziej złożoną logikę biznesową: konta użytkowników, transakcje, saldo, historię operacji. Wymaga to solidnego modelu danych, transakcyjności (ACID) oraz wydajnego API.

## Decyzja
Wybieramy **Django Ninja** jako framework backendowy oraz **PostgreSQL** jako bazę danych.

## Uzasadnienie Techniczne

### 1. Dlaczego Django (zamiast czystego FastAPI jak w Faza 2)?
*   **"Batteries Included":** Django oferuje gotowy, potężny ORM (Object-Relational Mapping), system migracji bazy danych, panel administracyjny oraz system uwierzytelniania. W systemach typu Fintech, gdzie relacje między danymi (Użytkownik -> Konto -> Transakcja) są kluczowe, Django ORM znacznie przyspiesza development w porównaniu do ręcznego pisania zapytań SQL lub konfiguracji SQLAlchemy (choć SQLAlchemy jest świetne, Django daje szybszy start przy standardowych relacjach).
*   **Bezpieczeństwo:** Django ma wbudowane mechanizmy ochrony przed wieloma atakami (CSRF, SQL Injection w ORM), co jest krytyczne dla aplikacji finansowych.

### 2. Dlaczego Django Ninja (zamiast Django REST Framework - DRF)?
*   **Nowoczesność i Type Hints:** Django Ninja to "FastAPI dla Django". Pozwala pisać API używając standardowych "type hints" Pythona (Pydantic), co czyni kod czystszym i bardziej zrozumiałym niż w starszym DRF (opartym na klasach Serializerów).
*   **Wydajność developera:** Jeśli znasz FastAPI (użyte w Fazie 2), poczujesz się w Django Ninja jak w domu. Składnia jest niemal identyczna.
*   **Automatyczna dokumentacja:** Tak jak FastAPI, Ninja generuje interaktywną dokumentację OpenAPI (Swagger) "out of the box".

### 3. Dlaczego PostgreSQL?
*   **Standard w Finansach:** Postgres to najbardziej zaawansowana baza open-source. Oferuje pełną zgodność z ACID (Atomicity, Consistency, Isolation, Durability), co jest absolutnie niezbędne przy operacjach na pieniądzach.
*   **Typy danych:** Obsługa typów takich jak `Decimal` (kluczowe dla walut, by uniknąć błędów zaokrągleń float) jest w Postgresie wzorowa.
*   **Rozszerzalność:** Możliwość łatwego skalowania i tworzenia skomplikowanych zapytań analitycznych.

## Alternatywy odrzucone
*   **Flask/FastAPI + SQLAlchemy:** Odrzucone, ponieważ musielibyśmy ręcznie budować panel admina i system zarządzania użytkownikami, które Django daje za darmo.
*   **Django REST Framework (DRF):** Odrzucone ze względu na większy "boilerplate" (nadmiarowy kod) i starsze podejście do definicji API w porównaniu do Pydantic/Ninja.
*   **MongoDB:** Odrzucone. Dane finansowe są z natury relacyjne i strukturalne. NoSQL nie gwarantuje tak silnych więzów integralności danych jak SQL przy transakcjach finansowych.

## Lekcje z implementacji (Update Faza 5)
Podczas pracy nad historią transakcji napotkaliśmy błąd `PydanticSchemaGenerationError` spowodowany użyciem wbudowanej funkcji `any` jako typu pola.
*   **Wniosek:** Pydantic wymaga precyzyjnych typów. Zamiast `any` należy używać `datetime` (z modułu `datetime`) lub `Any` (z modułu `typing`), choć to drugie jest niezalecane w API. Silne typowanie to nie tylko dokumentacja, to bezpieczeństwo runtime'u.
