import { useGameStore } from '../store/useGameStore';

export const PaymentModal = () => {
  const show = useGameStore((state) => state.activePaymentModal);
  const pendingBills = useGameStore((state) => state.pendingBills);
  const payBills = useGameStore((state) => state.payBills);
  const money = useGameStore((state) => state.player.money);
  const fCurrency = useGameStore((state) => state.fCurrency);
  const t = useGameStore((state) => state.t);

  if (!show) return null;

  const total = Object.values(pendingBills).reduce((a, b) => a + b, 0);
  const canPayFull = money >= total;
  const balanceAfter = money - total;

  return (
    <div className="fixed inset-0 z-[130] bg-zinc-950/95 backdrop-blur-2xl flex items-center justify-center p-6 font-sans">
      <div className="bg-zinc-900 border-2 border-zinc-800 p-10 rounded-[2.5rem] max-w-md w-full shadow-2xl space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-500">
        
        <div className="text-center space-y-2">
           <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 border border-zinc-700">🏢</div>
           <h2 className="text-xl font-black text-zinc-100 tracking-tight">{t('bills.title')}</h2>
           <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Monday 00:00 // Weekly_Settlement</p>
        </div>

        <div className="space-y-3 bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800/50">
           {Object.entries(pendingBills).map(([key, amount]) => (
             <div key={key} className="flex justify-between items-center text-xs text-zinc-400">
                <span className="uppercase tracking-widest font-bold text-[9px]">{t('bills.' + key)}</span>
                <span className="font-mono">{fCurrency(amount)}</span>
             </div>
           ))}
           <div className="pt-4 border-t border-zinc-800 flex justify-between items-end">
              <span className="text-[9px] font-black uppercase text-zinc-500 tracking-widest">{t('common.total')}</span>
              <span className="text-2xl font-black text-zinc-100 tracking-tighter">{fCurrency(total)}</span>
           </div>
        </div>

        <div className="space-y-4">
           <div className="flex justify-between items-center px-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{t('bills.balance')}</span>
              <span className={"font-mono text-sm font-bold " + (canPayFull ? "text-zinc-300" : "text-red-500")}>{fCurrency(money)}</span>
           </div>
           
           {!canPayFull && (
             <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                    <p className="text-[9px] text-red-500 font-black uppercase tracking-widest">
                        {t('bills.debtWarning')}
                    </p>
                    <p className="text-[10px] font-mono text-red-500 font-bold">{fCurrency(balanceAfter)}</p>
                </div>
                <p className="text-[10px] text-red-400/80 leading-relaxed">
                    {t('bills.debtConsequences')}
                </p>
             </div>
           )}

           <button 
             onClick={payBills}
             className={"w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all active:scale-95 shadow-xl " + 
                        (canPayFull ? "bg-zinc-100 text-zinc-950 hover:bg-white" : "bg-red-600 text-white hover:bg-red-500 shadow-red-500/10")}
           >
             {canPayFull ? t('common.pay') : t('bills.acceptDebt')}
           </button>
        </div>

        <div className="text-[9px] text-zinc-700 uppercase font-black tracking-[0.3em] text-center">
          Burnout_Economic_Audit_Log
        </div>
      </div>
    </div>
  );
};
