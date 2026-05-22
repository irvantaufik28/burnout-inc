import { useGameStore } from '../store/useGameStore';
import { UpcomingBillsPanel } from './UpcomingBillsPanel';

export const StatPanel = () => {
  const player = useGameStore((state) => state.player);
  const debtSeverity = useGameStore((state) => state.debtSeverity);
  const fCurrency = useGameStore((state) => state.fCurrency);
  const getMaxFocus = useGameStore((state) => state.getMaxFocus);
  const getCareerTitle = useGameStore((state) => state.getCareerTitle);
  const getExpForLevel = useGameStore((state) => state.getExpForLevel);
  const t = useGameStore((state) => state.t);

  const getMoneyColor = () => {
    if (debtSeverity === 'critical') return 'text-red-500 animate-pulse';
    if (debtSeverity === 'medium') return 'text-orange-500';
    if (debtSeverity === 'small') return 'text-yellow-500';
    return 'text-zinc-100';
  };

  const careerTitle = getCareerTitle(player.careerLevel);
  const nextLevelExp = getExpForLevel(player.careerLevel);
  const expProgress = (player.careerExp / nextLevelExp) * 100;

  const stats = [
    { label: t('common.capital'), value: fCurrency(player.money), color: getMoneyColor(), icon: '💰' },
    { label: t('common.reputation'), value: player.reputation, color: 'text-blue-400', icon: '⭐️' },
  ];

  const maxFocus = getMaxFocus();

  const vitals = [
    { label: t('common.energy'), value: player.energy, max: 100, color: 'bg-emerald-500' },
    { label: t('common.focus'), value: player.focus, max: maxFocus, color: 'bg-blue-500' },
    { label: 'Mood', value: player.mood, max: 100, color: 'bg-zinc-100' },
  ];

  return (
    <div className="space-y-6">
      {/* Career Profile Card */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-[2rem] space-y-4 shadow-xl">
        <div className="flex justify-between items-start">
           <div>
              <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">Career Identity</p>
              <h2 className="text-xl font-black text-zinc-100 tracking-tight leading-tight">{careerTitle}</h2>
              <p className="text-[10px] font-mono text-emerald-500 mt-1 uppercase font-bold">Lvl {player.careerLevel}</p>
           </div>
           <div className="bg-zinc-800 p-2.5 rounded-2xl text-xl border border-zinc-700">🏆</div>
        </div>

        <div className="space-y-2 pt-2">
           <div className="flex justify-between items-end text-[8px] font-black uppercase tracking-tighter">
              <span className="text-zinc-500">Exp Progress</span>
              <span className="text-zinc-300 font-mono">{Math.floor(player.careerExp)} / {Math.floor(nextLevelExp)}</span>
           </div>
           <div className="h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
              <div 
                className="h-full bg-emerald-500 transition-all duration-1000 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                style={{ width: expProgress + '%' }}
              />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 p-5 rounded-3xl flex items-center justify-between group hover:border-zinc-700 transition-all">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{stat.label}</p>
              <p className={"text-xl font-black tracking-tight " + stat.color}>{stat.value}</p>
            </div>
            <div className="text-2xl opacity-30 group-hover:scale-110 group-hover:opacity-60 transition-all">{stat.icon}</div>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-[2rem] space-y-6">
        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">{t('dashboard.status')}</h3>
        <div className="space-y-4">
          {vitals.map((v, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between text-[9px] font-black uppercase tracking-tighter">
                <span className="text-zinc-400">{v.label}</span>
                <span className={v.max < 100 ? "text-orange-500" : "text-zinc-100"}>
                    {Math.round(v.value)} / {Math.round(v.max)}%
                </span>
              </div>
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden relative">
                <div 
                  className={"h-full transition-all duration-500 " + v.color}
                  style={{ width: v.value + '%' }}
                />
                {v.max < 100 && (
                    <div 
                        className="absolute top-0 right-0 h-full bg-zinc-950/80 border-l border-orange-500/50"
                        style={{ width: (100 - v.max) + '%' }}
                    />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <UpcomingBillsPanel />
    </div>
  );
};
