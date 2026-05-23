import { useGameStore } from '../store/useGameStore';
import { DEVICE_ISSUES } from '../data/deviceIssues';

export const PendingMaintenancePanel = () => {
  const deviceIssues = useGameStore((state) => state.deviceIssues);
  const repair = useGameStore((state) => state.repairDevice);
  const money = useGameStore((state) => state.player.money);
  const fCurrency = useGameStore((state) => state.fCurrency);
  const language = useGameStore((state) => state.language);
  const t = useGameStore((state) => state.t);

  if (deviceIssues.length === 0) return null;

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-[2rem] space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em]">{t('maintenance.title')}</h3>
        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
      </div>

      <div className="space-y-4">
        {deviceIssues.map((issue) => {
          const meta = DEVICE_ISSUES[issue.id];
          const canAfford = money >= meta.repairCost;

          return (
            <div key={issue.id} className="bg-zinc-950/50 border border-zinc-800 p-4 rounded-2xl space-y-3 group hover:border-orange-500/30 transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-zinc-100">{meta.name[language]}</p>
                  <p className="text-[9px] text-orange-500 font-black uppercase tracking-tighter mt-0.5">
                    {t('maintenance.focusCap')}: -{issue.penalty}%
                  </p>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">{fCurrency(meta.repairCost)}</span>
              </div>

              <button
                onClick={() => repair(issue.id)}
                disabled={!canAfford}
                className={"w-full py-2.5 rounded-xl font-black uppercase tracking-widest text-[9px] transition-all active:scale-95 " + 
                           (canAfford ? "bg-zinc-100 text-zinc-950 hover:bg-white" : "bg-zinc-800 text-zinc-600 cursor-not-allowed")}
              >
                {canAfford ? t('maintenance.repairNow') : t('maintenance.insufficientFunds')}
              </button>
            </div>
          );
        })}
      </div>

      <div className="bg-orange-500/5 p-3 rounded-2xl border border-orange-500/10">
         <p className="text-[8px] leading-relaxed text-orange-500/80 text-center uppercase font-black tracking-widest italic">
            {t('maintenance.restricted')}
         </p>
      </div>
    </div>
  );
};
