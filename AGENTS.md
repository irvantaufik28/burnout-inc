# Burnout Inc. | Project Source of Truth

## Project Overview
Burnout Inc. is a Freelancer Survival Simulation. The player takes the role of a struggling indie developer navigating the high-pressure world of gig work, deadlines, and professional reputation.

- Location: /Volumes/Development/burnout-inc
- Vision: High-stakes, minimalist dashboard sim focusing on the emotional and strategic survival of a freelancer.

---

## Tech Stack
- Framework: React (Vite)
- State Management: Zustand
- Styling: TailwindCSS v4 (Vite Plugin)
- Language: JavaScript

---

## Mandatory Development Workflow
1. Docs First: Always read AGENTS.md and /docs before implementing new features.
2. Document Every System: No major system exists without a dedicated .md file in /docs.
3. Localization Rule: Every gameplay system and UI text MUST support English and Indonesian from the start.
   - Files: src/locales/en.js and src/locales/id.js.
   - Technical terms (Frontend, Backend, AI, etc.) remain in English.
4. Update Progress: Keep the Progress Log below updated for every change.

---

## Architecture Decisions
1. Zustand for Global State: Central store for all game data. logic is kept in actions to keep components "dumb".
2. Modular Dashboard: UI is split into specialized panels to keep files small and readable.
3. Temporal Loop: Managed via useGameLoop, supports variable speeds.
4. Task System: All major actions (Working on Contract, Resting) consume game hours and advance deadlines.
5. Interview System: Situational mini-game focused on personality/vibe matching.
6. Client Archetypes: MEMORABLE personalities that affect contract difficulty and feedback.

---

## Progress Log

### Phase 1: Foundation (Completed)
- Initialize project with Vite/React/Tailwind.
- Implement basic dashboard layout.
- Initial Zustand store.

### Phase 2: Freelance Survival Loop (Current)
- [x] Update Core Documentation (AGENT.md, docs/).
- [x] Implement Localization System (Bilingual: EN/ID).
- [x] Refine Freelance Board System (Randomized varied contracts).
- [x] Implement Waiting Response Flow (Apply -> Delay -> Result).
- [x] Implement Interview System (Situational personality-driven).
- [ ] Implement Client Archetypes & Feedback.
- [ ] Implement Contract Chaos Events.
- [ ] Implement Portfolio System.
- [ ] Implement Recurring Clients.

---

## Agent Guidelines
1. Simple First: Avoid enterprise patterns. Focus on addictive loops.
2. Docs Mandatory: Update /docs before every major system change.
3. Dark Minimalist UI: Background zinc-950, borders zinc-800.
4. Mixed-Language Culture: Translate UI and narrative, keep Tech terms in English.
