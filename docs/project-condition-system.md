# Project Condition System

## System Identity
This system adds emotional and mechanical "scars" to projects. It ensures that player decisions during chaos events and booster usage have lasting effects on the contract's stability and difficulty.

## Balancing Philosophy
Conditions are the primary way we apply long-term pressure.
- **Gradual Burnout:** Conditions like Burnout Risk apply constant drain rather than instant punishment.
- **Escalation:** Stacking conditions (e.g., Technical Debt + Scope Creep) can turn an easy project into a nightmare.
- **Aftermath Loop:** Boosters create positive temporary conditions (e.g., Caffeine Rush) that inevitably decay into negative aftermath conditions (e.g., Focus Crash).

## Core Conditions

### Chaos Conditions
- **Scope Creep:** Slows progress and increases energy drain.
- **Technical Debt:** Decreases efficiency and increases chaos frequency.
- **Client Distrust:** Reduces reputation rewards and increases chaos frequency.
- **Crunch Mode:** Massive speed boost at the cost of severe resource drain.
- **Flow State:** High productivity, low stress. Triggered by high focus.

### Booster & Aftermath Conditions
- **Caffeine Rush:** +Speed, +Energy stability. Leads to **Focus Crash**.
- **Nicotine Focus:** +Focus stability, +Speed. Leads to **Energy Drain**.
- **Overclocked:** Massive speed boost. Leads to **Insomnia**.
- **Burnout Risk:** Reduces recovery efficiency and increases focus drain.
- **Production Panic:** Rapid focus damage and progress slowdown.

## Localization Rules
- Condition keys must be registered in `src/locales/` under the `condition` object.
- Technical terms remain in English.
