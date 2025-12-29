# Architecture Decision Record: Continuous Integration (CI/CD)

## Status
Zaimplementowano (29.12.2025)

## Kontekst
W Fazie 13 ("DevOps & Quality") celem było zautomatyzowanie procesu weryfikacji jakości kodu, aby zapobiec wprowadzaniu błędów (regresji) do głównej gałęzi repozytorium (main).

## Decyzja
Wdrożono **GitHub Actions** jako platformę CI. Konfiguracja znajduje się w pliku `.github/workflows/ci.yml`.

## Szczegóły Implementacji
Pipeline CI składa się z jednego głównego zadania (`quality-check`), które uruchamia się przy każdym `push` oraz `pull_request`.

Kroki weryfikacji:
1. **Python Linter (Ruff):** Błyskawiczna analiza statyczna kodu backendowego. Sprawdza zgodność z PEP8, sortowanie importów oraz wykrywa martwy kod.
2. **Frontend Linter (ESLint):** Rygorystyczne sprawdzanie kodu React/TypeScript pod kątem dobrych praktyk i bezpieczeństwa typów.
3. **Frontend Build Check:** Próba kompilacji projektu (`npm run build`). Gwarantuje to, że kod nie tylko wygląda dobrze, ale faktycznie "się buduje" i jest wolny od błędów TypeScript, których linter mógł nie wykryć.

## Dlaczego GitHub Actions?
- **Integracja:** Natywna współpraca z repozytorium GitHub.
- **Koszt:** Darmowe minuty dla projektów publicznych.
- **Standard rynkowy:** Najczęściej wybierane rozwiązanie w nowoczesnych projektach SaaS.

## Wnioski
Wprowadzenie CI/CD wymusiło "higienę pracy" (naprawa błędów lintera przed commitem) i zwiększyło zaufanie do stabilności projektu. Zielona odznaka w README jest dowodem na techniczną dojrzałość rozwiązania.
