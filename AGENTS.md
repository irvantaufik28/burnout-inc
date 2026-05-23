# Burnout Inc. | Project Source of Truth

## Architecture Decisions
1. Zustand for Global State.
2. Dual Time Scale System: Project vs Human pacing.
3. Event Queue Manager: Handles prioritized serialization of major popups.
4. Career Save System: Permanent persistence using localStorage.
5. Debt Pressure System: Negative balance support with tiered penalties.
6. Post-Load Recovery: Ensures active project loops and MODAL states resume correctly after rehydration.

---

## Progress Log
### Phase 2: Freelance Survival Loop (Current)
- [x] Implement Localization System (EN/ID).
- [x] Implement Auto-Work & Requirement System.
- [x] Implement Career Save System & Recovery.
- [x] Implement Weekly Bill & Calendar System.
- [x] Implement Device Maintenance & Debt Pressure.
- [x] Implement Event Queue Manager.
- [x] Implement Overall Survival Status & UI Polish.
- [x] Bugfix: Absolute integrity fix for store functions and event persistence.

---

## Agent Guidelines
5. **Operational Protocol Rule**: Stimulant and recovery systems must always remain responsive, visible, and emotionally satisfying. They must provide immediate gameplay feedback, clear state changes, and visible productivity impact. These are core survival mechanics, NOT cosmetic interactions.
1. **Simple First**: Avoid enterprise patterns.
2. **Docs Mandatory**: Update /docs before major changes.
3. **Recovery Rule**: Persistent gameplay systems must correctly recover after save hydration. **Crucial**: Active modal data (Chaos/Review/Bills) MUST be partialized to prevent reload soft-locks.
4. **Action Integrity**: When refactoring useGameStore.js, never remove actions used by the UI. Verify dependencies in StatPanel, FreelanceBoard, and TaskPanel before deletion.
