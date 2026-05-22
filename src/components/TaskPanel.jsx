import { useGameStore } from '../store/useGameStore';

export const TaskPanel = () => {
  const currentTask = useGameStore((state) => state.currentTask);
  const t = useGameStore((state) => state.t);

  if (!currentTask) {
    return (
      <div className="bg-zinc-900/30 border border-zinc-800/50 border-dashed p-10 rounded-2xl flex flex-col items-center justify-center text-center">
        <p className="text-zinc-600 text-[10px] uppercase tracking-[0.2em] font-bold">{t('dashboard.executionIdle')}</p>
        <p className="text-zinc-800 text-[10px] mt-2 italic">{t('dashboard.idleDesc')}</p>
      </div>
    );
  }

  const progress = Math.round(((currentTask.duration - currentTask.remaining) / currentTask.duration) * 100);

  return (
    <section className="bg-zinc-900 border-2 border-emerald-900/30 p-6 rounded-2xl shadow-lg shadow-emerald-900/5 animate-pulse-slow">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest">{t('dashboard.activeProcess')}</h2>
          <p className="text-xl font-bold text-zinc-100 truncate max-w-[280px]">{currentTask.name}</p>
        </div>
        <div className="text-right">
          <p className="text-zinc-500 text-[10px] uppercase tracking-widest">{t('dashboard.remaining')}</p>
          <p className="text-xl font-mono text-zinc-300 font-bold">{currentTask.remaining + "h"}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
          <span>{t('dashboard.taskCompletion')}</span>
          <span className="text-emerald-500">{progress + "%"}</span>
        </div>
        <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 transition-all duration-1000" 
            style={{ width: progress + "%" }}
          ></div>
        </div>
      </div>
    </section>
  );
};
