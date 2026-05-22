# Client Chaos Event System

## System Identity
The unpredictable heart of freelancer life. This system ensures that projects are not just passive progress bars but evolving challenges that require active management and difficult trade-offs.

## Gameplay Philosophy
Modern software development is rarely linear. Clients change their minds, bugs appear at 2 AM, and infrastructure fails.
- Unpredictability: Events trigger randomly during active contracts.
- Decision Stakes: Every event forces a choice with meaningful consequences (e.g., Money vs. Reputation vs. Burnout).
- Storytelling: Events create relatable war stories for the player.

## Trigger Logic
- Frequency: 10-20% chance per game hour (work cycle) when a contract is active.
- Contextual relevance: Events are filtered by project type (Frontend, Backend, etc.) and client personality.
- Vulnerability multipliers: Low Focus or Energy increases the likelihood of Mistake type events.

## Event Structure
- ID: Unique identifier for localization and tracking.
- Trigger: Conditions under which the event can occur.
- Options: 2-3 choices for the player.
- Consequences: Immediate effects on stats (Money, Energy, Focus, Progress, Bugs, Reputation).

## Client Personalities and Chaos
- Startup Founder: Prone to Scope Creep and Dark Mode requests.
- Enterprise: Prone to Architecture Reviews and Security Audits.
- Indie Creator: Prone to Emotional Pivots and Budget Worries.
- AI Bro: Prone to AI Integration pivots.

## Localization
- Tightly integrated with the src/locales/ system.
- Logic is stored in src/data/chaosEvents.js.
- Strings are stored in en.js and id.js.
