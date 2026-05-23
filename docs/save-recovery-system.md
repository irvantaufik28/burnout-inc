# Save Recovery System

## System Identity
The Save Recovery System ensures that the gameplay state—especially long-running auto-work processes—resumes correctly after the player reloads the game or reopens the browser.

## Post-Load Recovery Logic
When the player clicks "Continue Career" from the landing page, the continueCareer action is triggered.
- **Contract Restoration**: If an activeContract with status: 'active' exists, the store ensures the time-ticking interval can correctly process its progress.
- **Event Object Persistence**: ALL active event objects (like activeChaosEvent, activeReview, etc.) must be saved in the partialize list. If the event queue contains an event but its corresponding data object is missing, the game will "freeze" in a null-state modal.
- **Task Continuation**: If a currentTask (like resting or stimulant use) is running, it continues its countdown based on the preserved game time.

## Persistence Safety
- **Hydration Ready**: Systems (like tickTime) will not attempt to process state before the store hydration is complete.
- **Explicit Partialization**: The Zustand persist middleware must explicitly include all active modal states to prevent re-hydration freezes.
- **Action Ordering**: In useGameStore.js, helper functions and internal system handlers (like refreshContractBoard) must be defined BEFORE or referenced via get() within the time engine to prevent TypeErrors during re-sync.

## Debugging and Validation
Post-load recovery is logged as "Career Restored: Systems Re-synced" to track successful state restoration.
