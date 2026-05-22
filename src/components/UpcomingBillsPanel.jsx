import { useGameStore } from '../store/useGameStore';

export const UpcomingBillsPanel = () => {
  const pendingBills = useGameStore((state) => state.pendingBills);
  const nextBillDay = useGameStore((state) => state.nextBillDay);
  const day = useGameStore((state) => state.gameTime.day);
  const hour = useGameStore((state) => state.gameTime.hour);
  const fCurrency = useGameStore((state) => state.fCurrency);
  const t = useGameStore((state) => state.t);

  const daysRemaining = nextBillDay - day;
  const total = Object.values(pendingBills).reduce((a, b) => a + b, 0);

  if (total === 0) return null;

  const isDueTonight = daysRemaining === 1 && hour >= 18;
  const isUrgent = daysRemaining <= 1;

  return (
    <div className={"bg-zinc-900/50 border p-6 rounded-3xl space-y-6 transition-all duration-500 " + 
                    (isUrgent ? "border-orange-500/50 shadow-lg shadow-orange-500/5" : "border-zinc-800")}>
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
            {t('dashboard.upcomingBills')}
          </h3>
          <p className={"text-xs font-bold " + (isUrgent ? "text-orange-500" : "text-zinc-400")}>
            {isDueTonight ? t('dashboard.dueTonight') : (daysRemaining === 0 ? t('dashboard.dueToday') : t('dashboard.dueIn').replace('{days}', daysRemaining))}
          </p>
        </div>
        <div className={"p-2 rounded-xl text-lg " + (isUrgent ? "bg-orange-500/10" : "bg-zinc-800")}>
            {isUrgent ? "⚡️" : "📅"}
        </div>
      </div>

      <div className="space-y-2">
        {Object.entries(pendingBills).map(([key, amount]) => (
          <div key={key} className="flex justify-between items-center text-[10px] font-medium text-zinc-500">
            <span className="uppercase tracking-tighter">{t('bills.' + key)}</span>
            <span className="font-mono text-zinc-300">{fCurrency(amount)}</span>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-zinc-800 flex justify-between items-end">
        <span className="text-[9px] font-black uppercase text-zinc-600 tracking-tighter">{t('common.total')}</span>
        <span className="text-xl font-black text-zinc-100 tracking-tighter">
          {fCurrency(total)}
        </span>
      </div>

      <div className={"p-3 rounded-2xl border transition-all " + (isUrgent ? "bg-orange-500/5 border-orange-500/20" : "bg-zinc-950/50 border-zinc-800/50")}>
         <p className={"text-[8px] leading-relaxed text-center uppercase font-black tracking-widest italic " + (isUrgent ? "text-orange-500 animate-pulse" : "text-zinc-500")}>
            {isUrgent ? "PAYMENT_REQUIRED_SOON" : "SYSTEM_READY_FOR_MONDAY"}
         </p>
      </div>
    </div>
  );
};
