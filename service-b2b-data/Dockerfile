FROM python:3.11-slim

# Ustawienia środowiska (nie tworzymy plików .pyc, logi lecą prosto do konsoli)
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Instalujemy narzędzie do zarządzania zależnościami
RUN pip install poetry

# Kopiujemy pliki projektu
COPY pyproject.toml .
# Jeśli masz plik poetry.lock, odkomentuj poniższe:
# COPY poetry.lock .

# Konfigurujemy poetry tak, aby nie tworzyło wirtualnego środowiska (wewnątrz Dockera nie jest potrzebne)
RUN poetry config virtualenvs.create false && poetry install --no-interaction --no-ansi --no-root

COPY . .

# Uruchamiamy serwer na porcie 8001
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
