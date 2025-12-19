# Service Fintech - Simulator

Mikroserwis odpowiedzialny za logikę finansową, symulację kont bankowych i transakcji.

## Technologia
- **Framework:** Django 5.0
- **API:** Django Ninja (Pydantic-based)
- **Baza danych:** PostgreSQL
- **Zarządzanie pakietami:** Poetry

## Pierwsze kroki (po uruchomieniu kontenerów)

Gdy kontenery działają (`docker compose up`), musisz wykonać migracje bazy danych, aby utworzyć tabele systemowe Django oraz tabele aplikacji.

### 1. Wykonanie migracji
Otwórz nowy terminal i wpisz:
```bash
docker exec -it fintech_service python manage.py migrate
```

### 2. Tworzenie administratora (opcjonalnie)
Aby uzyskać dostęp do panelu `/admin`, stwórz konto superużytkownika:
```bash
docker exec -it fintech_service python manage.py createsuperuser
```

## Endpointy
- **API Root:** `http://localhost:8002/api/`
- **Swagger UI:** `http://localhost:8002/api/docs`
- **Django Admin:** `http://localhost:8002/admin/`

### Przykładowy test (Tworzenie konta)
Wyślij `POST` na `/api/accounts/` z body:
```json
{
  "user_id": 1,
  "currency": "PLN"
}
```
*Uwaga: Pole `currency` musi mieć dokładnie 3 znaki (np. PLN, USD, EUR). Przesłanie dłuższej wartości zwróci błąd 422.*
