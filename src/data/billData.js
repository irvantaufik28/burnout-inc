/**
 * Weekly Bill Base Costs (USD)
 * Bills scale based on Career Level
 */
export const WEEKLY_BILL_BASE = {
  internet: 30,
  electricity: 20,
  software_subs: 15,
  workspace_rent: 50,
  cloud_services: 10
};

export const getScaledBills = (careerLevel) => {
  const scale = 1 + (careerLevel * 0.15); // 15% increase per level
  return Object.fromEntries(
    Object.entries(WEEKLY_BILL_BASE).map(([key, val]) => [key, Math.floor(val * scale)])
  );
};
