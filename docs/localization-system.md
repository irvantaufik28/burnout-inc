# Localization System (EN/ID)

## Architecture
Burnout Inc uses a modular localization system integrated into the Zustand store. Text and currency are separated from gameplay logic to ensure scalability and full cultural immersion.

## Core Pillars
1. Text Translation: Localized strings in src/locales/.
2. Currency Localization: Automatic adaptation of currency symbols and number formatting based on the active language.
3. Culture Preservation: Technical and software industry terms remain in English.

## Currency Source of Truth
- English UI: USD ($)
- Indonesian UI: IDR (Rp)

## Implementation Rules
- Centralized Formatter: Use src/utils/currencyFormatter.js for ALL monetary displays.
- Internal Economy: Game state always tracks money in a single base unit (USD).
- Mixed-Language REALISM: Do NOT translate terms like Frontend, Backend, AI, DevOps, API, MVP, Deadline.

## Workflow for New Content
1. Define the logic/metadata.
2. Add localized strings to en.js and id.js.
3. Use the fCurrency helper in the store or formatCurrency in UI components for monetary values.
