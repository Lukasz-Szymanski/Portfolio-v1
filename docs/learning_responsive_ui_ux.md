# Architecture Decision Record: Responsive UI/UX in "App-Like" Environment

## Status
Zaimplementowano (23.12.2025)

## Kontekst
Głównym założeniem wizualnym projektu jest "Zero-Scroll" – aplikacja na desktopie ma zachowywać się jak natywny program, mieszcząc się w jednej tafli ekranu. Wyzwanie pojawiło się przy wdrażaniu wersji mobilnej oraz dodaniu stałych elementów nawigacji (Navbar), które mogły zasłaniać treść lub wymuszać niechciany scroll.

## Podjęte Decyzje

### 1. Hybrydowy Layout (Desktop vs Mobile)
- **Desktop:** Utrzymano `overflow-hidden` oraz sztywne ramy `h-screen`. Zastosowano `padding-top: 80px` (20 jednostek Tailwind), aby rezerwować miejsce na stały Navbar. Wykorzystano `justify-center` wewnątrz sekcji, aby treść była idealnie wyśrodkowana w pozostałym polu widzenia.
- **Mobile:** Przejście na `overflow-y-auto` oraz `min-h-screen`. Na urządzeniach mobilnych treść ma naturalny przepływ (flow), co pozwala na wygodne przeglądanie pionowe.

### 2. Typografia Skalowalna (Fluid Typography)
- Zastosowano responsywne klasy Tailwinda dla kluczowych nagłówków (np. `text-4xl md:text-9xl`). Zapobiega to "rozrywaniu" layoutu przez zbyt długie wyrazy na małych szerokościach ekranu.
- Decyzja o wyśrodkowaniu nagłówków wyłącznie na mobile (`text-center md:text-left`) poprawia hierarchię wizualną w widoku pionowym.

### 3. Zarządzanie Nakładaniem (Z-Index & Padding)
- Navbar został ustawiony jako `fixed top-0`. Aby uniknąć nakładania się na tekst (tzw. "overlap"), główny kontener aplikacji otrzymał stały margines górny.
- Rozważano "Dynamic Island" (pływający pasek), ale odrzucono go na rzecz klasycznego Navbara, aby zachować spójność z surowym, technicznym stylem dashboardu.

## Konsekwencje
- **Pozytywne:** Projekt wygląda profesjonalnie na każdym urządzeniu. Utrzymano unikalny feeling "Aplikacji" na dużych monitorach.
- **Negatywne:** Każdy nowy komponent musi być testowany pod kątem `min-h-screen`, aby nie złamać zasady No-Scroll na desktopie.

## Alternatywy
- **Full Fluid Scroll:** Odrzucono, ponieważ projekt straciłby swój unikalny charakter "Portfolio-Systemu".
- **Osobne widoki Mobile/Desktop:** Odrzucono ze względu na trudność w utrzymaniu kodu (DRY). Wybrano RWD oparte na gridzie i flexboxie.
