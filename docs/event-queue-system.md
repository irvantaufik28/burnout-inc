# Event Queue Manager

## System Identity
The Event Queue Manager handles the serialization and prioritization of all major game popups. It ensures that the player is never overwhelmed by overlapping modals, providing a clean and paced survival experience.

## Priority Weighting

### CRITICAL (100)
- Bankruptcy Collapse
- Monday Settlement (Weekly Bills)
- Critical Debt Warnings

### HIGH (80)
- Chaos Events (Random Project Incidents)
- Device Failure Warnings
- Unexpected Expenses

### MEDIUM (50)
- Interview Requests
- Client Reviews
- Career/Skill Level Up

## Resolution & Persistence Rules
1. **Modal Data Matching**: Every event in the eventQueue must have its corresponding data object populated in the store (e.g., activeChaosEvent).
2. **Persistence Rule**: Active modal data objects MUST be included in the Zustand partialize config. Failing to persist these objects results in a "Soft-Lock" where the queue is active but the content is null after a page reload.
3. **Auto-Pause**: The game speed engine remains paused as long as eventQueue.length > 0. This is strictly enforced during the tickTime check.
