# Architecture Decision Record: Periodic Tasks & Celery Beat

## Status
Zaakceptowane

## Kontekst
Nie wszystkie zadania w systemie są wynikiem akcji użytkownika. Niektóre operacje muszą dziać się automatycznie w określonych odstępach czasu (np. pobieranie kursów walut, czyszczenie starych logów, wysyłanie dziennych raportów).

## Decyzja
Wdrażamy **Celery Beat** jako harmonogram zadań.

## Uzasadnienie Techniczne

### 1. Ad-hoc vs Periodic Tasks
*   **Ad-hoc (Faza 4a):** Zadanie zlecone przez API (`test-worker`). Dobre dla ciężkich operacji wyzwalanych przez użytkownika.
*   **Periodic (Faza 4b):** Zadanie wyzwalane przez czas (`fetch_crypto_prices`). Dobre dla monitoringu i utrzymania systemu.

### 2. Architektura Beat
Celery Beat to osobny proces (u nas uruchomiony flagą `-B` w tym samym kontenerze), który działa jak zegarek. Co 60 sekund (według konfiguracji `beat_schedule`) wysyła on wiadomość do Redisa, którą następnie podnosi dowolny wolny Worker.

### 3. Skalowalność
Choć w tym projekcie mamy jednego Workera, architektura pozwala na dodanie ich nieskończenie wiele. Harmonogram (Beat) zawsze wysyła tylko jedną wiadomość, a pierwszy wolny Worker ją wykonuje – zapobiega to sytuacji, w której ta sama cena byłaby pobierana 5 razy przez 5 workerów.

## Konsekwencje
System zyskuje cechy **Autonomiczności**. Nawet jeśli nikt nie odwiedza naszej strony, backend "żyje", aktualizuje dane i przygotowuje się na powrót użytkownika.
