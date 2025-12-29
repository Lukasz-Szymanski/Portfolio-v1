# Architecture Decision Record: Financial Data Schema

## Status
Zaakceptowane

## Kontekst
Musimy zaprojektować sposób przechowywania informacji o pieniądzach użytkowników w serwisie Fintech.

## Decyzja
Wybieramy relacyjny model danych z silnym typowaniem numerycznym.

### 1. Model `Account`
*   **UUID jako Primary Key:** Zamiast standardowych ID (1, 2, 3), używamy UUID. Jest to bezpieczniejsze (nikt nie zgadnie ID konta w URL) i ułatwia synchronizację między systemami.
*   **DecimalField:** Absolutnie krytyczne. Nigdy nie używamy `Float` dla pieniędzy. `Decimal` zapewnia stałą precyzję (np. 2 miejsca po przecinku) i eliminuje błędy binarnego zapisu ułamków (np. słynne 0.1 + 0.2 != 0.3).

### 2. Model `Transaction`
*   **Foreign Key:** Każda transakcja jest sztywno powiązana z kontem.
*   **Immutable Records:** Transakcje w systemach finansowych powinny być (teoretycznie) dopisywane, a nie edytowane. Jeśli użytkownik wypłaca pieniądze, tworzymy rekord transakcji, a nie tylko zmieniamy `balance` w `Account`. Dzięki temu mamy pełną ścieżkę audytu.

## Spójność danych (ACID)
Dzięki użyciu PostgreSQL, operacje takie jak przelew (odjęcie z jednego konta, dodanie do drugiego) będziemy owijać w `transaction.atomic`. Jeśli jakakolwiek część operacji zawiedzie, baza danych cofnie wszystkie zmiany, zapobiegając "zaginięciu" pieniędzy.

## Alternatywy
*   **Baza NoSQL (np. MongoDB):** Odrzucone. Brak natywnej obsługi transakcji wielodokumentowych na poziomie tak niezawodnym jak SQL czyni ją ryzykowną dla systemów bankowych.
