# Architecture Decision Record: Backend-side PDF Generation

## Status
Accepted

## Context
The system must provide official transaction confirmations that are immutable, professional, and consistent across all devices.

## Decision
Generate PDF documents on the backend using the **ReportLab** library.

## Technical Justification
*   **Security:** Generating documents on the server prevents users from tampering with data before saving (which often happens with client-side "Print to PDF" solutions).
*   **Precision:** ReportLab allows for low-level drawing, providing full control over layout, fonts, and complex tables.
*   **Performance:** By generating PDFs in a background worker or specialized endpoint, we keep the frontend light.

## Key Learnings
*   Implementation of **Binary Response Streams** in Django Ninja.
*   Efficient memory management using Python's `io.BytesIO` buffers.
*   Designing professional document layouts using coordinates and drawing primitives.

## Consequences
The system generates high-quality, secure financial documents. The trade-off is a slight increase in server CPU usage, which is mitigated by optimized PDF generation logic.