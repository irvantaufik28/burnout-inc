# Task and Action System

## System Identity
Controls what the player is currently doing. In Phase 2, this has shifted from manual project work to Management and Recovery Actions.

## Sequential Execution
Only one task can be active at a time (e.g., you cannot take a nap while also drinking coffee).

## Action Types
- Take Nap (4h): High Energy recovery, zero Focus recovery. Consumes time.
- Take Quick Break (2h): High Focus recovery, small Energy recovery. Consumes time.
- Drink Coffee (Instant): Instant Energy boost, but creates a Focus penalty later.
- Deep Sleep (6h): Max recovery for both Energy and Focus. Usually done when no contract is active.

## Execution Rules
- Players no longer manually "Work". Instead, they select recovery actions to keep the Auto Work System running efficiently.
- Task completion triggers logic based on the action type (e.g., adding Energy/Focus).

## Architecture Notes
Tasks use the standard currentTask state. The game loop ticks these down until completion.
