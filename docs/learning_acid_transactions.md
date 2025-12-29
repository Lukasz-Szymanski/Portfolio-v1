# Architecture Decision Record: Atomic Transactions & ACID Compliance

## Status
Zaakceptowane

## Kontekst
W operacjach finansowych typu przelew (`transfer`), musimy zagwarantować, że operacja jest niepodzielna. Nie może dojść do sytuacji, w której pieniądze zostaną odjęte z konta nadawcy, ale nie zostaną dodane do konta odbiorcy (np. z powodu błędu serwera w trakcie wykonywania kodu).

## Decyzja
Używamy mechanizmu `django.db.transaction.atomic` oraz blokowania rekordów `select_for_update()`.

## Uzasadnienie Techniczne

### 1. Atomowość (Atomic)
Blok `with transaction.atomic():` gwarantuje, że wszystkie zapytania SQL wewnątrz niego zostaną wykonane jako jedna transakcja. Jeśli wystąpi jakikolwiek błąd, baza danych wykona `ROLLBACK` (cofnięcie zmian). Jeśli wszystko pójdzie dobrze, wykona `COMMIT`.

### 2. Unikanie "Race Conditions" (select_for_update)
Użyliśmy `Account.objects.select_for_update().get(id=sender.id)`. 
*   To powoduje, że baza danych "rezerwuje" (blokuje) dany wiersz dla naszej transakcji. 
*   Jeśli w tym samym momencie przyszedłby inny przelew z tego samego konta, musiałby on "poczekać", aż nasza transakcja się zakończy. Zapobiega to błędom typu "double spending" (podwójne wydanie tych samych pieniędzy).

### 3. Identyfikacja (UUID vs Account Number)
*   **Sender:** Identyfikowany przez `UUID` (bezpieczeństwo, identyfikacja wewnętrzna).
*   **Receiver:** Identyfikowany przez `Account Number` (odzwierciedlenie świata rzeczywistego).

## Konsekwencje
System jest bezpieczny i spójny (Consistent), ale nieco wolniejszy przy bardzo dużej ilości jednoczesnych transakcji na tym samym koncie ze względu na blokowanie wierszy (locking). Jest to jednak standard i konieczność w systemach bankowych.
