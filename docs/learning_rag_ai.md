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

## Hybrydowa Architektura (Aktualizacja 29.12.2025)
W toku prac zdecydowano o przejściu na model **Hybrid AI**, który łączy zalety logiki lokalnej i chmurowej:

1. **Lokalna Baza Wiedzy (Frontend):** 
   - Najczęstsze pytania (FAQ) są obsługiwane bezpośrednio przez komponent React.
   - *Zalety:* Zerowe opóźnienie (0ms), brak kosztów API, 100% niezawodności nawet przy braku internetu lub wyczerpaniu limitów Gemini.
2. **LLM Fallback (Backend + Google Gemini):**
   - Pytania niestandardowe są przesyłane do serwisu B2B i procesowane przez model Gemini 1.5 Flash.
3. **Context Stuffing:** 
   - Zamiast skomplikowanego RAG z bazą wektorową (który generował zbyt wiele zapytań o embeddingi), do każdego zapytania LLM dołączana jest "pigułka wiedzy" o projekcie.

## Wnioski
Takie podejście jest standardem w rozwiązaniach komercyjnych. Pozwala na błyskawiczną obsługę typowych zapytań rekrutacyjnych, jednocześnie zachowując "inteligencję" bota przy trudniejszych pytaniach.
