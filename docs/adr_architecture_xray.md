# Architecture Decision Record: Architecture X-Ray Mode

## Status
Accepted

## Context
Standard developer portfolios often act as "black boxes" where recruiters see a pretty UI but must dig through thousands of lines of code on GitHub to understand the underlying logic. We needed a way to showcase system architecture directly within the live application.

## Decision
We implemented a custom **"X-Ray Mode"** (Architecture Transparency Mode). This visual layer deconstructs the UI into its technical components, revealing the backend services and data patterns behind them.

## Technical Justification

### 1. The XRayWrapper Component
We developed a Higher-Order Component-like wrapper that uses `framer-motion` to animate technical frames around UI sections. It utilizes React Context to toggle visibility globally without impacting business logic.

### 2. Metadata Injection
Each module (Fintech, B2B, Monitor) is enriched with technical metadata:
- **tech:** The specific technology used (e.g., Django, FastAPI, Redis).
- **endpoint:** The API route responsible for the data.
- **description:** The architectural pattern being demonstrated (e.g., ACID Transaction).

### 3. Visual Masking Pattern
Labels use background colors matching the app's theme to "cut through" dashed borders, improving readability and creating a professional, engineering-focused aesthetic.

## Consequences
- **Enhanced DX:** Demonstrates strong architectural awareness and the ability to build developer tools.
- **Zero Performance Impact:** The Dev Mode is completely isolated from production logic.
- **Educational Value:** Helps non-technical users or recruiters understand the complexity of the microservices stack.