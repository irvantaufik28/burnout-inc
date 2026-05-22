# Localization System (EN/ID)

## Architecture
Burnout Inc uses a modular localization system integrated into the Zustand store. Text is separated from gameplay logic to ensure scalability and ease of translation.

## Files
- src/locales/en.js: English source of truth.
- src/locales/id.js: Indonesian translation.
- src/store/useGameStore.js: Contains the t() helper and language state.

## Rules for Technical Terms
We embrace the Mixed-Language Developer Culture. Technical and software industry terms MUST remain in English to maintain realism for Indonesian developers.

DO NOT TRANSLATE:
- Frontend, Backend, AI, DevOps, API, MVP, Startup, Bug, Deadline, Deploy, Scaling, SaaS, Dashboard.

## Key-Based Translation
Systems like the Interview Mini-game use a key-based approach:
- Metadata file (src/data/interviewData.js) contains IDs and vibes.
- Locale files contain the actual text under interview.questions.[id].

## Implementation Example
t('interview.questions.' + id + '.question')

## Workflow for New Content
1. Define the logic/metadata with unique IDs.
2. Add the corresponding keys and text to both en.js and id.js.
3. Use the t() helper in the UI components.
