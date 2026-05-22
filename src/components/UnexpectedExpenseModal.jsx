import { useGameStore } from '../store/useGameStore';
import { DEVICE_ISSUES } from '../data/deviceIssues';

export const UnexpectedExpenseModal = () => {
  const activeEvent = useGameStore((state) => state.activeUnexpectedExpense);
  const resolve = useGameStore((state) => state.resolveUnexpectedExpense);
  const language = useGameStore((state) => state.language);
  const fCurrency = useGameStore((state) => state.fCurrency);
  const t = useGameStore((state) => state.t);

  if (!activeEvent) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-zinc-950/95 backdrop-blur-2xl flex items-center justify-center p-6 font-sans">
      <div className="bg-zinc-900 border-2 border-zinc-800 p-10 rounded-[2.5rem] max-w-md w-full shadow-2xl space-y-8 animate-in fade-in zoom-in duration-300">
        
        <div className="text-center space-y-2">
           <div className="w-16 h-16 bg-orange-500/10 text-orange-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 border border-orange-500/20">💸</div>
           <h2 className="text-xl font-black text-zinc-100 tracking-tight">{activeEvent.title[language]}</h2>
           <p className="text-[10px] text-orange-500 uppercase tracking-widest font-bold animate-pulse">{t('unexpected.urgent')}</p>
        </div>

        <div className="bg-zinc-950/50 p-6 rounded-2xl border border-zinc-800/50 text-center">
           <p className="text-zinc-300 text-sm leading-relaxed italic">
             "{activeEvent.desc[language]}"
           </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
           {activeEvent.options.map((opt) => {
             const meta = activeEvent.type === 'device' ? DEVICE_ISSUES[activeEvent.id] : null;
             
             return (
                <button
                    key={opt.id}
                    onClick={() => resolve(opt.id)}
                    className="group relative flex flex-col items-start bg-zinc-950/50 hover:bg-zinc-800 border border-zinc-800 p-5 rounded-2xl transition-all active:scale-95"
                >
                    <div className="flex justify-between w-full mb-1">
                        <span className="text-zinc-100 text-sm font-bold">
                            {t('unexpected.' + activeEvent.id + '.' + opt.id)}
                        </span>
                        <span className="text-zinc-500 font-mono text-[10px]">
                            {opt.cost > 0 ? fCurrency(opt.cost) : "Free"}
                        </span>
                    </div>
                    
                    {/* DEV Hint */}
                    <div className="flex gap-1 mt-2">
                        {opt.isPending && meta && (
                            <span className="text-[7px] font-black bg-zinc-900 text-orange-500 px-1 py-0.5 rounded uppercase border border-orange-500/20">
                                PENDING_ISSUE // FOCUS_CAP:-{meta.baseFocusPenalty}%
                            </span>
                        )}
                        {Object.entries(opt.effect || {}).map(([key, val]) => (
                            <span key={key} className="text-[7px] font-black bg-zinc-900 text-zinc-600 px-1 py-0.5 rounded uppercase border border-zinc-800">
                                {key}:{val > 0 ? "+" : ""}{val}
                            </span>
                        ))}
                    </div>
                </button>
             );
           })}
        </div>

        <div className="text-[9px] text-zinc-700 uppercase font-black tracking-[0.3em] text-center pt-4">
          Life_Incident_Logged // Economic_Deduction
        </div>
      </div>
    </div>
  );
};
