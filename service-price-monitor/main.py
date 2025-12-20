import os
import requests
import redis
from celery import Celery
from celery.schedules import crontab

# Pobieramy adres Redisa
REDIS_URL = os.environ.get("CELERY_BROKER_URL", "redis://localhost:6379/0")

# Klient do zapisu danych (cen)
redis_client = redis.Redis.from_url(REDIS_URL, decode_responses=True)

# Klient Celery (do kolejki zadań)
app = Celery("price_monitor", broker=REDIS_URL)

@app.task
def fetch_crypto_prices():
    """
    Pobiera aktualne kursy BTC i ETH z CoinGecko API.
    """
    url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd,pln"
    
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        btc_pln = data['bitcoin']['pln']
        eth_pln = data['ethereum']['pln']
        
        # Zapisz do Redisa (żeby inne serwisy widziały)
        redis_client.set("crypto:bitcoin", str(btc_pln))
        redis_client.set("crypto:ethereum", str(eth_pln))
        
        print(f"--- CRYPTO UPDATE ---")
        print(f"Bitcoin: {btc_pln} PLN")
        print(f"Ethereum: {eth_pln} PLN")
        print(f"----------------------")
        
        return data
    except Exception as e:
        print(f"Błąd podczas pobierania cen: {e}")
        return None

# Harmonogram zadań (Beat Schedule)
app.conf.beat_schedule = {
    "fetch-prices-every-60-seconds": {
        "task": "main.fetch_crypto_prices",
        "schedule": 60.0,
    },
}

@app.task
def say_hello():
    print("Hello from Celery Worker!")
