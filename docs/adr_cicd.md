# Architecture Decision Record: Continuous Integration (CI/CD)

## Status
Accepted

## Context
To ensure code quality and prevent regressions in a multi-service repository, we needed an automated verification process that triggers on every code change.

## Decision
We implemented **GitHub Actions** as our CI platform. The configuration is defined in `.github/workflows/ci.yml`.

## Technical Justification

### 1. Quality Gates
The CI pipeline enforces three critical "Quality Gates":
- **Python Linter (Ruff):** Instant static analysis of backend code, ensuring PEP8 compliance and dead code detection.
- **Frontend Linter (ESLint):** Enforces coding standards and type safety in the React/TypeScript environment.
- **Frontend Build Check:** Validates that the project compiles successfully, catching TypeScript errors that the linter might miss.

### 2. Standardization
Using GitHub Actions provides a market-standard environment that is natively integrated with the repository, allowing for automated status badges in the README.

## Consequences
- **Enforced Discipline:** Developers must fix linting and build errors before merging to the `main` branch.
- **Reliability:** Provides high confidence that the application remains stable after refactoring.
- **Professionalism:** The "Portfolio CI" passing badge serves as a trust signal for recruiters.