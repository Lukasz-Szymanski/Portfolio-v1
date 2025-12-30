# Deployment Guide: Cloud Native (Vercel + Neon + Upstash)

This document describes the process of deploying the Portfolio project to a free-tier Serverless cloud architecture.

## 1. Architecture Overview
The project has been migrated from local Docker Compose to Cloud Native services:
- **Frontend:** React (Vite) hosted via Vercel Static Hosting.
- **Backend (API):** FastAPI & Django Ninja deployed as Vercel Serverless Functions.
- **Database:** PostgreSQL hosted on [Neon.tech](https://neon.tech) (Free Tier).
- **Cache/Broker:** Redis hosted on [Upstash](https://upstash.com) (Free Tier).
- **Background Jobs:** Celery Beat migrated to Vercel Cron Jobs (1-minute interval).

## 2. Infrastructure Setup

### Neon.tech (Postgres)
1.  Create an account on Neon.tech.
2.  Start a new project and create a database.
3.  Copy the **Connection String** (e.g., `postgres://user:pass@ep-cool-darkness.aws.neon.tech/neondb`).

### Upstash (Redis)
1.  Create an account on Upstash.com.
2.  Initialize a Global Redis database.
3.  Copy the **Redis URL** (e.g., `redis://default:pass@cool-rat.upstash.io:6379`).

## 3. Vercel Configuration

1.  Connect your GitHub repository to Vercel.
2.  Navigate to **Project Settings > Environment Variables** and add the following keys:
    -   `DATABASE_URL`: Your Neon connection string.
    -   `REDIS_URL`: Your Upstash URL.
    -   `SECRET_KEY`: A long, random string for Django security.
    -   `DEBUG`: `False`
    -   `ALLOWED_HOSTS`: `*` or your specific Vercel domain.

## 4. Deployment Workflow
Upon every `git push` to the main branch, Vercel automatically:
- Builds the static frontend assets.
- Deploys Python functions for B2B and Fintech modules.
- Configures Cron Jobs for real-time cryptocurrency price monitoring.

## 5. Local Development (Docker Fallback)
The project maintains full support for Docker Compose. To run the system locally:
```bash
docker compose up --build
```
The backend services are designed to automatically detect the environment and fallback to local `postgres` and `redis` containers if cloud variables are not present.