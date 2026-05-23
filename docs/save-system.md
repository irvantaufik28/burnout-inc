# Career Save System

## System Identity
The Career Save System ensures that the player's professional journey in Burnout Inc is persistent and long-term.

## Persisted State
- Player vitals, money, and conditions.
- Career seniority, reputation, and titles.
- Technical mastery.
- Active project progress and conditions.
- Board state and portfolio history.
- Economic state: bills, debt severity, days in debt.
- **Event state:** eventQueue (queued popups), lastMajorIncidentDay.

## Technical Implementation
- Middleware: zustand/middleware/persist.
- Storage: localStorage.
- Sync: Automatic on event resolve and periodically (12h game time).
