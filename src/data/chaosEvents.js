/**
 * Client Chaos Events (Metadata & Logic)
 * Tiers: 1 (Minor), 2 (Moderate), 3 (Major)
 */

export const CHAOS_EVENTS = [
  // --- TIER 1: MINOR (Focus/Energy Niggles) ---
  {
    id: 'progress_update',
    tier: 1,
    options: [
      { id: 'reply', effect: { focus: -2, energy: -3 } },
      { id: 'ignore', effect: { reputation: -1 } }
    ]
  },
  {
    id: 'unclear_feedback',
    tier: 1,
    options: [
      { id: 'ask', effect: { focus: -3 } },
      { id: 'guess', effect: { progress: -5, focus: -1 } }
    ]
  },

  // --- TIER 2: MODERATE (Condition Shifts) ---
  {
    id: 'scope_creep_ui',
    tier: 2,
    archetype: 'Startup Founder',
    options: [
      { id: 'accept', effect: { addCondition: 'scope_creep', focus: -5, energy: -5 } },
      { id: 'negotiate', effect: { reward: 200, addCondition: 'client_distrust', focus: -3 } },
      { id: 'reject', effect: { reputation: -2, addCondition: 'client_distrust' } }
    ]
  },
  {
    id: 'architecture_review',
    tier: 2,
    archetype: 'Enterprise',
    options: [
      { id: 'do_it', effect: { addCondition: 'tech_debt', focus: -10, energy: -5 } },
      { id: 'delegate', effect: { money: -100, removeCondition: 'tech_debt' } }
    ]
  },

  // --- TIER 3: MAJOR (Crisis Mode) ---
  {
    id: 'production_failure',
    tier: 3,
    options: [
      { id: 'fix_it', effect: { addCondition: 'production_panic', energy: -15, focus: -12, reputation: -2 } },
      { id: 'blame', effect: { reputation: -8, energy: -5 } }
    ]
  },
  {
    id: 'angry_escalation',
    tier: 3,
    options: [
      { id: 'apologize', effect: { reputation: -5, addCondition: 'burnout_risk', focus: -10 } },
      { id: 'fire_client', effect: { reputation: -15, money: -500, activeContract: null } }
    ]
  }
];
