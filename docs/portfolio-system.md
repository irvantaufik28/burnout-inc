# Portfolio System

## Gameplay Purpose
To track the player's career achievements and provide a sense of long-term progression. It acts as the player's resume in the game.

## Tracked Data
- Completed Contracts: Total number and list of project titles.
- Specialties: Domains (Frontend, Backend, etc.) where most work is done.
- Success Rate: Percentage of on-time, high-quality deliveries.
- Notable Clients: A list of high-tier or recurring clients served.

## Career Feeling
The player should be able to look at their portfolio and think: "I am a high-end AI Automation specialist now," instead of just seeing numbers on a bar.

## Architecture Decisions
- Portfolio is stored as an array of simplified "CompletedProject" objects.
- Stats derived from this array to show "Specialties".
