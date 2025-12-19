FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN pip install poetry

COPY pyproject.toml .
RUN poetry config virtualenvs.create false && poetry install --no-interaction --no-ansi --no-root

COPY . .

# Django wymaga zmiennej PYTHONPATH lub struktury modułowej. 
# Przy kopiowaniu . . jesteśmy w /app.
# Uruchomienie przez uvicorn wskaże na core.asgi:application

CMD ["uvicorn", "core.asgi:application", "--host", "0.0.0.0", "--port", "8002"]
