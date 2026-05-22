# Project Condition System

## System Identity
This system adds emotional and mechanical "scars" to projects. It ensures that player decisions during chaos events have lasting effects on the contract's stability and difficulty.

## Gameplay Philosophy
Contracts are no longer just progress bars; they are unstable systems.
- **Lasting Scars:** Decisions create conditions that modify how the project behaves over time.
- **Unpredictable Trajectory:** A project can start stable and spiral into a disaster through a series of poor choices.

## Condition Structure
- **Persistent:** Stays until the project ends (e.g., Technical Debt).
- **Temporary:** Triggers and decays based on game state (e.g., Flow State).
- **Removable:** Can be cleared via recovery actions or future specialized tasks (Planned).

## Core Conditions
- **Scope Creep (📦):** Slows progress and increases energy drain. Created by over-promising to startups.
- **Technical Debt (🛠️):** Decreases efficiency and increases chaos/bug frequency. Created by choosing "Quick Fix" options.
- **Client Distrust (🤨):** Reduces reputation rewards and increases chaos frequency. Created by negotiating poorly or missing milestones.
- **Crunch Mode (🔥):** Massive speed boost at the cost of severe energy and focus drain.
- **Flow State (🌊):** High productivity, low stress. Rare and rewarding state triggered by high focus.
- **Burnout Risk (🧠):** Reduces recovery efficiency and increases focus drain.
- **Production Panic (🚨):** Rapid focus damage and progress slowdown.

## Formula Integration
Conditions apply multipliers to:
- `progressMult`
- `energyDrainMult`
- `focusDrainMult`
- `chaosChanceMult`
- `efficiencyPenalty`

## Localization Rules
- Condition keys must be registered in `src/locales/` under the `condition` object.
- Technical terms remain in English.
