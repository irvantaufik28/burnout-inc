/**
 * Static Game Data: Product Definitions & Synergy
 */

export const PRODUCT_TYPES = ['AI Tool', 'Productivity App', 'Developer Tool', 'Consumer App'];
export const TARGET_MARKETS = ['Students', 'Startups', 'Developers', 'Enterprise'];
export const FOCUS_PRIORITIES = ['Speed', 'Quality', 'Innovation', 'Monetization'];

/**
 * Hidden Synergy System
 * Defines multipliers based on combinations.
 */
export const calculateSynergy = (type, market, focus) => {
  let score = 0;

  // Good Synergies (+20 points)
  if (type === 'AI Tool' && market === 'Startups' && focus === 'Innovation') score += 20;
  if (type === 'Productivity App' && market === 'Students' && focus === 'Speed') score += 20;
  if (type === 'Developer Tool' && market === 'Developers' && focus === 'Quality') score += 20;
  if (type === 'Consumer App' && market === 'Enterprise' && focus === 'Monetization') score += 15;

  // Bad Synergies (-15 points)
  if (market === 'Enterprise' && focus === 'Speed') score -= 15;
  if (type === 'Consumer App' && focus === 'Monetization') score -= 10;
  if (market === 'Students' && focus === 'Monetization') score -= 10;

  return score;
};

export const getReviewTemplate = (score, bugs) => {
  if (bugs > 10) return 'Way too buggy to use.';
  if (score >= 90) return 'Absolute game changer.';
  if (score >= 70) return 'Solid execution, clean UI.';
  if (score >= 50) return 'Does the job, but nothing special.';
  return 'Not sure why this exists.';
};
