# Learning: High-End Design System (Neon Glass)

## Koncepcja: Glassmorphism & Mesh Gradients
W fazie "Roadmap 2.0" zdecydowaliśmy się na całkowitą metamorfozę wizualną, odchodząc od standardowych, płaskich kolorów na rzecz designu klasy Premium (inspirowanego estetyką Apple i nowoczesnych Fintechów).

### 1. Mesh Gradient (Tło)
Zastosowaliśmy technologię **Mesh Gradient**. Są to nałożone na siebie, rozmyte gradienty promieniowe w rogach ekranu (`radial-gradient`), które tworzą efekt głębi i dynamicznego oświetlenia.
- **Implementacja:** `fixed` div z niskim `z-index`, dużym `blur(80px)` i nasyconymi kolorami (Blue, Emerald, Purple).

### 2. Glassmorphism (Szkło)
Karty interfejsu wykorzystują efekt **Glassmorphism**.
- **Właściwości:** `backdrop-filter: blur(16px)`, tło o przezroczystości 5% (`rgba(255, 255, 255, 0.05)`), cienkie obramowanie (`border-white/10`) oraz wewnętrzny blask (`inset box-shadow`).
- **Wyzwanie:** Przy bardzo ciemnych tłach efekt szkła jest słabo widoczny. Rozwiązaliśmy to poprzez wzmocnienie nasycenia tła i dodanie subtelnego podświetlenia (`glow`) przy najechaniu myszką.

### 3. "Dolna Krzemowa" - Typografia Cinematic
Zrezygnowaliśmy z małych fontów na rzecz monumentalnej typografii:
- **Space Grotesk:** Użyty dla nagłówków. Rozmiary rzędu `text-9xl` budują autorytet i nowoczesny charakter marki.
- **Inter:** Zapewnia czytelność danych technicznych.
- **Zero-Scroll UX:** Każda sekcja jest obliczana tak (`h-[calc(100vh-...)`), aby wypełniać dokładnie jedno okno przeglądarki, co daje wrażenie korzystania z natywnej aplikacji.

### 4. Spójność z "X-Ray Mode"
Design "Neon Glass" idealnie współgra z trybem Rentgena. Techniczne ramki technologii na tle szklanych kart wyglądają profesjonalnie i ułatwiają zrozumienie architektury systemu.

## Czego się nauczyłem?
* Jak budować zaawansowane layouty "Zero-Scroll" przy zachowaniu gigantycznej typografii.
* Jak debugować efekty `backdrop-blur` w ciemnych motywach.
* Jak łączyć agresywny marketing wizualny z techniczną rzetelnością (X-Ray Mode).