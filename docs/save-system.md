# Career Save System

## System Identity
The Career Save System ensures that the player's professional journey in Burnout Inc is persistent and long-term.

## Save Data Structure
### Persisted State
- Player vitals, money, and conditions.
- Career seniority, reputation, and titles.
- Technical mastery (Methodology and Tech Stack).
- Active project progress and conditions.
- Board state and portfolio history.
- Economic state: nextBillDay, pendingBills, lastUnexpectedExpenseDay.
- **Maintenance state:** active deviceIssues, lastDeviceIssueDay.

### Ignored State (Non-persistent)
- Modal open/close states (except Unexpected Expense resolution).
- Hover and temporary animations.
