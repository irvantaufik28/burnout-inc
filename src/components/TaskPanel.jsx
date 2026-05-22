import { useGameStore } from '../store/useGameStore';

const StatBar = ({ label, value, color, pulse = false, suffix = "%" }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between text-[10px] uppercase tracking-tighter text-zinc-500 font-bold">
      <span>{label}</span>
      <span className={pulse ? "animate-pulse" : ""}>{Math.round(value) + suffix}</span>
    </div>
    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
      <div 
        className={"h-full transition-all duration-1000 " + color} 
        style={{ width: Math.min(100, value) + "%" }}
      ></div>
    </div>
  </div>
);

export const TaskPanel = () => {
  const currentTask = useGameStore((state) => state.currentTask);
  const activeContract = useGameStore((state) => state.activeContract);
  const player = useGameStore((state) => state.player);
  const getEfficiency = useGameStore((state) => state.getMatchEfficiency);
  const t = useGameStore((state) => state.t);

  if (!activeContract) {
    if (currentTask) {
       const progress = Math.round(((currentTask.duration - currentTask.remaining) / currentTask.duration) * 100);
       return (
        <section className="bg-zinc-900 border-2 border-emerald-900/30 p-6 rounded-2xl shadow-lg shadow-emerald-900/5 animate-pulse-slow">
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
        </section>
       );
    }
    return (
      <div className="bg-zinc-900/30 border border-zinc-800/50 border-dashed p-10 rounded-2xl flex flex-col items-center justify-center text-center">
        <p className="text-zinc-600 text-[10px] uppercase tracking-[0.2em] font-bold">{t('dashboard.executionIdle')}</p>
        <p className="text-zinc-800 text-[10px] mt-2 italic">{t('dashboard.idleDesc')}</p>
      </div>
    );
  }

  const deadlinePercentage = Math.round((activeContract.remaining / activeContract.deadline) * 100);
  const isCritical = deadlinePercentage < 20;
  const deadlineColor = deadlinePercentage > 50 ? "bg-emerald-500" : deadlinePercentage > 20 ? "bg-yellow-500" : "bg-red-500";
  const isExhausted = player.energy <= 0;
  
  const efficiency = Math.round(getEfficiency(activeContract) * 100);

  return (
    <section className={"bg-zinc-900 border-2 p-6 rounded-2xl shadow-xl transition-all " + (isCritical ? "border-red-900/40" : "border-zinc-800")}>
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <span className={"w-2 h-2 rounded-full " + (isExhausted ? "bg-red-500" : "bg-emerald-500 animate-pulse")}></span>
             <p className={"text-[10px] font-black uppercase tracking-[0.2em] " + (isExhausted ? "text-red-500" : "text-emerald-500")}>
                {isExhausted ? t('freelance.exhausted') : t('freelance.working')}
             </p>
          </div>
          <h2 className="text-xl font-black text-zinc-100 tracking-tight">{activeContract.title}</h2>
          <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-1 font-bold">{activeContract.client + " // RISK: " + activeContract.risk}</p>
        </div>
        <div className="text-right">
          <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-black">{t('freelance.efficiency')}</p>
          <p className={"text-xl font-mono font-bold " + (efficiency < 50 ? "text-red-500" : "text-zinc-200")}>{efficiency + "%"}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
        <StatBar label={t('common.progress')} value={activeContract.progress} color="bg-blue-600" />
        <StatBar label={t('common.deadline')} value={deadlinePercentage} color={deadlineColor} pulse={isCritical} />
      </div>

      <div className="pt-6 border-t border-zinc-800/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <StatBar label={t('common.energy')} value={player.energy} color="bg-blue-400" />
            <StatBar label={t('common.focus')} value={player.focus} color="bg-purple-500" />
        </div>
      </div>

      {isCritical && (
        <div className="mt-6 p-3 bg-red-950/20 border border-red-500/20 rounded-lg">
           <p className="text-red-500 text-[10px] uppercase font-black tracking-widest text-center animate-pulse">
             {t('freelance.deadlineCritical')}
           </p>
        </div>
      )}
    </section>
  );
};
