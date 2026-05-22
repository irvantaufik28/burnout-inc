# Booster and Coping Mechanic System

## System Identity
The desperate measures of a stressed freelancer. Boosters represent unhealthy coping mechanisms used to survive aggressive deadlines. They provide short-term survival benefits but create long-term instability.

## Design Philosophy
Boosters are not RPG buffs. They are trade-offs.
- Immediate Benefit: Instant speed, focus stability, or energy recovery.
- Delayed Consequence: Every booster has an Aftermath condition that triggers once the initial effect fades.
- Unhealthy Loop: Over-reliance on boosters leads to chronic conditions like Burnout Risk or Insomnia.

## Action Categories

### 1. Recovery (Safe)
Reliable, slow, and safe.
- Take Nap: Large energy recovery.
- Take Break: Focus recovery.

### 2. Stimulants (Risky)
High risk, short-term performance gains.
- Drink Coffee ($5): Applies Caffeine Rush (+Speed, +Energy). Leads to Focus Crash later.
- Smoke While Coding ($8): Applies Nicotine Focus (+Focus, +Speed). Leads to Energy Drain later.
- Energy Drink ($15): Applies Overclocked (High Speed, reduced exhaustion penalty). Leads to Insomnia later.

## Balancing and Stacking
- Anti-Spam: Stacking more than 2 stimulants trigger an immediate Burnout Risk warning.
- Persistent Scars: Aftermath conditions last significantly longer than the benefits.
- Cost: Stimulants cost capital, representing the financial drain of unhealthy habits.

## Architecture Decisions
- Boosters apply temporary conditions via the conditionTimers system in the store.
- Aftermaths are automatically triggered by the tickConditionTimers loop when the main effect expires.
