import { useGameStore } from '../store/useGameStore';

const StatBar = ({ label, value, color }) => (
  <div>
    <div className="flex justify-between text-[10px] mb-1 uppercase tracking-wider text-zinc-500 font-bold">
      <span>{label}</span>
      <span>{Math.round(value) + "%"}</span>
    </div>
    <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
      <div 
        className={"h-full transition-all duration-1000 " + color} 
        style={{ width: value + "%" }}
      ></div>
    </div>
  </div>
);

export const StatPanel = () => {
  const player = useGameStore((state) => state.player);
  const portfolio = useGameStore((state) => state.portfolio);
  const t = useGameStore((state) => state.t);

  const getRepTier = (rep) => {
    if (rep >= 80) return 'Legendary Indie Hacker';
    if (rep >= 60) return 'Top Rated Expert';
    if (rep >= 40) return 'Reliable Freelancer';
    if (rep >= 20) return 'Junior Developer';
    return 'Unknown Freelancer';
  };

  return (
    <div className="space-y-6">
      {/* Freelancer Status */}
      <section className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl shadow-lg">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{t('dashboard.status')}</h2>
          <div className="text-right">
            <span className="text-[9px] bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-full font-bold uppercase tracking-tighter">
              {getRepTier(player.reputation)}
            </span>
          </div>
        </div>
        <div className="space-y-4">
          <StatBar label={t('common.energy')} value={player.energy} color="bg-blue-500" />
          <StatBar label={t('common.focus')} value={player.focus} color="bg-purple-500" />
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800/50">
            <div>
              <p className="text-[10px] uppercase text-zinc-600 tracking-widest font-black">{t('common.capital')}</p>
              <span className={"text-xl font-mono font-bold " + (player.money < 0 ? "text-red-500" : "text-emerald-400")}>
                {"$" + Math.floor(player.money).toLocaleString()}
              </span>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase text-zinc-600 tracking-widest font-black text-right">{t('common.reputation')}</p>
              <span className="text-xl font-mono font-bold text-zinc-100">{player.reputation}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio History */}
      <section className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl shadow-lg">
        <h2 className="text-zinc-500 text-xs font-bold uppercase mb-4 tracking-wider">{t('dashboard.portfolio')}</h2>
        <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 scrollbar-hide">
          {portfolio.length === 0 && <p className="text-zinc-700 text-[10px] uppercase text-center italic mt-4">{t('dashboard.resumeEmpty')}</p>}
          {portfolio.map((p, i) => (
            <div key={i} className="flex justify-between items-center border-b border-zinc-800 pb-2 last:border-0">
              <div className="min-w-0">
                <p className="text-xs font-bold text-zinc-200 truncate">{p.title}</p>
                <p className="text-[9px] text-zinc-500 uppercase">{p.client}</p>
              </div>
              <div className={"text-[10px] font-bold " + (p.result === 'success' ? "text-emerald-500" : "text-red-500")}>
                {p.result === 'success' ? "PAID" : "FAILED"}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
