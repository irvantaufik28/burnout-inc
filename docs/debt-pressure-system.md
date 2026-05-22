# Debt Pressure System

## System Identity
The Debt Pressure System ensures that financial failure is a persistent psychological and operational hurdle rather than an instant game termination. It allows for a struggling freelancer narrative where players must manage debt while fighting burnout.

## Debt Tiers and Severity

### Small Debt
- Range: 0 to -1,000
- Status: Unstable
- Visual: Yellow capital display.
- Effects: Slight mood decrease, increased frequency of financial anxiety monologues.

### Medium Debt
- Range: -1,000 to -5,000
- Status: Warning
- Visual: Orange capital display.
- Effects: Recovery efficiency reduced by 20 percent, focus decay increased by 20 percent, burnout sensitivity heightened.

### Critical Debt
- Range: Below -5,000
- Status: Danger
- Visual: Pulsing Red capital display.
- Effects: Recovery efficiency reduced by 40 percent, focus decay increased by 50 percent, reputation decay, and a 15 percent penalty to Max Focus cap.

## Bankruptcy and Game Over
Debt alone does not end the game. However, if the player remains in Critical Debt for more than 14 consecutive in-game days, the system triggers a final Bankruptcy collapse.

## Implementation Details
- Store State: Tracks debtDays and debtSeverity.
- Payment Flow: Players can intentionally enter debt during the Monday Settlement modal to keep their business running.
- Recovery: Debt penalties are immediately lifted once Capital returns to a positive balance.
