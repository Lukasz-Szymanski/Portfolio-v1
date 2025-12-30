# Architecture Decision Record: AI Integration (Hybrid RAG Model)

## Status
Accepted

## Context
Phase 12 ("AI Engineer") required an intelligent assistant capable of answering questions about the project's technical architecture, code, and documentation.

## Decision
We implemented a **Hybrid RAG (Retrieval-Augmented Generation)** architecture using **Google Gemini 1.5** and a fallback logic system.

## Technical Justification

### 1. Hybrid AI Model
- **Level 1 (Local FAQ):** The React frontend handles common questions instantly (0ms latency).
- **Level 2 (LLM Fallback):** Complex queries are forwarded to the FastAPI backend, where Gemini 1.5 Flash processes the request.

### 2. Context Stuffing
To avoid the complexity of managing a dedicated vector database (like Pinecone) for a small-scale project, we utilized **Context Stuffing**. Key project details are injected directly into the LLM prompt, ensuring accurate responses about this specific repository.

### 3. Google Gemini 1.5
Chosen over OpenAI due to superior free-tier limits, large context window, and native integration with the Google Cloud ecosystem.

## Consequences
The system provides a fast, reliable, and "smart" chat experience. It demonstrates advanced knowledge of modern AI integration patterns without unnecessary infrastructure overhead.