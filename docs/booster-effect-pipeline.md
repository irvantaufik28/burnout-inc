# Booster Effect Pipeline

## System Identity
Ensures that all temporary modifiers from boosters and recovery actions are correctly applied, persisted, and expired.

## Execution Flow
1. **Application:** startTask applies immediate costs and partial immediate effects.
2. **Persistence:** activeEffects array tracks { id, remaining, total }.
3. **Pacing:** tickTime decrements remaining every game hour.
4. **Integration:** getMatchEfficiency and tickHumanFatigue query activeEffects to modify progress and decay rates.
5. **Expiry:** Upon remaining <= 0, the effect is removed and any defined aftermath condition is triggered (e.g., focus_crash after caffeine_rush).

## Modifier Lifecycle
- **Productivity:** progressMult (e.g., 1.5x speed).
- **Efficiency:** efficiencyPenalty (e.g., -0.1).
- **Survival:** energyDrainMult, focusDrainMult.
- **Recovery:** recoveryEfficiency (e.g., 0.5x when burned out).
- **Bypass:** exhaustionSlowdownReduction (ignoring the 0.3x penalty at low energy).

## UI Requirements
- Active effects must be visible in TaskPanel with countdown timers and icons.
- Immediate feedback in the LogPanel upon activation and expiration.