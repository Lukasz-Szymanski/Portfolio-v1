# Design Concept: "Neon Fintech Glass"

## 1. Filozofia
Chcemy uciec od "nudnego panelu administracyjnego" w stronę nowoczesnej aplikacji finansowej. Styl ma sugerować: szybkość, technologię, bezpieczeństwo i nowoczesność.

## 2. Paleta Kolorów (Dark Mode Only)

### Tło (Background)
Zamiast jednolitego koloru, używamy głębokiego granatu z dynamicznymi gradientami.
* **Base:** `#0f172a` (Slate 950)
* **Glow 1 (Fintech):** `#3b82f6` (Blue 500) - rozmyte koło w lewym górnym rogu.
* **Glow 2 (Security):** `#10b981` (Emerald 500) - rozmyte koło w prawym dolnym.
* **Glow 3 (Crypto):** `#a855f7` (Purple 500) - akcenty.

### Elementy (Karty/Panele) - Glassmorphism
* **Tło:** `bg-slate-900/40` (półprzezroczyste).
* **Blur:** `backdrop-blur-xl`.
* **Border:** `border border-white/10`.
* **Shadow:** `shadow-xl shadow-black/50`.

## 3. Typografia
* **Nagłówki:** `Space Grotesk` (Google Fonts) - techniczny, nowoczesny, lekko "kosmiczny".
* **Tekst:** `Inter` lub `DM Sans` - czytelny, neutralny.
* **Dane (Liczby/Konto):** `JetBrains Mono` - monospaced, inżynierski.

## 4. UI/UX "X-Ray Mode" (Dev View)
To unikalna funkcja portfolio.

### Działanie
W nagłówku znajduje się przełącznik "Developer Mode". Po włączeniu:
1.  **Obramowania:** Każdy główny komponent (Widget) dostaje kreskowane obramowanie w kolorze technologii (np. zielone dla Django, niebieskie dla Reacta).
2.  **Etykiety:** W rogu komponentu pojawia się "Chip" z informacją: `Component: <TransactionHistory />`.
3.  **Data Flow:** Przy akcjach (np. przycisk "Przelew") pojawia się dymek: `POST /api/transfer -> Django (ACID)`.

### Cel Edukacyjny
Rekruter widzi nie tylko efekt końcowy, ale też **jak** to zostało zbudowane. To jak oglądanie schematu silnika obok samochodu.

## 5. Inspiracje
* **Linear.app:** Ciemny motyw, subtelne gradienty, perfekcyjna typografia.
* **Vercel Dashboard:** Minimalizm, techniczny sznyt.
* **Revolut App:** Glassmorphism, żywe kolory na ciemnym tle.
