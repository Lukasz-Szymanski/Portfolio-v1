# Architecture Decision Record: AI Integration (RAG)

## Status
Zaimplementowano (29.12.2025)

## Kontekst
Faza 12 Roadmapy ("AI Engineer") wymagała dodania funkcjonalności chatbota, który potrafi odpowiadać na pytania dotyczące projektu, korzystając z bazy wiedzy (kod, dokumentacja).

## Decyzja
Wybrano architekturę **RAG (Retrieval-Augmented Generation)** opartą o:
- **Google Gemini 1.5** (LLM i Embeddings).
- **PGVector** (rozszerzenie PostgreSQL do przechowywania wektorów).
- **LangChain** (orkiestracja procesu).
- **FastAPI** (endpointy backendowe).

## Alternatywy
1. **OpenAI (GPT-4)**
   - *Wady:* Koszt API, brak darmowego tieru z tak dużym limitem jak Gemini.
2. **ChromaDB / Pinecone**
   - *Wady:* Wymaga dodatkowego kontenera lub zewnętrznej usługi. PGVector pozwala trzymać wszystko w jednej bazie Postgres, co upraszcza infrastrukturę.
3. **Fine-tuning**
   - *Wady:* Zbyt kosztowne i skomplikowane przy częstych zmianach w kodzie. RAG jest bardziej elastyczny.

## Szczegóły Implementacji
### 1. Baza Danych
- Zmieniono obraz `postgres:15-alpine` na `pgvector/pgvector:pg15`.
- LangChain automatycznie tworzy tabelę `langchain_pg_embedding` do przechowywania wektorów.

### 2. Backend (Service B2B)
- Dodano biblioteki `langchain`, `langchain-google-genai`.
- Skrypt `ai_engine.py` odpowiada za:
    - `ingest_docs()`: Wczytanie tekstów, podział na chunki, zamianę na wektory i zapis do DB.
    - `ask_bot()`: Wyszukanie podobnych chunków (similarity search) i wygenerowanie odpowiedzi przez Gemini.

### 3. Frontend
- Komponent `AiChat.tsx` to pływający widget (FAB).
- Komunikuje się z endpointem `/api/b2b/ai/chat`.
- Posiada animacje wejścia/wyjścia (Framer Motion) i wskaźnik ładowania.

## Uruchomienie
Wymagany jest klucz `GOOGLE_API_KEY` w zmiennych środowiskowych kontenera `service-b2b`.
Proces "Ingestion" uruchamiany jest przez endpoint `/api/b2b/ai/ingest`.
