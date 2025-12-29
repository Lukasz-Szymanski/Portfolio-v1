# Architecture Decision Record: Frontend State Management (TanStack Query)

## Status
Zaakceptowane

## Kontekst
W nowoczesnych aplikacjach React wyzwaniem jest synchronizacja stanu lokalnego (UI) ze stanem serwera (Baza danych). Musimy zdecydować, jak pobierać dane, jak je cache'ować i jak informować UI o konieczności odświeżenia po wykonaniu akcji (np. przelewu).

## Decyzja
Używamy **TanStack Query** (dawniej React Query) do zarządzania asynchronicznym stanem serwera.

## Uzasadnienie Techniczne

### 1. Deklaratywne pobieranie danych
Zamiast pisać złożone bloki `useEffect`, używamy hooka `useQuery`. 
*   **Zaleta:** Automatycznie otrzymujemy stany `isLoading`, `isError`, co pozwala na łatwe budowanie interfejsów odpornych na błędy sieciowe.

### 2. Cache & Invalidation (Kluczowy mechanizm)
To jest "magia", którą wdrożyliśmy w Dashboardzie:
*   Kiedy wykonujemy przelew (`useMutation`), po jego sukcesie wywołujemy `queryClient.invalidateQueries({ queryKey: ['accounts'] })`.
*   TanStack Query wie, że dane o kontach są teraz nieaktualne ("stale") i natychmiast pobiera je ponownie w tle.
*   Użytkownik widzi zaktualizowane saldo bez konieczności odświeżania strony.

### 3. Optymalizacja sieci
React Query zapobiega wielokrotnemu pobieraniu tych samych danych, jeśli są one jeszcze "świeże" w cache, co zmniejsza obciążenie naszych mikroserwisów.

## Alternatywy
*   **Redux / Context API:** Zbyt skomplikowane do prostego pobierania danych z API (wymagają dużo nadmiarowego kodu tzw. boilerplate). React Query jest stworzone specjalnie do komunikacji HTTP.
*   **Czysty useEffect + useState:** Odrzucone. Trudne w utrzymaniu, brak wbudowanego cache'owania i trudna synchronizacja między wieloma komponentami.
