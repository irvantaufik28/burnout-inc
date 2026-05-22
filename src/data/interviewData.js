/**
 * Situational Interview Questions
 * Instead of 'Right/Wrong', each option has a personality 'vibe'.
 * 
 * Vibe Keys:
 * - aggressive: Startup Founder (Likes)
 * - stable: Enterprise (Likes)
 * - flexible: Indie (Likes)
 * - hype: AI Bro (Likes)
 */
export const INTERVIEW_QUESTIONS = [
  {
    text: "We need the MVP by tomorrow morning. Can you pull it off?",
    options: [
      { text: "Grind never stops. I'm on it.", vibe: 'aggressive' },
      { text: "I need to review the scope for risks.", vibe: 'stable' },
      { text: "If we simplify features, maybe.", vibe: 'flexible' }
    ]
  },
  {
    text: "How do you feel about adding 'AI-powered' to our marketing copy?",
    options: [
      { text: "Disruptive. Let's automate everything.", vibe: 'hype' },
      { text: "Is it actually using AI though?", vibe: 'stable' },
      { text: "Sure, if it helps the brand.", vibe: 'flexible' }
    ]
  },
  {
    text: "We don't have a budget right now, but we have massive 'passion'.",
    options: [
      { text: "Passion doesn't pay my coffee bills.", vibe: 'stable' },
      { text: "I love the vision. I'm flexible.", vibe: 'flexible' },
      { text: "Let's build a viral demo and find VCs.", vibe: 'aggressive' }
    ]
  },
  {
    text: "The server crashed. What is your first priority?",
    options: [
      { text: "Post a cool 'we are scaling' tweet.", vibe: 'hype' },
      { text: "Follow the emergency recovery protocol.", vibe: 'stable' },
      { text: "Fix it fast, documentation later.", vibe: 'aggressive' }
    ]
  },
  {
    text: "Can we also add mobile support by Friday?",
    options: [
      { text: "No problem, coffee solves everything.", vibe: 'aggressive' },
      { text: "We need a formal change request.", vibe: 'stable' },
      { text: "Let's see what we can fit in.", vibe: 'flexible' }
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

export const GET_FEEDBACK = (vibe, clientType) => {
  if (vibe === CLIENT_PREFERENCES[clientType]) {
    if (vibe === 'aggressive') return "Client loved your startup energy.";
    if (vibe === 'stable') return "Client was impressed by your professionalism.";
    if (vibe === 'flexible') return "Client appreciated your empathy.";
    if (vibe === 'hype') return "Client is hyped for your automation vision.";
  }
  return "Client felt the vibe was slightly off.";
};
