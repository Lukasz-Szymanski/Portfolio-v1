import os
import google.generativeai as genai

# Konfiguracja
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")

# Hardcoded context (Context Stuffing)
FALLBACK_CONTEXT = """
Jesteś wirtualnym asystentem w Portfolio Łukasza Szymańskiego (Fullstack Developer).
Twoim zadaniem jest odpowiadać na pytania rekruterów i programistów dotyczące tego projektu.
Bądź pomocny, krótki i konkretny.

OPIS PROJEKTU:
Projekt to system mikroserwisów symulujący środowisko Fintech i B2B.

STACK TECHNOLOGICZNY:
- Frontend: React (Vite), TailwindCSS, Framer Motion. Design system: 'Neon Glass'.
- Backend: 
  1. Service Fintech: Django Ninja (Python) - obsługa kont i przelewów.
  2. Service B2B: FastAPI (Python) - proxy do danych firmowych i AI.
  3. Service Monitor: Celery + Redis - monitoring cen kryptowalut w tle.
- Baza danych: PostgreSQL (z PGVector - choć obecnie wyłączony).
- Cache/Broker: Redis.
- Infrastruktura: Docker, Docker Compose, Nginx (API Gateway).

GŁÓWNE FUNKCJE:
1. Dashboard: Wykresy finansowe (Recharts), historia transakcji.
2. Weryfikator B2B: Sprawdzanie NIP w API rządowym (mockowanym w demo).
3. Krypto Ticker: Ceny BTC/ETH na żywo przez WebSockets.
4. AI Chatbot: To Ty. Działasz na modelu Gemini Pro.

AUTOR:
Łukasz Szymański. Szuka pracy jako Python Backend lub Fullstack Developer.
"""

def ingest_docs(docs_path: str = "docs"):
    """
    Placeholder. W tej wersji nie używamy bazy wektorowej.
    """
    print("--- AI ENGINE: Using Context Stuffing (Lightweight Mode) ---")
    return 1

def ask_bot(query: str) -> str:
    """
    Bezpośrednie zapytanie do Google Gemini API (bez LangChain).
    Szybkie, bezpieczne dla wątków, bez ukrytych retries.
    """
    try:
        if not GOOGLE_API_KEY:
             return "Błąd konfiguracji: Brak klucza GOOGLE_API_KEY."

        # Konfiguracja klienta Google
        genai.configure(api_key=GOOGLE_API_KEY)
        
        # Używamy modelu gemini-pro (stabilny)
        model = genai.GenerativeModel('gemini-pro')
        
        prompt = f"""
        {FALLBACK_CONTEXT}
        
        PYTANIE UŻYTKOWNIKA: {query}
        
        ODPOWIEDŹ:
        """
        
        # Generowanie odpowiedzi
        response = model.generate_content(prompt)
        
        return response.text

    except Exception as e:
        print(f"AI Error: {e}")
        return "Przepraszam, nie mogę teraz odpowiedzieć (Limit API Google lub błąd sieci)."