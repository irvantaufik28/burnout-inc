/**
 * Situational Interview Questions (Metadata Only)
 * All text is managed in src/locales/
 */
export const INTERVIEW_QUESTIONS = [
  {
    id: "startup_deadline",
    options: [
      { id: "a", vibe: 'aggressive' },
      { id: "b", vibe: 'stable' },
      { id: "c", vibe: 'flexible' }
    ]
  },
  {
    id: "ai_hype",
    options: [
      { id: "a", vibe: 'hype' },
      { id: "b", vibe: 'stable' },
      { id: "c", vibe: 'flexible' }
    ]
  },
  {
    id: "no_budget",
    options: [
      { id: "a", vibe: 'stable' },
      { id: "b", vibe: 'flexible' },
      { id: "c", vibe: 'aggressive' }
    ]
  },
  {
    id: "server_crash",
    options: [
      { id: "a", vibe: 'hype' },
      { id: "b", vibe: 'stable' },
      { id: "c", vibe: 'aggressive' }
    ]
  },
  {
    id: "scope_creep",
    options: [
      { id: "a", vibe: 'aggressive' },
      { id: "b", vibe: 'stable' },
      { id: "c", vibe: 'flexible' }
    ]
  }
];

export const CLIENT_PREFERENCES = {
  'Startup Founder': 'aggressive',
  'Enterprise': 'stable',
  'Indie Creator': 'flexible',
  'AI Startup': 'hype',
  'Agency': 'stable',
  'Local Shop': 'flexible'
};
