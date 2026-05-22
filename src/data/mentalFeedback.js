/**
 * Player Mental Feedback Triggers
 * These define when the "Internal Monologue" logs appear.
 */

export const MENTAL_FEEDBACK_TRIGGERS = [
  {
    id: 'fatigue_low',
    chance: 0.05,
    condition: (state) => state.player.energy < 40 && state.player.energy >= 20
  },
  {
    id: 'fatigue_medium',
    chance: 0.08,
    condition: (state) => state.player.energy < 20 && state.player.energy >= 10
  },
  {
    id: 'fatigue_critical',
    chance: 0.15,
    condition: (state) => state.player.energy < 10
  },
  {
    id: 'stimulant_dependency',
    chance: 0.1,
    condition: (state) => state.stimulantHistory.length >= 3
  },
  {
    id: 'focus_low',
    chance: 0.08,
    condition: (state) => state.player.focus < 30
  },
  {
    id: 'flow_state',
    chance: 0.05,
    condition: (state) => state.activeContract?.conditions?.includes('flow_state')
  },
  {
      id: 'financial_anxiety',
      chance: 0.06,
      condition: (state) => (state.nextBillDay - state.gameTime.day) <= 1 || (state.player.money < 200 && state.player.money >= 0)
  }
];
