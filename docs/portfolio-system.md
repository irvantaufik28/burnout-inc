# Portfolio System

## Gameplay Purpose
To track the player's career achievements and provide a sense of long-term progression. It acts as the player's resume in the game.

## Completion Rules
When a contract is completed or failed, it is pushed to the portfolio array. This process:
1. Gives final rewards (if success).
2. Applies final reputation changes.
3. Clears the activeContract slot.
4. Locks the project from further execution.

## Tracked Data
- Completed Contracts: Total number and list of project titles.
- Specialties: Domains where most work is done.
- Success Rate: Percentage of on-time deliveries.
- Notable Clients: A list of high-tier clients served.
