# Portfolio System

## Gameplay Purpose
To track the player's career achievements and provide a sense of long-term progression. It acts as the player's resume in the game.

## Archiving Rules
When a contract is completed or failed, it is moved from the active slot to the portfolio array.
1. The project status is changed to completed or failed.
2. The activeContract global slot is cleared (set to null).
3. This ensures the project can no longer be executed and the UI resets to an idle state.

## Tracked Data
- Completed Contracts: Total number and list of project titles.
- Specialties: Domains where most work is done.
- Success Rate: Percentage of on-time deliveries.
