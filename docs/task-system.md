# Task Duration System

## System Identity
The core mechanical constraint of Burnout Inc. Instead of immediate actions, every significant player choice consumes game time.

## Gameplay Effects
- Sequential Execution: Only one task can be active at a time.
- Resource Drain: Tasks consume Energy and Focus over time.
- Decision Stakes: Choosing a long task (e.g., 8h Freelance) means you cannot build your product during that window.

## Task Types
- Freelance: Duration 4h-10h. Reward: Immediate capital. Requires an Active Contract.
- Marketing: Duration 3h. Reward: Reputation.
- Rest: Duration 6h. Reward: Energy/Focus recovery.

## Execution Rules
- Players cannot execute "Freelance" tasks without a valid activeContract with status: "active".
- Task completion checks for 100% project progress to trigger rewards and closure.

## Architecture Notes
Tasks are stored in currentTask within useGameStore.js. The tickTime system decrements remainingTime until zero, then triggers completeTask.
