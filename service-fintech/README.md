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

### Przelewy (Transfer)
Endpoint: `POST /api/accounts/transfer`

System wymaga dwóch różnych typów identyfikatorów:
1. **sender_account_id**: Techniczny identyfikator `UUID` (pobierz go z `GET /api/accounts/{user_id}`).
2. **receiver_account_number**: Publiczny, 26-cyfrowy numer konta odbiorcy.

**Przykładowy JSON przelewu:**
```json
{
  "sender_account_id": "031efd9d-0b1f-483b-a43a-fa42182bcb54",
  "receiver_account_number": "92015913777843036158574985",
  "amount": 100.00,
  "description": "Czynsz za grudzień"
}
```

*Logika przelewu jest atomowa (ACID) - jeśli odbiorca nie istnieje lub nadawca nie ma środków, żadne zmiany nie zostaną zapisane w bazie.*
