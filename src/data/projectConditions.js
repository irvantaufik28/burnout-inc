/**
 * Project Conditions (Metadata & Logic)
 * Effects are applied during the auto-work tick in useGameStore.js
 */

export const PROJECT_CONDITIONS = {
  scope_creep: {
    id: 'scope_creep',
    icon: '📦',
    color: 'text-orange-500',
    effects: { progressMult: 0.7, energyDrainMult: 1.2 }
  },
  tech_debt: {
    id: 'tech_debt',
    icon: '🛠️',
    color: 'text-yellow-500',
    effects: { efficiencyPenalty: 0.1, chaosChanceMult: 1.5, bugChanceMult: 2.0 }
  },
  client_distrust: {
    id: 'client_distrust',
    icon: '🤨',
    color: 'text-purple-500',
    effects: { reputationRewardMult: 0.5, chaosChanceMult: 2.0 }
  },
  crunch_mode: {
    id: 'crunch_mode',
    icon: '🔥',
    color: 'text-red-500',
    effects: { progressMult: 1.5, energyDrainMult: 2.0, focusDrainMult: 1.5 }
  },
  flow_state: {
    id: 'flow_state',
    icon: '🌊',
    color: 'text-cyan-400',
    effects: { progressMult: 1.3, focusDrainMult: 0.5, chaosChanceMult: 0.2 }
  },
  burnout_risk: {
    id: 'burnout_risk',
    icon: '🧠',
    color: 'text-red-600',
    effects: { recoveryEfficiency: 0.5, focusDrainMult: 2.0 }
  },
  production_panic: {
    id: 'production_panic',
    icon: '🚨',
    color: 'text-red-400',
    effects: { focusDamagePerTick: 2, progressMult: 0.5 }
  }
};
