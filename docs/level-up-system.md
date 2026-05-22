# Level Up Celebration System

## System Identity
The emotional reward for professional growth. This system ensures that career milestones and technical mastery are celebrated visually, giving the player a sense of achievement and prestige.

## Design Philosophy
In a game about stress and burnout, positive milestones must feel high-impact.
- Auto-Pause: The game automatically pauses when a level-up occurs to allow the player to savor the moment.
- Prestige Visuals: Uses high-contrast emerald colors, blur effects, and celebratory icons.
- Queue System: If multiple levels are gained simultaneously (e.g., Career and Coding), the system queues them and shows them one after another.

## Trigger Conditions
Level ups occur when:
- Career EXP reaches the next level threshold (earned from project success).
- Skill EXP reaches the next level threshold (earned from technical project requirements).

## Celebration Modal
The LevelUpModal.jsx displays:
- Promotion Title: For Career levels (e.g., Reliable Freelancer).
- Skill Name: For Technical mastery.
- Level Reached: The new numeric milestone.
- Flavor Description: Localized context about what this means for the player's career.

## Pacing and immersion
By forcing a manual Dismiss (Resume) action, the system ensures that the player notices their growth, which is critical for long-term retention and emotional investment in their Burnout Inc career.
