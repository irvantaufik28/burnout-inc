import { useGameStore } from '../store/useGameStore';
import { FreelanceBoard } from './FreelanceBoard';
import { PendingMaintenancePanel } from './PendingMaintenancePanel';

export const ActionPanel = () => {
  const t = useGameStore((state) => state.t);
  const startTask = useGameStore((state) => state.startTask);
  const currentTask = useGameStore((state) => state.currentTask);
  const cooldowns = useGameStore((state) => state.stimulantCooldowns);
  const getStimulantStats = useGameStore((state) => state.getStimulantStats);

  const actions = [
    { id: 'rest', name: t('actions.takeNap'), desc: t('actions.takeNapDesc'), type: 'rest', duration: 4, energyCost: 0, cost: 0, icon: '🛌' },
    { id: 'break', name: t('actions.takeBreak'), desc: t('actions.takeBreakDesc'), type: 'rest', duration: 2, energyCost: 0, cost: 0, icon: '🧘' },
    { id: 'coffee', name: t('actions.drinkCoffee'), desc: t('actions.drinkCoffeeDesc'), type: 'coffee', duration: 1, energyCost: 0, cost: 5, icon: '☕️', cooldown: 4 },
    { id: 'smoke', name: t('actions.smoke'), desc: t('actions.smokeDesc'), type: 'smoke', duration: 1, energyCost: 0, cost: 2, icon: '🚬', cooldown: 6 },
    { id: 'energyDrink', name: t('actions.energyDrink'), desc: t('actions.energyDrinkDesc'), type: 'energyDrink', duration: 1, energyCost: 0, cost: 8, icon: '⚡️', cooldown: 12 },
  ];

  return (
    <div className="space-y-6">
      <FreelanceBoard />
      <PendingMaintenancePanel />

      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-[2rem] space-y-6">
        <h3 className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em]">{t('dashboard.operationalProtocol')}</h3>
        
        <div className="space-y-3">
          {actions.map((act) => {
            const isStimulant = ['coffee', 'smoke', 'energyDrink'].includes(act.type);
            const stats = isStimulant ? getStimulantStats(act.type) : null;
            const isOnCooldown = cooldowns[act.type] > 0;

            return (
              <button
                key={act.id}
                disabled={currentTask !== null || isOnCooldown}
                onClick={() => startTask(act)}
                className={"w-full text-left p-5 rounded-2xl border transition-all flex items-center justify-between group relative overflow-hidden " + 
                           (currentTask || isOnCooldown ? "bg-zinc-900/30 border-zinc-800/50 opacity-40" : "bg-zinc-950/50 border-zinc-800 hover:border-zinc-600 active:scale-95")}
              >
                <div className="space-y-1 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{act.icon}</span>
                    <p className="text-xs font-bold text-zinc-100">{act.name}</p>
                    {isStimulant && (
                        <span className="text-[8px] font-black text-zinc-500 uppercase px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                            Eff: {Math.round(stats.efficiency * 100)}%
                        </span>
                    )}
                  </div>
                  <p className="text-[9px] text-zinc-500 font-medium">{act.desc}</p>
                </div>
                
                {isOnCooldown && (
                    <div className="text-[9px] font-black text-orange-500 uppercase tracking-widest">
                        CD {cooldowns[act.type]}h
                    </div>
                )}
                
                {!currentTask && !isOnCooldown && (
                  <span className="text-[8px] font-black text-zinc-700 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">EXECUTE</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
