# Burnout & Recovery System

## System Identity
The management core of Burnout Inc. Instead of clicking to work, the player manages their own mental and physical limits to keep projects progressing automatically.

## Auto Work Philosophy
Freelancing is not about how fast you click, but how well you sustain your productivity.
- **Passive Execution:** Projects progress automatically every game tick.
- **Resource Dependency:** Progress speed is determined by Energy and Focus levels.
- **The Cost of Progress:** Every 1% of progress drains a small amount of Energy and Focus.

## Recovery Mechanics
Players use "Actions" to restore vitals, effectively "pacing" their work:
- **Take Nap:** Restores Energy, consumes 2-4h.
- **Drink Coffee:** Instant Energy boost, but increases Focus decay later.
- **Take Break:** Restores Focus, consumes 1-2h.
- **Pull All Nighter:** Massive speed boost for 8h, but creates severe Energy/Focus penalty next day.

## Exhaustion & Penalties
- **Low Energy (<20%):** Project progress slows by 70%.
- **Depleted Energy (0%):** Project progress pauses completely.
- **Low Focus (<30%):** Chance of introducing "Bugs" during auto-work increases.

## Architecture Decisions
- Progress calculation is handled in the store's `tickTime` hook.
- Recovery actions are implemented as standard time-based tasks.
