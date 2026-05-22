# Burnout Inc. | Project Source of Truth

## Project Overview
Burnout Inc. is a Freelancer Survival Simulation. The player takes the role of a struggling indie developer navigating the high-pressure world of gig work, deadlines, and professional reputation.

---

## Architecture Decisions
1. Zustand for Global State.
2. Dual Time Scale System: Project systems (1h=1s) vs Human systems (4h updates).
3. Auto-Work System: Passive progress based on vitals.
4. Career Save System: Permanent persistence using localStorage.
5. Device Maintenance System: Persistent hardware damage that restricts Max Focus.
6. Debt Pressure System: Negative balance support with tiered psychological and mechanical penalties.

---

## Progress Log
### Phase 2: Freelance Survival Loop (Current)
- [x] Implement Localization System.
- [x] Implement Auto-Work System.
- [x] Implement Multi-Currency Localization.
- [x] Implement Career EXP & Skill EXP.
- [x] Implement Level Up Celebration System.
- [x] Implement Career Save System (Persistence).
- [x] Implement Weekly Bill & Invoice System.
- [x] Implement Full Calendar System.
- [x] Implement Device Damage & Maintenance.
- [x] Implement Debt Pressure System (Negative Balance).

---

## Agent Guidelines
1. Simple First: Avoid enterprise patterns.
2. Docs Mandatory: Update /docs before major changes.
3. Progression Integrity: Prioritize career identity.
4. Maintenance Philosophy: Technical problems should create persistent manageable pressure.
5. Debt Philosophy: Financial failure should create persistent emotional pressure, NOT instant punishment. Support survival tension and risk-taking.
