# Architecture Decision Record: Responsive UI/UX & Zero-Scroll Policy

## Status
Accepted

## Context
The primary design goal for the desktop version is a "Zero-Scroll" experience, where the application behaves like a native program, fitting perfectly within the viewport. However, this posed challenges for mobile users and fixed navigation elements.

## Decision
We implemented a **Hybrid Responsive Layout** strategy.

## Technical Justification

### 1. Dual-Layout Logic
- **Desktop:** Forced `overflow-hidden` with `h-screen` frames. Content is centered using Flexbox to maintain a native app feel.
- **Mobile:** Automatically switches to `overflow-y-auto` and `min-h-screen`, allowing for natural vertical scrolling on smaller devices.

### 2. Fluid Typography
We utilized Tailwind's responsive utilities (e.g., `text-4xl md:text-9xl`) to prevent long headers from breaking the layout on narrow screens while maintaining "monumental" typography on desktops.

### 3. Z-Index & Layout Buffering
The Navbar uses `fixed top-0`. To prevent content overlap, we implemented a global padding buffer (`pt-20` to `pt-28`) in the main container, ensuring navigation never obscures critical data.

## Consequences
- **Premium UX:** Maintains a unique, high-end "app-like" identity on desktop.
- **Accessibility:** Ensures the portfolio is fully readable and functional on mobile devices.
- **Constraint:** Every new component must be designed with height constraints in mind to avoid breaking the Zero-Scroll policy on larger screens.