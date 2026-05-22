# Freelance Project Detail System

## System Identity
This system transitions the project selection process from a generic "Click to Apply" mechanic to a high-stakes "Contract Review" experience. It forces players to evaluate the risks and rewards of a contract before committing their career to it.

## Gameplay Philosophy
A freelancer's career is built on the contracts they choose.
- **Immersion:** Projects belong to companies with distinct identities and needs.
- **Risk Assessment:** Players must weigh the potential capital/reputation gain against the financial and reputational penalties of failure.
- **Qualified Bidding:** The Match Efficiency system is integrated to show exactly how qualified the player is for the specific technical requirements of the brief.

## Core Features
1. **Project Detail Modal:** A professional breakdown of the contract.
2. **Procedural Variation:** Randomized company names, project briefs, and penalty scales.
3. **Immersive Actions:** Replacing "Apply" with "Send CV" to reinforce the professional software industry theme.
4. **Transparent Consequences:** Clear visualization of what happens if the project is successfully delivered vs. if it fails.

## Procedural Generation Rules
Contracts are generated with:
- **Difficulty Tiers:** Easy, Medium, Hard.
- **Procedural Penalties:** Scaled based on reward and risk level.
- **Briefs:** believable software industry scenarios (e.g., "API optimization", "UI redesign").

## UI Visual Rules
- **Color Coding:** Rewards (Emerald), Penalties (Red), Requirements (Zinc/Gold).
- **Match Evaluation:** Categorized as "Excellent", "Acceptable", "Risky", or "Dangerous".

## Localization
- Tightly integrated with the key-based translation system.
- Content logic (briefs, company names) is procedural, while labels and status evaluations are localized in `src/locales/`.
