# Architecture Decision Record: Django Migrations & DB Management

## Status
Accepted

## Context
While Phase 2 (FastAPI) utilized a simple Redis cache, Phase 3 introduced a relational database (PostgreSQL). We needed a reliable way to manage and version the database schema over time.

## Decision
We utilized the native **Django Migrations** system (`makemigrations` and `migrate`) for schema management.

## Technical Justification

### 1. Automation & Reliability
Django analyzes model classes in `models.py` and automatically generates Python-based migration files. This eliminates the risk of manual SQL errors (e.g., `CREATE TABLE` typos) and ensures schema consistency.

### 2. Version Control for Data
Migrations are committed to Git, ensuring every developer and environment shares the exact same database structure. Any change to a model field is documented and reproducible.

### 3. Data Safety
The migration system provides built-in support for backward migrations (rollbacks) and handles complex operations, such as adding non-nullable fields with default values, without data loss.

## Workflow Integration
In our Dockerized environment, migrations are handled in two ways:
1.  **Development:** Manual execution via `docker exec` for granular developer control.
2.  **Production:** Automated execution within an `entrypoint.sh` script to ensure the database is always in sync with the code before the server starts.

## Alternatives
- **Alembic (for SQLAlchemy):** Powerful but requires more manual configuration in a Django-less environment.
- **Manual SQL Scripts:** Rejected due to lack of scalability and high risk of human error in team environments.