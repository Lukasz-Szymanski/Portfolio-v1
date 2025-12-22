# --- STAGE 1: Builder ---
FROM python:3.11-slim AS builder

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends gcc

RUN pip install poetry
COPY pyproject.toml .

RUN poetry config virtualenvs.in-project true && \
    poetry install --no-root --no-interaction --no-ansi

# --- STAGE 2: Runtime (Production) ---
FROM python:3.11-slim AS production

WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY --from=builder /app/.venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]