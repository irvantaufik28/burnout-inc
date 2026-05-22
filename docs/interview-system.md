# Interview System (Personality-Driven)

## Gameplay Purpose
To simulate the "social chaos" of the software industry. It adds a layer of communication and negotiation between applying for and starting a contract.

## Emotional Goals
- Feel the awkwardness of freelancer-client interactions.
- Experience the "insanity" of certain founder archetypes.
- Create memorable, relatable stories about modern tech culture.

## Philosophy: Personality over Technicals
We avoid coding tests. Interviews in Burnout Inc are about **vibe-matching**. 
- NO strict right/wrong answers.
- YES to "what this specific client wants to hear".

## Interview Flow
1. Initiation: Every application triggers an interview (MVP rule).
2. Content: 1–3 situational questions (e.g., handling scope creep, deadlines, or AI hype).
3. Pacing: Entirely under 20 seconds.

## Scoring: Personality Preference
Each answer is weighted toward specific traits:
- **Confidence/Speed:** Loved by Startup Founders.
- **Caution/Stability:** Loved by Enterprise Clients.
- **Empathy/Flexibility:** Loved by Indie Creators.
- **Hype/Optimism:** Loved by AI Bros.

## Outcomes
- **Approval:** Depends on the "matching score" between your answers and the client archetype.
- **Feedback:** "Client liked your startup energy" vs "Client thinks you're too cautious".
- **Reputation:** Good vibe matching provides a small reputation boost.

## Architecture Decisions
- Questions are "Situational" and tagged with weights for different archetypes.
- Logic uses a "Personality Score" calculated during the quiz.
