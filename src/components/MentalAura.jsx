import { useGameStore } from '../store/useGameStore';

export const MentalAura = () => {
  const player = useGameStore((state) => state.player);
  const activeContract = useGameStore((state) => state.activeContract);
  
  if (!activeContract) return null;

  const energy = player.energy;
  const stimulantFatigue = (activeContract.conditions || []).filter(c => 
    ['overstimulated', 'anxiety', 'focus_instability'].includes(c)
  ).length;

  // Effects logic
  const isExhausted = energy < 20;
  const isCritical = energy <= 0;
  const isWired = stimulantFatigue > 0;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Exhaustion Pulse */}
      {isExhausted && (
        <div className={"absolute inset-0 bg-red-950/5 transition-opacity duration-1000 " + (isCritical ? "animate-pulse" : "opacity-40")}></div>
      )}

      {/* Wired / Overstimulated Flicker */}
      {isWired && (
        <div className="absolute inset-0 bg-yellow-500/5 animate-pulse [animation-duration:0.1s] opacity-20"></div>
      )}

      {/* Visual Vignette for low energy */}
      <div 
        className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.5)] transition-all duration-1000"
        style={{ opacity: 1 - (energy / 100) }}
      ></div>
    </div>
  );
};
