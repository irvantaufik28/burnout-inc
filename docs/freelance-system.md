# Freelance Board and Contract System

## Gameplay Philosophy
The primary source of income and pressure. In Phase 2, this has evolved into an Auto-Progressing Simulation with high-stakes decision making.

## Contract Selection Flow
1. **Browse Board:** View cards representing potential contracts with company names and Match % estimation.
2. **Review Detail:** Open the **Project Detail Modal** to read the brief and see risk/reward values.
3. **Send CV:** Submit an application (Waiting Flow).
4. **Interview:** Handle situational personality-driven questions if requested.
5. **Auto-Execution:** Once accepted, the project progresses based on player vitals and skill match.

## Contract Lifecycle
- **Available:** On the board.
- **Reviewing:** Modal open.
- **Waiting:** CV sent, reviewing.
- **Interview:** In conversation.
- **Active:** Progressing automatically.
- **Archived:** Completed or Failed.

## Auto-Work Logic
- Passive Progress: Progress is generated every game hour.
- Vitals Dependency: High Energy and Focus = fast progress.
- Match Efficiency: Speed is heavily modified by the player's skill set vs. project requirements.

## Architecture Decisions
- Detail Modal is managed via `selectedContract` state in `useGameStore.js`.
- Procedural generation adds randomized company briefs and penalties to every new board refresh.
