import { useGameStore } from '../store/useGameStore';
import { formatCurrency } from '../utils/currencyFormatter';

export const FreelanceProjectDetailModal = () => {
  const selected = useGameStore((state) => state.selectedContract);
  const clearSelected = useGameStore((state) => state.clearSelectedContract);
  const apply = useGameStore((state) => state.applyForContract);
  const getEfficiency = useGameStore((state) => state.getMatchEfficiency);
  const language = useGameStore((state) => state.language);
  const t = useGameStore((state) => state.t);

  if (!selected) return null;

  const efficiency = getEfficiency(selected);
  const matchPercent = Math.round(efficiency * 100);
  
  let matchStatus = t('eval.good');
  let matchColor = "text-yellow-500";
  
  if (matchPercent >= 90) {
    matchStatus = t('eval.perfect');
    matchColor = "text-emerald-500";
  } else if (matchPercent < 50) {
    matchStatus = t('eval.disaster');
    matchColor = "text-red-500";
  } else if (matchPercent < 70) {
    matchStatus = t('eval.risky');
    matchColor = "text-orange-500";
  }

  const riskColor = selected.risk === 'High' || selected.risk === 'Extreme' ? 'text-red-500' : 'text-zinc-400';

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-md flex items-center justify-center p-6 font-sans">
      <div className="bg-zinc-900 border-2 border-zinc-800 p-10 rounded-3xl max-w-2xl w-full shadow-2xl space-y-8 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-zinc-800 pb-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-zinc-100 tracking-tight">{selected.company}</h2>
            <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em]">{selected.client}</p>
          </div>
          <button onClick={clearSelected} className="text-zinc-600 hover:text-white transition-colors text-xl">✕</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Column: Brief & Requirements */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-[10px] uppercase text-zinc-500 font-black tracking-widest">{t('freelance.brief')}</h3>
              <p className="text-zinc-300 text-sm leading-relaxed italic">"{selected.description}"</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] uppercase text-zinc-500 font-black tracking-widest">{t('dashboard.requirements')}</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(selected.req || {}).map(([skill, val]) => (
                  <div key={skill} className="bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">{skill}</span>
                    <span className="text-xs font-mono text-zinc-100 font-bold">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1">
               <p className="text-[9px] uppercase text-zinc-600 font-bold tracking-tighter">{t('dashboard.match')}</p>
               <div className="flex justify-between items-end">
                  <span className={"text-xl font-black " + matchColor}>{matchPercent}%</span>
                  <span className={"text-[10px] font-bold uppercase " + matchColor}>{matchStatus}</span>
               </div>
            </div>
          </div>

          {/* Right Column: Reward & Risk */}
          <div className="space-y-6">
            <div className="space-y-4 bg-emerald-500/5 border border-emerald-500/20 p-5 rounded-2xl">
              <h3 className="text-[10px] uppercase text-emerald-500 font-black tracking-widest">{t('freelance.successReward')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[8px] uppercase text-zinc-500 font-bold">Capital</p>
                  <p className="text-xl font-mono text-emerald-400 font-bold">+{formatCurrency(selected.reward, language)}</p>
                </div>
                <div>
                  <p className="text-[8px] uppercase text-zinc-500 font-bold">Reputation</p>
                  <p className="text-xl font-mono text-emerald-400 font-bold">+{selected.repGain}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 bg-red-500/5 border border-red-500/20 p-5 rounded-2xl">
              <h3 className="text-[10px] uppercase text-red-500 font-black tracking-widest">{t('freelance.failureConsequence')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[8px] uppercase text-zinc-500 font-bold">{t('freelance.penalty')}</p>
                  <p className="text-lg font-mono text-red-400 font-bold">-{formatCurrency(selected.penalty, language)}</p>
                </div>
                <div>
                  <p className="text-[8px] uppercase text-zinc-500 font-bold">Loss</p>
                  <p className="text-lg font-mono text-red-400 font-bold">-{selected.repLoss}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center px-2">
               <div>
                  <p className="text-[8px] uppercase text-zinc-600 font-black tracking-widest">{t('common.risk')}</p>
                  <p className={"text-xs font-black uppercase " + riskColor}>{selected.risk}</p>
               </div>
               <div className="text-right">
                  <p className="text-[8px] uppercase text-zinc-600 font-black tracking-widest">{t('common.deadline')}</p>
                  <p className="text-xs font-mono text-zinc-300 font-bold">{selected.deadline}h</p>
               </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-6 grid grid-cols-2 gap-4 border-t border-zinc-800">
           <button 
             onClick={clearSelected}
             className="py-4 rounded-2xl font-black uppercase tracking-widest text-xs text-zinc-500 hover:text-zinc-100 transition-all border border-transparent hover:border-zinc-700"
           >
             {t('common.cancel')}
           </button>
           <button 
             onClick={() => apply(selected)}
             className="py-4 bg-zinc-100 hover:bg-white text-zinc-950 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 shadow-xl shadow-white/5"
           >
             {t('freelance.sendCV')}
           </button>
        </div>

        <div className="text-[9px] text-zinc-700 uppercase font-black tracking-[0.3em] text-center">
          Contract_Draft_0{selected.id.slice(-1)}_Valid_SECURE
        </div>
      </div>
    </div>
  );
};
