/**
 * Project Conditions (Metadata & Logic)
 * Effects are applied during the auto-work tick in useGameStore.js
 */

export const PROJECT_CONDITIONS = {
  // --- CORE CHAOS CONDITIONS ---
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
  },

  // --- BOOSTER / COPING CONDITIONS ---
  caffeine_rush: {
    id: 'caffeine_rush',
    icon: '☕',
    color: 'text-yellow-400',
    duration: 4,
    effects: { progressMult: 1.2, energyDrainMult: 0.8 },
    aftermath: 'focus_crash'
  },
  nicotine_focus: {
    id: 'nicotine_focus',
    icon: '🚬',
    color: 'text-zinc-400',
    duration: 6,
    effects: { progressMult: 1.1, focusDrainMult: 0.7 },
    aftermath: 'energy_drain'
  },
  overclocked: {
    id: 'overclocked',
    icon: '🥤',
    color: 'text-lime-400',
    duration: 5,
    effects: { progressMult: 1.5, energyDrainMult: 1.5, exhaustionSlowdownReduction: 0.5 },
    aftermath: 'insomnia'
  },

  // --- AFTERMATH CONDITIONS ---
  focus_crash: {
    id: 'focus_crash',
    icon: '📉',
    color: 'text-purple-600',
    duration: 8,
    effects: { focusDrainMult: 2.5 }
  },
  energy_drain: {
    id: 'energy_drain',
    icon: '🪫',
    color: 'text-red-500',
    duration: 8,
    effects: { energyDrainMult: 2.0 }
  },
  insomnia: {
    id: 'insomnia',
    icon: '👁️',
    color: 'text-indigo-400',
    duration: 12,
    effects: { recoveryEfficiency: 0.4 }
  }
};
