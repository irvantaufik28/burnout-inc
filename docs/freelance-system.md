# Freelance Board & Contract System

## Gameplay Philosophy
The primary source of income and pressure. The system mimics the hustle of real-world freelance platforms (Upwork, etc.) but within a high-stakes simulation environment. 

## Contract Lifecycle & Status
To prevent exploits and ensure UI synchronization, contracts follow a strict state machine:

1. Available: Contract is on the board. Player can view requirements and apply.
2. Interview: Application sent, waiting for client response or quiz mini-game.
3. Active: Contract accepted. Deadline is ticking. Work tasks can be executed.
4. Completed: Progress reached 100%. Rewards given, reputation increased, archived to Portfolio.
5. Failed: Deadline hit zero or project abandoned. Reputation penalty applied, archived to Portfolio as fail.
6. Archived: Contract moved to Portfolio history. Non-executable.

## UI Synchronization Rules (CRITICAL)
- The Active Contract Card must ONLY render if activeContract.status === "active".
- Upon reaching 100% progress, the activeContract state must be explicitly set to null to clear the UI immediately.
- The Execute Work button must be disabled if no valid active contract exists.

## Anti-Exploit Protections
- One Active Project: Only one contract can be in the active state at a time.
- Board Removal: Once a contract is moved to active, it is removed from the availableContracts board.
- Atomic Cleanup: Rewards, portfolio archiving, and activeContract clearing must happen in a single state mutation.
