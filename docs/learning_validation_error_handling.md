# Architecture Decision Record: API Validation & Error Handling

## Status
Zaakceptowane

## Kontekst
Podczas implementacji pierwszego endpointu `POST /accounts/` wystąpił błąd 500 (Internal Server Error), gdy użytkownik przesłał zbyt długi kod waluty. Błąd ten pochodził bezpośrednio z bazy danych (PostgreSQL), co jest niepożądane, ponieważ:
1. Ujawnia szczegóły techniczne bazy danych w odpowiedzi.
2. Jest trudny do obsłużenia przez Frontend.
3. Obciąża bazę danych zapytaniami, które z góry są skazane na niepowodzenie.

## Decyzja
Wdrażamy wielopoziomową walidację danych, ze szczególnym uwzględnieniem "Fail-Fast" na poziomie API (Pydantic).

## Uzasadnienie Techniczne

### 1. Walidacja na poziomie Schematu (Pydantic / Ninja Field)
Używamy `ninja.Field` do definiowania ograniczeń (np. `max_length`, `min_length`, `regex`) bezpośrednio w klasach `Schema`. 
*   **Zaleta:** Django Ninja automatycznie przechwytuje te błędy i zwraca kod **422 Unprocessable Entity**.
*   **Dlaczego 422, a nie 500?** Kod 400/422 mówi: "Drogi kliencie, Ty wysłałeś złe dane". Kod 500 mówi: "Przepraszam, ja (serwer) się popsułem". Zawsze dążymy do tego, by błędy użytkownika kończyły się w grupie 4xx.

### 2. Spójność z Bazą Danych
Ograniczenia w Schemacie powinny być lustrzanym odbiciem ograniczeń w `models.py`. Jeśli baza danych akceptuje tylko 3 znaki (`max_length=3`), API musi odrzucić wszystko, co jest dłuższe, zanim w ogóle spróbuje połączyć się z bazą.

### 3. User Experience (UX)
Dzięki walidacji Pydantic, Frontend otrzymuje szczegółowy JSON z informacją, które pole jest błędne i dlaczego (np. `string_too_long`). Pozwala to na wyświetlenie ładnego komunikatu błędu bezpośrednio pod polem w formularzu.

## Alternatywy
*   **Walidacja tylko w modelach Django:** Odrzucone. Django rzuca wtedy wyjątki podczas `save()`, co domyślnie kończy się błędem 500 w API Ninja, chyba że napiszemy ręczną obsługę wyjątków (try/except).
*   **Walidacja tylko na Frontendzie:** Odrzucone. Nigdy nie ufamy danym przesyłanym z przeglądarki. Walidacja na backendzie jest ostateczną linią obrony.
