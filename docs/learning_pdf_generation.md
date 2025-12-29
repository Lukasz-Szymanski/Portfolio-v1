# ADR: Backend-side PDF Generation Strategy

## Status
Zaakceptowany

## Kontekst
Użytkownicy potrzebują pobierać potwierdzenia transakcji. Dokumenty muszą być niezmienne i profesjonalne.

## Decyzja
Generowanie PDF po stronie Backendowej przy użyciu biblioteki **ReportLab**.

## Uzasadnienie edukacyjne
Generowanie dokumentów na serwerze to standard w systemach o podwyższonym poziomie zaufania. Klient (frontend) dostaje gotowy plik, którego nie może łatwo "sfałszować" przed zapisem, co ma miejsce przy generowaniu PDF bezpośrednio z HTML w przeglądarce. ReportLab pozwala na niskopoziomowe rysowanie dokumentu, co daje pełną kontrolę nad layoutem.

## Czego się nauczyłem?
* Obsługi binarnej odpowiedzi (Response Stream) w Django Ninja.
* Pracy z biblioteką graficzną ReportLab (rysowanie kształtów, obsługa fontów, tabel).
* Zarządzania buforami pamięci (`io.BytesIO`) w Pythonie.
