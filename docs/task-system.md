# Task Duration System

## System Identity
The core mechanical constraint of Burnout Inc. Instead of immediate actions, every significant player choice consumes game time.

## Gameplay Effects
- Sequential Execution: Only one task can be active at a time.
- Resource Drain: Tasks consume Energy and Focus over time.
- Decision Stakes: Choosing a long task (e.g., 8h Freelance) means you cannot build your product during that window.

## Execution & Cleanup (Bug Fix Applied)
- Freelance tasks require a contract with status active.
- Upon 100 percent progress, the task system and active contract are cleared atomically.
- This prevents stale UI references where a button remains clickable after a project is done.

## Architecture Notes
Tasks are stored in currentTask within useGameStore.js. The tickTime system decrements remainingTime until zero, then triggers completeTask.
