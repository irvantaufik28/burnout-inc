/**
 * Client Chaos Events (Metadata & Logic Only)
 * Text content resides in src/locales/
 */

export const CHAOS_EVENTS = [
  {
    id: 'scope_creep_ui',
    archetype: 'Startup Founder',
    requirement: { type: 'Frontend' }, // Project type hint
    options: [
      { id: 'accept', effect: { progress: -10, reputation: 5, focus: -10 } },
      { id: 'negotiate', effect: { reward: 100, mood: -10 } },
      { id: 'reject', effect: { reputation: -5 } }
    ]
  },
  {
    id: 'architecture_review',
    archetype: 'Enterprise',
    requirement: { type: 'Backend' },
    options: [
      { id: 'do_it', effect: { focus: -20, quality: 10 } },
      { id: 'delegate', effect: { money: -50, progress: 5 } }
    ]
  },
  {
    id: 'ai_pivot',
    archetype: 'AI Startup',
    requirement: { type: 'AI' },
    options: [
      { id: 'pivot', effect: { progress: -20, reputation: 10, ai_familiarity: 5 } },
      { id: 'stay_course', effect: { focus: -5, reputation: -2 } }
    ]
  },
  {
    id: 'emotional_vibe_check',
    archetype: 'Indie Creator',
    options: [
      { id: 'listen', effect: { mood: 10, focus: -10 } },
      { id: 'ghost', effect: { reputation: -10, focus: 5 } }
    ]
  }
];
