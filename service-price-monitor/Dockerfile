FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN pip install poetry

COPY pyproject.toml .
RUN poetry config virtualenvs.create false && poetry install --no-interaction --no-ansi --no-root

COPY . .

# Uruchamiamy Celery Workera z poziomem logowania INFO
# -A main: nazwa pliku/modułu, gdzie jest instancja 'app' Celery
CMD ["celery", "-A", "main", "worker", "--loglevel=info"]
