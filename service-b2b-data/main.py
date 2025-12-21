from fastapi import FastAPI, Depends, HTTPException, BackgroundTasks
from pydantic import BaseModel, EmailStr
from typing import Dict, Any
import redis
import time
import httpx
import datetime

app = FastAPI(title="B2B Company Verifier")

# --- Schemas ---
class ContactSchema(BaseModel):
    name: str
    email: EmailStr
    message: str

# Funkcja (Dependency), która zwraca połączenie do Redisa
def get_redis():
    # 'redis' to nazwa kontenera w naszym docker-compose.yml
    r = redis.Redis(host='redis', port=6379, db=0, decode_responses=True)
    try:
        yield r
    finally:
        r.close()

@app.get("/")
async def health_check():
    return {"status": "online", "service": "b2b-data"}

# --- Contact Form ---
@app.post("/api/v1/contact")
async def send_contact_email(form: ContactSchema, background_tasks: BackgroundTasks):
    """
    Odbiera wiadomość z formularza kontaktowego.
    W wersji demo: Loguje wiadomość do konsoli (Docker Logs).
    W produkcji: Wysyłałby email przez SMTP (Sendgrid/Gmail).
    """
    # Symulacja wysyłki w tle (żeby nie blokować requestu)
    background_tasks.add_task(log_email_to_console, form)
    
    return {"message": "Wiadomość została wysłana!"}

def log_email_to_console(form: ContactSchema):
    print(f"--- NEW CONTACT MESSAGE ---")
    print(f"From: {form.name} <{form.email}>")
    print(f"Message: {form.message}")
    print(f"---------------------------")

@app.get("/api/v1/companies/{nip}")
async def get_company(nip: str, r: redis.Redis = Depends(get_redis)):
    # 0. Statystyki
    r.incr("stats:companies_checked")

    # 1. Sprawdź Cache
    cached_data = r.get(f"company:{nip}")
    if cached_data:
        return {"source": "cache", "data": eval(cached_data)} # eval is simple for demo dict string representation

    # 2. Próba pobrania z Prawdziwego API (Ministerstwo Finansów)
    today = datetime.date.today().isoformat()
    mf_url = f"https://wl-api.mf.gov.pl/api/search/nip/{nip}?date={today}"
    
    try:
        async with httpx.AsyncClient() as client:
            print(f"Fetching from MF API: {mf_url}")
            response = await client.get(mf_url, timeout=5.0)
            
            if response.status_code == 200:
                data = response.json()
                subject = data.get('result', {}).get('subject')
                
                if subject:
                    real_data = {
                        "nip": subject.get('nip'),
                        "name": subject.get('name'),
                        "address": subject.get('residenceAddress') or subject.get('workingAddress') or "Brak adresu w bazie",
                        "regon": subject.get('regon'),
                        "is_active": subject.get('statusVat') == 'Czynny',
                        "status": subject.get('statusVat')
                    }
                    
                    # Zapisz do Cache
                    r.setex(f"company:{nip}", 3600, str(real_data)) # 1h cache dla prawdziwych danych
                    return {"source": "live_gov_api", "data": real_data}
            
            print(f"MF API Response: {response.status_code} - Falling back to mock.")

    except Exception as e:
        print(f"External API Error: {e} - Falling back to mock.")

    # 3. Fallback: Mock (gdy API nie działa lub limit przekroczony)
    time.sleep(1.0) # Sztuczne opóźnienie dla realizmu
    
    mock_data = {
        "nip": nip,
        "name": f"[MOCK] Company Sp. z o.o. for {nip}",
        "address": "ul. Pythonowa 15, 00-001 Warszawa",
        "regon": "142396857",
        "is_active": True,
        "status": "ACTIVE_MOCK"
    }

    # Zapisz mocka do cache na krócej (60s), żeby spróbować znowu za chwilę
    r.setex(f"company:{nip}", 60, str(mock_data))

    return {"source": "mock_fallback", "data": mock_data}

@app.get("/api/v1/crypto")
async def get_crypto_prices(r: redis.Redis = Depends(get_redis)):
    btc = r.get("crypto:bitcoin")
    eth = r.get("crypto:ethereum")
    
    return {
        "bitcoin": btc if btc else "unavailable",
        "ethereum": eth if eth else "unavailable",
        "currency": "PLN"
    }

@app.get("/api/v1/system-status")
async def get_system_status(r: redis.Redis = Depends(get_redis)):
    """
    Agreguje statystyki całego systemu dla Dashboardu.
    """
    return {
        "b2b": {
            "companies_checked": r.get("stats:companies_checked") or 0,
            "cache_hits": 0 # TODO: Implement cache hit tracking
        },
        "monitor": {
            "bitcoin": r.get("crypto:bitcoin") or "0.00",
            "ethereum": r.get("crypto:ethereum") or "0.00",
            "last_update": time.strftime("%H:%M:%S") # Real update time should come from Redis too
        },
        "services": {
            "b2b": "online",
            "fintech": "online", # We assume it is if frontend can call it
            "monitor": "active"
        }
    }
