# Client Chaos Event System

## System Identity
The unpredictable heart of freelancer life. This system ensures that projects are not just passive progress bars but evolving challenges that require active management and difficult trade-offs.

## Gameplay Philosophy
Modern software development is rarely linear. Chaos should feel like mounting pressure, not random unfair punishment.
- Chaos Tiers: Events are categorized by intensity to ensure a natural escalation.
- Lasting Scars: Choices primarily create long-term project conditions rather than just instant stat damage.
- Strategic Decision Stakes: Every event forces a choice with meaningful trade-offs (e.g., Money vs. Reputation vs. Stability).

## Trigger Logic
- Base Frequency: 3.5 percent chance per game hour (work cycle) when a contract is active.
- Instability Multipliers: Certain project conditions (like Technical Debt) increase the frequency of chaos.
- Auto-Pause: The game automatically pauses when a chaos event triggers to allow for stress-free decision making.

## Chaos Tiers

### Tier 1: Minor (Information Icon)
Small interruptions or niggles. Low impact, mostly affecting Energy or Focus slightly.
- Reputation Penalty: 0 to -1.

### Tier 2: Moderate (Warning Icon)
Standard industry challenges. Usually results in a new Project Condition (e.g., Scope Creep).
- Reputation Penalty: -1 to -3.

### Tier 3: Major (Crisis Icon)
Critical crises. Rare and highly impactful. Can result in contract termination or severe reputation loss.
- Reputation Penalty: -3 to -8.

## Consequence Philosophy
We prioritize Project Conditions over direct stat hits. Adding Burnout Risk is more emotionally engaging and strategically interesting than losing 20 Focus instantly.

## Localization
- Tightly integrated with the src/locales/ system.
- Logic is stored in src/data/chaosEvents.js.
- Strings are stored in en.js and id.js.
