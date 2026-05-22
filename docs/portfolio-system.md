# Portfolio System

## Gameplay Purpose
To track the player's career achievements and provide a sense of long-term progression. It acts as the player's resume in the game.

## Completion & Archiving Flow
When a contract is completed:
1. Status is changed to completed.
2. activeContract is set to null.
3. currentTask is set to null.
4. Entries are immutable once archived to portfolio.

This flow ensures the UI state and game state remain perfectly synchronized.
