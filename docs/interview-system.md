# Interview System (Personality-Driven)

## Gameplay Purpose
To simulate the social chaos of the software industry. It adds a layer of communication and negotiation between applying for and starting a contract.

## Emotional Goals
- Feel the awkwardness of freelancer-client interactions.
- Experience the insanity of certain founder archetypes.
- Create memorable, relatable stories about modern tech culture.

## Philosophy: Personality over Technicals
We avoid coding tests. Interviews in Burnout Inc are about vibe-matching. 
- NO strict right/wrong answers.
- YES to what this specific client wants to hear.

## Localization Architecture
The system uses a strict separation between logic and text:
- Metadata: src/data/interviewData.js tracks IDs and archetype weightings.
- Content: src/locales/*.js tracks the localized questions and options using the question ID.

## Interview Flow
1. Initiation: Every application triggers an interview (MVP rule).
2. Content: 1-3 situational questions (e.g., handling scope creep, deadlines, or AI hype).
3. Outcomes: Based on how well your vibe matches the client's archetype (Startup, Enterprise, etc.).

## Growth and Scalability
New questions can be added by simply providing an ID and adding it to the locale files, with no changes required to the core InterviewModal component.
