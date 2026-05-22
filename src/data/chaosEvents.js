/**
 * Client Chaos Events (Metadata & Logic Only)
 * Text content resides in src/locales/
 */

export const CHAOS_EVENTS = [
  {
    id: 'scope_creep_ui',
    archetype: 'Startup Founder',
    requirement: { type: 'Frontend' },
    options: [
      { id: 'accept', effect: { addCondition: 'scope_creep', reputation: 10 } },
      { id: 'negotiate', effect: { reward: 200, mood: -10, addCondition: 'client_distrust' } },
      { id: 'reject', effect: { reputation: -10, addCondition: 'client_distrust' } }
    ]
  },
  {
    id: 'architecture_review',
    archetype: 'Enterprise',
    requirement: { type: 'Backend' },
    options: [
      { id: 'do_it', effect: { addCondition: 'tech_debt', focus: -20 } },
      { id: 'delegate', effect: { money: -100, removeCondition: 'tech_debt' } }
    ]
  },
  {
    id: 'ai_pivot',
    archetype: 'AI Startup',
    requirement: { type: 'AI' },
    options: [
      { id: 'pivot', effect: { progress: -30, addCondition: 'crunch_mode', reputation: 15 } },
      { id: 'stay_course', effect: { focus: -10, addCondition: 'client_distrust' } }
    ]
  },
  {
    id: 'emotional_vibe_check',
    archetype: 'Indie Creator',
    options: [
      { id: 'listen', effect: { mood: 15, addCondition: 'flow_state' } },
      { id: 'ghost', effect: { reputation: -15, addCondition: 'client_distrust' } }
    ]
  }
];
