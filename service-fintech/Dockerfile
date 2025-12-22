# --- STAGE 1: Builder ---
FROM python:3.11-slim AS builder

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Instalacja narzędzi systemowych potrzebnych do budowania (jeśli jakieś biblioteki tego wymagają)
RUN apt-get update && apt-get install -y --no-install-recommends gcc libpq-dev

# Instalacja Poetry i zależności
RUN pip install poetry
COPY pyproject.toml .

# Konfiguracja Poetry: tworzenie venv w folderze projektu (.venv)
RUN poetry config virtualenvs.in-project true && \
    poetry install --no-root --no-interaction --no-ansi

# --- STAGE 2: Runtime (Production) ---
FROM python:3.11-slim AS production

WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Kopiujemy wirtualne środowisko z buildera do bezpiecznej lokalizacji poza /app
COPY --from=builder /app/.venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Kopiujemy kod aplikacji
COPY . .

# Uruchamiamy serwer
CMD ["uvicorn", "core.asgi:application", "--host", "0.0.0.0", "--port", "8002"]