# Deployment Guide: Cloud Native (Vercel + Neon + Upstash)

Ten dokument opisuje proces wdrażania projektu Portfolio do darmowej chmury w architekturze Serverless.

## 1. Architektura
Projekt został zmigrowany z lokalnego Docker Compose na usługi Cloud Native:
- **Frontend:** React (Vite) -> Vercel Static Hosting.
- **Backend (API):** FastAPI & Django Ninja -> Vercel Serverless Functions.
- **Database:** PostgreSQL -> [Neon.tech](https://neon.tech) (Free Tier).
- **Cache/Broker:** Redis -> [Upstash](https://upstash.com) (Free Tier).
- **Background Jobs:** Celery Beat -> Vercel Cron Jobs (1 min interval).

## 2. Przygotowanie Infrastruktury

### Neon.tech (Postgres)
1. Załóż konto na Neon.tech.
2. Stwórz nowy projekt i bazę danych.
3. Skopiuj **Connection String** (np. `postgres://alex:password@ep-cool-darkness-123.us-east-2.aws.neon.tech/neondb`).

### Upstash (Redis)
1. Załóż konto na Upstash.com.
2. Stwórz bazę danych Redis (Global).
3. Skopiuj **Redis URL** (np. `redis://default:password@cool-rat-345.upstash.io:6379`).

## 3. Konfiguracja Vercel

1. Połącz swoje repozytorium GitHub z Vercel.
2. W ustawieniach projektu (**Project Settings > Environment Variables**) dodaj następujące zmienne:
   - `DATABASE_URL`: Twój connection string z Neon.
   - `REDIS_URL`: Twój URL z Upstash.
   - `SECRET_KEY`: Dowolny długi, losowy ciąg znaków (dla Django).
   - `DEBUG`: `False`
   - `ALLOWED_HOSTS`: `*` lub Twoja domena Vercel.

## 4. Pierwszy Deployment
Po każdym `git push` do gałęzi głównej, Vercel automatycznie zbuduje:
- Statyczne pliki frontendu.
- Funkcje Python dla B2B i Fintech.
- Skonfiguruje Cron Joba dla cen kryptowalut.

## 5. Lokalne testowanie (Docker)
Projekt nadal wspiera Docker Compose. Aby uruchomić go lokalnie:
```bash
docker compose up --build
```
Backendy automatycznie wykryją brak zmiennych chmurowych i połączą się z kontenerami `postgres` i `redis`.
