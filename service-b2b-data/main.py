from fastapi import FastAPI, Depends, HTTPException
from typing import Dict, Any
import redis
import time

app = FastAPI(title="B2B Company Verifier")

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

@app.get("/api/v1/companies/{nip}")
async def get_company(nip: str, r: redis.Redis = Depends(get_redis)):
    # 1. Sprawdź Cache
    cached_data = r.get(f"company:{nip}")
    if cached_data:
        return {"source": "cache", "data": cached_data}

    # 2. Symulacja wolnego, zewnętrznego API (np. GUS)
    # W prawdziwym projekcie tutaj byłby 'requests.get'
    time.sleep(1.5) 
    
    mock_data = {
        "nip": nip,
        "name": f"Company Sp. z o.o. for {nip}",
        "address": "ul. Pythonowa 15, 00-001 Warszawa",
        "status": "ACTIVE"
    }

    # 3. Zapisz do Cache na 60 sekund
    r.setex(f"company:{nip}", 60, str(mock_data))

    return {"source": "live_api", "data": mock_data}

@app.get("/api/v1/crypto")
async def get_crypto_prices(r: redis.Redis = Depends(get_redis)):
    btc = r.get("crypto:bitcoin")
    eth = r.get("crypto:ethereum")
    
    return {
        "bitcoin": btc if btc else "unavailable",
        "ethereum": eth if eth else "unavailable",
        "currency": "PLN"
    }
