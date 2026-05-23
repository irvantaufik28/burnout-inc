# Survival Loop Polish Pass

## Design Philosophy
Burnout Inc is complex but must remain readable. The goal of this polish pass is to ensure that the player can understand their professional and psychological situation within 3 seconds of looking at the dashboard.

## Dashboard Readability Improvements

### Overall Survival Status
Located in the Header, this indicator summarizes the player's general condition:
- STABLE: Everything is under control.
- UNSTABLE: Minor issues (Low Energy, Small Debt).
- RISKY: Significant pressure (Critical Energy, Medium Debt).
- CRITICAL: High failure risk (Bankruptcy timer active, Critical Debt).

### Deadline and Failure Estimation
The Task Panel now includes a Estimated Project Failure Risk warning if progress is too slow relative to the deadline. Efficiency is visually emphasized to show the impact of vitals and hardware damage.

## Pressure Spacing System
To prevent punishment stacking, the game includes a pressure cooldown:
- Last Major Incident: Tracked in the store.
- Effect: Chance of major negative events (Chaos, Unexpected Expenses) is significantly reduced for 2-3 days after a previous major event resolved.
- Goal: Give the player breathing room to recover vital stats and capital.

## Adaptive Mental Feedback
Monologue frequency ([MIND] logs) scales with current pressure. Quiet periods allow for reflection, while critical periods increase the frequency of anxious internal thoughts.
