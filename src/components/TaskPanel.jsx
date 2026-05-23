import { useGameStore } from '../store/useGameStore';
import { PROJECT_CONDITIONS } from '../data/projectConditions';

const StatBar = ({ label, value, color, pulse = false, suffix = "%", max = 100 }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between text-[10px] uppercase tracking-tighter text-zinc-500 font-bold">
      <span>{label}</span>
      <span className={pulse ? "animate-pulse" : ""}>{Math.round(value) + suffix}</span>
    </div>
    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden relative">
      <div 
        className={"h-full transition-all duration-1000 " + color} 
        style={{ width: Math.min(100, (value / max) * 100) + "%" }}
      ></div>
    </div>
  </div>
);

export const TaskPanel = () => {
  const currentTask = useGameStore((state) => state.currentTask);
  const activeContract = useGameStore((state) => state.activeContract);
  const player = useGameStore((state) => state.player);
  const conditionTimers = useGameStore((state) => state.conditionTimers);
  const activeEffects = useGameStore((state) => state.activeEffects);
  const getEfficiency = useGameStore((state) => state.getMatchEfficiency);
  const startTask = useGameStore((state) => state.startTask);
  const cooldowns = useGameStore((state) => state.stimulantCooldowns);
  const t = useGameStore((state) => state.t);

  const recoveryActions = [
    { id: 'rest', name: t('actions.takeNap'), desc: t('actions.takeNapDesc'), type: 'rest', duration: 4, energyCost: 0, cost: 0, icon: '🛌' },
    { id: 'break', name: t('actions.takeBreak'), desc: t('actions.takeBreakDesc'), type: 'rest', duration: 2, energyCost: 0, cost: 0, icon: '🧘' },
  ];

  if (!activeContract) {
    if (currentTask) {
       const progress = Math.round(((currentTask.duration - currentTask.remaining) / currentTask.duration) * 100);
       return (
        <section className="bg-zinc-900 border-2 border-emerald-900/30 p-6 rounded-[2rem] shadow-lg shadow-emerald-900/5 animate-pulse-slow">
            <div className="flex justify-between items-start mb-6">
            <div>
                <h2 className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest mb-1">{t('dashboard.activeProcess')}</h2>
                <p className="text-xl font-bold text-zinc-100 truncate max-w-[280px]">{currentTask.name}</p>
            </div>
            <div className="text-right">
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest">{t('dashboard.remaining')}</p>
                <p className="text-xl font-mono text-zinc-300 font-bold">{currentTask.remaining + "h"}</p>
            </div>
            </div>
            <StatBar label={t('dashboard.taskCompletion')} value={progress} color="bg-emerald-500" />
            <div className="mt-6 flex flex-wrap gap-2">
                {activeEffects.map(eff => {
                    const cond = PROJECT_CONDITIONS[eff.id];
                    return (
                        <div key={eff.id} className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-full">
                            <span className="text-xs">{cond?.icon}</span>
                            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">{t('condition.' + eff.id)}</span>
                            <span className="text-[8px] font-mono text-zinc-600 font-bold ml-1">{eff.remaining}h</span>
                        </div>
                    );
                })}
            </div>
        </section>
       );
    }
    return (
      <div className="bg-zinc-900/50 border border-zinc-800 p-10 rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-8">
        <div className="space-y-2">
            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] font-black">{t('dashboard.executionIdle')}</p>
            <p className="text-zinc-600 text-xs italic">{t('dashboard.idleDesc')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
            {recoveryActions.map(act => (
                <button
                    key={act.id}
                    onClick={() => startTask(act)}
                    className="flex flex-col items-center gap-3 p-6 bg-zinc-900 border border-zinc-800 rounded-3xl hover:border-emerald-500/50 transition-all group active:scale-95"
                >
                    <span className="text-3xl group-hover:scale-110 transition-transform">{act.icon}</span>
                    <div>
                        <p className="text-xs font-bold text-zinc-100">{act.name}</p>
                        <p className="text-[8px] text-zinc-500 uppercase font-black tracking-widest mt-1">{act.duration}h duration</p>
                    </div>
                </button>
            ))}
        </div>

        <div className="text-[8px] text-zinc-800 uppercase font-black tracking-[0.3em]">
            SYSTEM_WAITING_FOR_INPUT
        </div>
      </div>
    );
  }

  const deadlinePercentage = Math.round((activeContract.remaining / activeContract.deadline) * 100);
  const isCritical = deadlinePercentage < 20;
  const deadlineColor = deadlinePercentage > 50 ? "bg-emerald-500" : deadlinePercentage > 20 ? "bg-yellow-500" : "bg-red-500";
  const isExhausted = player.energy <= 0;
  const isFailing = activeContract.progress < 100 && activeContract.remaining <= 12 && activeContract.progress < 80;
  
  const efficiency = Math.round(getEfficiency(activeContract) * 100);

  return (
    <section className={"bg-zinc-900 border-2 p-8 rounded-[2.5rem] shadow-2xl transition-all duration-500 " + (isCritical || isFailing ? "border-red-900/40" : "border-zinc-800")}>
      
      {currentTask && (
        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl animate-pulse-slow">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">{currentTask.icon}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">{currentTask.name}</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 font-bold">{currentTask.remaining}h left</span>
          </div>
          <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
             <div 
               className="h-full bg-emerald-500" 
               style={{ width: ((currentTask.duration - currentTask.remaining) / currentTask.duration) * 100 + '%' }}
             />
          </div>
        </div>
      )}
      <div className="flex justify-between items-start mb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className={"w-2 h-2 rounded-full " + (isExhausted ? "bg-red-500" : "bg-emerald-500 animate-pulse")}></div>
             <p className={"text-[10px] font-black uppercase tracking-[0.3em] " + (isExhausted ? "text-red-500" : "text-emerald-500")}>
                {isExhausted ? t('freelance.exhausted') : t('freelance.working')}
             </p>
          </div>
          <h2 className="text-2xl font-black text-zinc-100 tracking-tighter leading-none">{activeContract.title}</h2>
          <div className="flex gap-2 items-center">
              <span className="bg-zinc-800 text-zinc-500 text-[8px] font-black px-2 py-0.5 rounded uppercase">{activeContract.client}</span>
              <span className={"text-[8px] font-black px-2 py-0.5 rounded uppercase " + (activeContract.risk === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-zinc-800 text-zinc-400')}>Risk: {activeContract.risk}</span>
          </div>
        </div>
        <div className="text-right space-y-1">
          <p className="text-zinc-600 text-[10px] uppercase tracking-widest font-black">{t('freelance.efficiency')}</p>
          <p className={"text-3xl font-mono font-black tracking-tighter " + (efficiency < 40 ? "text-red-500" : "text-zinc-100")}>{efficiency + "%"}</p>
        </div>
      </div>

      {(activeContract.conditions?.length > 0 || activeEffects.length > 0) && (
        <div className="mb-8 flex flex-wrap gap-2">
           {[...(activeContract.conditions || []), ...activeEffects.map(e => e.id)].map(cId => {
               const cond = PROJECT_CONDITIONS[cId];
               const eff = activeEffects.find(e => e.id === cId);
               const remaining = eff ? eff.remaining : conditionTimers[cId];
               const total = eff ? eff.total : (cond?.duration || 1);
               return (
                 <div key={cId} className="flex flex-col bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-xl animate-in slide-in-from-left duration-300 min-w-[120px]">
                    <div className="flex items-center gap-2">
                      <span className="text-xs">{cond?.icon}</span>
                      <span className={"text-[9px] font-black uppercase tracking-tighter " + cond?.color}>{t('condition.' + cId)}</span>
                    </div>
                    {remaining && (
                      <div className="mt-1.5 flex justify-between items-center">
                         <div className="h-0.5 flex-1 bg-zinc-900 rounded-full overflow-hidden mr-2">
                            <div className={"h-full " + cond?.color} style={{ width: (remaining / total) * 100 + "%" }}></div>
                         </div>
                         <span className="text-[8px] text-zinc-600 font-mono font-bold">{remaining}h</span>
                      </div>
                    )}
                 </div>
               )
             })}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-8">
        <StatBar label={t('common.progress')} value={activeContract.progress} color="bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.2)]" />
        <StatBar label={t('common.deadline')} value={activeContract.remaining} max={activeContract.deadline} color={deadlineColor} pulse={isCritical} suffix="h" />
      </div>

      <div className="pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
            <StatBar label={t('common.energy')} value={player.energy} color="bg-emerald-500" />
        </div>
        <div className="flex-1">
            <StatBar label={t('common.focus')} value={player.focus} color="bg-blue-500" />
        </div>
      </div>

      {(isCritical || isFailing) && (
        <div className="mt-8 p-4 bg-red-950/20 border border-red-500/20 rounded-2xl">
           <p className="text-red-500 text-[9px] uppercase font-black tracking-widest text-center animate-pulse">
             {isFailing ? "ESTIMATED PROJECT FAILURE RISK: HIGH" : t('freelance.deadlineCritical')}
           </p>
        </div>
      )}
    </section>
  );
};
