# Freelance Board and Contract System

## Gameplay Philosophy
The primary source of income and pressure. In Phase 2, this has evolved into an Auto-Progressing Simulation.

## Contract Lifecycle
1. Available: Board contracts with tiered difficulty.
2. Active: Once accepted, the project automatically progresses every game tick.
3. Completed/Failed: Based on progress reached before the deadline hits zero.

## Auto-Work Logic
- Passive Progress: Progress is generated every game hour.
- Vitals Dependency: High Energy and Focus = fast progress. Low Energy = massive slowdown.
- Failure: If the Deadline Bar hits 0 before progress hits 100 percent, the project is failed.

## Strategic Pressure
The player is no longer a "Clicker". They are a "Manager". You must decide when to push through a deadline (exhausting yourself) or when to take a break (risking the deadline).

## Architecture Decisions
- Progress and Deadline are ticked within the central tickTime action.
- UI uses defensive conditions to hide/show active contract details.
