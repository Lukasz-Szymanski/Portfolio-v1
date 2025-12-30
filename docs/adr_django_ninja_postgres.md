# Architecture Decision Record: Fintech Core Stack (Django Ninja & Postgres)

## Status
Accepted

## Context
For Phase 3 ("Fintech Simulator"), we needed a robust framework capable of handling complex business logic, relational data integrity, and high-performance API endpoints.

## Decision
We selected **Django Ninja** as the web framework and **PostgreSQL** as the primary relational database.

## Technical Justification

### 1. Why Django (vs. pure FastAPI)?
- **ORM & Migrations:** Django's ORM is battle-tested and provides an excellent migration system, which is critical for evolving financial schemas.
- **Batteries Included:** Built-in admin panels and security features (CSRF protection, SQL Injection prevention) accelerated the development of the banking core.

### 2. Why Django Ninja (vs. DRF)?
- **Modernity:** Django Ninja utilizes Python type hints and Pydantic, resulting in cleaner code and faster execution compared to the legacy Django REST Framework.
- **Native Async Support:** It aligns perfectly with our high-performance requirements while maintaining compatibility with the Django ecosystem.

### 3. Why PostgreSQL?
- **Standard for Finance:** PostgreSQL is the industry standard for financial applications due to its advanced ACID compliance and support for the `Decimal` data type (essential for avoiding floating-point rounding errors).

## Consequences
- **Development Speed:** The team can focus on business logic rather than boilerplate infrastructure.
- **Scalability:** The stack is ready for horizontal scaling and complex analytical queries.