# Burnout Inc. | Project Source of Truth

## Project Overview
Burnout Inc. is an indie management simulation game inspired by startup and AI tycoon games. The gameplay focuses on resource management (energy, focus, mood, money) while building a digital product and growing technical expertise.

- Location: /Volumes/Development/burnout-inc
- Vision: Minimalist, high-performance dashboard aesthetic (Indie Hacker / SaaS style).

---

## Tech Stack
- Framework: React (Vite)
- State Management: Zustand
- Styling: TailwindCSS v4 (Vite Plugin)
- Language: JavaScript

---

## Mandatory Development Workflow
1. **Docs First:** Always read AGENTS.md and /docs before implementing new features.
2. **Document Every System:** No major system exists without a dedicated .md file in /docs explaining its identity, effects, and growth logic.
3. **Update Progress:** Keep the Progress Log below updated for every change.
4. **Consistency:** Ensure new logic respects existing synergy, temporal, and economic formulas.

---

## Folder Structure
src/
 - components/    # Reusable UI panels
 - store/         # Zustand store (useGameStore.js)
 - systems/       # Automated logic
 - data/          # Static definitions (productData.js)
 - hooks/         # React hooks (useGameLoop.js)
 - styles/        # CSS (index.css)
 - App.jsx        # Orchestrator

---

## Progress Log

### Phase 1: Foundation (Completed)
- Initialize project with Vite/React/Tailwind.
- Implement basic dashboard layout.
- Initial Zustand store.

### Phase 2: Core Loops (Completed)
- Implement Task Duration System. [docs/task-system.md]
- Implement Focus and Mood mechanics. [docs/skills/README.md]
- Implement Game Speed Control.
- Implement Day Cycle (Expenses & Recovery). [docs/day-cycle.md]
- Implement Losing Conditions.
- Implement Product Creation & Launch lifecycle. [docs/product-system.md]
- Implement Tech Stack Familiarity System. [docs/skills/README.md]
- Implement Freelance Gated Contracts. [docs/freelance-system.md]

### Phase 3: Expansion (Current)
- [ ] Implement Market Trend System.
- [ ] Implement AI Agent Automation.
- [ ] Implement Burnout Crisis events.

---

## Agent Guidelines
1. Keep it Simple: No complex class structures or deep abstractions.
2. Fast Iteration: Prioritize functional prototypes over polished visuals.
3. Dark Mode Always: Background zinc-950, borders zinc-800.
4. Abstraction first: Favor broad categories (e.g. 'Backend') over specifics (e.g. 'PostgreSQL').
