# Frontend Design & Architecture

## Wizja
Portfolio w stylu "Dark Backend Architect". Strona ma opowiadać historię dewelopera, łącząc osobiste doświadczenie z interaktywnymi dowodami umiejętności technicznych (mikroserwisy działające na żywo).

## Struktura Komponentowa (React)
Strona zostaje podzielona na moduły, aby kod był czysty i łatwy w utrzymaniu:

1. **Navbar:** Nawigacja po sekcjach (Home, About, Skills, Projects, Contact).
2. **Hero:** Pierwsze wrażenie. "Elevator pitch" o Tobie.
3. **About & Hobby:** Sekcja pokazująca ludzką stronę. Co robisz po pracy?
4. **Skills Grid:** Przejrzyste zestawienie technologii podzielone na Backend, DevOps i Frontend.
5. **Interactive Projects:** 
   - **Completed:** Statyczne karty z linkami do repozytoriów.
   - **Live Lab (In-Progress):** Sekcja, w której osadzamy działające mikroserwisy (np. B2B Verifier).
6. **Contact Footer:** Linki społecznościowe i szybki kontakt.

## Stylistyka
- **Paleta:** Głęboka czerń (#0a0a0a), Ciemny grafit (#161616).
- **Akcenty:** Emerald Green (Sukces/B2B), Royal Blue (Fintech), Purple (Monitoring).
- **Typografia:** Połączenie nowoczesnego Sans-serif z fontami Mono (dla fragmentów "technicznych").