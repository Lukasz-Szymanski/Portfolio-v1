# Architecture Decision Record: Django Migrations & DB Management

## Status
Zaakceptowane

## Kontekst
W Fazie 2 (FastAPI) nie używaliśmy ORM z automatycznymi migracjami (używaliśmy Redisa). W Fazie 3 wchodzimy w świat baz relacyjnych (PostgreSQL). Musimy zdecydować, jak zarządzać strukturą bazy danych.

## Decyzja
Używamy natywnego systemu migracji Django (`django-admin makemigrations` / `migrate`).

## Dlaczego Django Migrations?

### 1. Automatyzacja
W przeciwieństwie do ręcznego pisania skryptów SQL (jak w `CREATE TABLE...`), Django analizuje nasze klasy w pliku `models.py` i automatycznie generuje pliki migracji (w folderze `migrations/`).

### 2. Kontrola wersji bazy danych
Migracje to pliki Pythona, które commitujemy do Gita. Dzięki temu każdy programista pracujący nad projektem ma tę samą strukturę bazy danych. Jeśli zmienisz nazwę pola w modelu, Django stworzy plik, który tę zmianę odzwierciedli.

### 3. Bezpieczeństwo danych
System migracji dba o to, by zmiany były odwracalne (`backward migrations`) oraz by nie doszło do utraty danych przy prostych operacjach (np. dodanie pola z domyślną wartością).

## Jak z tym pracować?

### Proces wprowadzania zmian:
1.  **Modyfikacja modelu:** Zmieniasz klasę w `models.py`.
2.  **Tworzenie migracji:** Uruchamiasz `python manage.py makemigrations`. Django tworzy nowy plik w `myapp/migrations/`.
3.  **Aplikowanie zmian:** Uruchamiasz `python manage.py migrate`. Django wykonuje SQL na bazie danych i zapisuje w specjalnej tabeli `django_migrations`, że dana migracja została już wykonana.

## Alternatywy
- **Alembic (dla SQLAlchemy):** Bardzo potężny, ale wymaga ręcznej konfiguracji z FastAPI/Flask. Django ma to wbudowane i zintegrowane "z pudełka".
- **Ręczne SQL:** Zbyt podatne na błędy przy większych projektach.

## Uwagi dla tego projektu
W środowisku Dockerowym, migracje powinny być uruchamiane:
- Ręcznie przez `docker exec` (dla pełnej kontroli przez dewelopera).
- Automatycznie w skrypcie `entrypoint.sh` (wersja produkcyjna).
W Fazie 3 będziemy używać metody `docker exec`, abyś nauczył się kontrolować ten proces.
