# Project Requirement and Match System

## System Identity
This system defines the technical profile of projects and how they interact with the player's current skill set. It moves the game away from generic progress bars toward specialized expertise management.

## Gameplay Philosophy
Projects are no longer identical. A "Backend" specialist will find API projects easy and fast, but will struggle with "UI Design" projects. 
- **Base Performance:** Derived from how well the player's skills match the project's tech profile.
- **Stability:** Energy and Focus act as multipliers on top of this base performance.

## Match Efficiency Calculation
Efficiency is calculated by comparing the project's requirements against the player's combined skills (Core Skills + Tech Familiarity).

### Formula Concept (Abstracted)
`Efficiency = (Current Skills / Required Skills) across all required domains.`

- **90%+ :** Perfect Match. Peak efficiency, minimal bug risk.
- **70-89% :** Acceptable. Standard progress speed.
- **40-69% :** Risky. Slower progress, higher energy drain.
- **<40% :** Disaster. Extremely slow progress, high bug chance, high stress.

## Gameplay Consequences
- **Progress Speed:** A 50% match results in 50% slower auto-work progress.
- **Bug Risk:** Mismatched skills increase the chance of introducing "Bugs" during the auto-work tick.
- **Burnout:** Lower efficiency causes higher Energy/Focus drain as the player struggles to understand the task.

## Future Employee Compatibility
The system is designed for future expansion:
- Employees will contribute their own skill points to the "Team Skill Pool".
- This pool is used to calculate the final Match Efficiency, allowing teams to tackle high-tier "Elite" projects that a single freelancer cannot handle efficiently.

## Localization Rules
- Technical terms (Frontend, Backend, AI, DevOps, etc.) remain in English.
- Evaluation status (e.g., "Perfect Match") must be localized in `src/locales/`.
