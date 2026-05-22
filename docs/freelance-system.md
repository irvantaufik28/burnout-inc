# Freelance Board & Contract System

## Gameplay Philosophy
The primary source of income and pressure. The system mimics the hustle of real-world freelance platforms (Upwork, etc.) but within a high-stakes simulation environment. 

## Contract Lifecycle & Status
To prevent exploits and maintain game balance, contracts follow a strict state machine:

1. Available: Contract is on the board. Player can view requirements and apply.
2. Interview: Application sent, waiting for client response or quiz mini-game.
3. Active: Contract accepted. Deadline is ticking. Work tasks can be executed.
4. Completed: Progress reached 100%. Rewards given, reputation increased, archived to Portfolio.
5. Failed: Deadline hit zero or project abandoned. Reputation penalty applied, archived to Portfolio as fail.
6. Archived: Contract moved to Portfolio history. Non-executable.

## Anti-Exploit Protections
- One Active Project: Only one contract can be in the active state at a time.
- Board Removal: Once a contract is moved to active, it is removed from the availableContracts board.
- State Validation: The startTask and completeTask actions verify that activeContract.status === "active" before applying progress or rewards.

## Negotiation Styles
- Rush: Higher pay, higher burnout.
- Safe: Lower pay, lower stress.
- Premium: Higher reputation bonus.

## Balancing Notes
- Deadlines create tension and force strategic energy management.
- Tech requirements gate higher-tier contracts, encouraging career growth.
