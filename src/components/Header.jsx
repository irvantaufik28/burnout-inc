import { useGameStore } from '../store/useGameStore';
import { getCalendarDate, formatCalendarDate, formatTime } from '../utils/calendarUtils';

export const Header = () => {
  const gameTime = useGameStore((state) => state.gameTime);
  const togglePause = useGameStore((state) => state.togglePause);
  const setSpeed = useGameStore((state) => state.setSpeed);
  const language = useGameStore((state) => state.language);
  const setLanguage = useGameStore((state) => state.setLanguage);
  const getSurvivalStatus = useGameStore((state) => state.getSurvivalStatus);
  const t = useGameStore((state) => state.t);

  const currentDate = getCalendarDate(gameTime.day, gameTime.hour);
  const status = getSurvivalStatus();

  const statusConfigs = {
    STABLE: { color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: '✅' },
    UNSTABLE: { color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', icon: '⚠️' },
    RISKY: { color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20', icon: '⚡️' },
    CRITICAL: { color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20', icon: '🚨', animate: 'animate-pulse' },
    DECEASED: { color: 'text-zinc-600', bg: 'bg-zinc-900', border: 'border-zinc-800', icon: '💀' }
  };

  const config = statusConfigs[status] || statusConfigs.STABLE;

  return (
    <header className="flex flex-col md:flex-row justify-between items-center bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-xl gap-6">
      <div className="flex items-center gap-6">
        <div>
            <h1 className="text-2xl font-black tracking-tighter text-zinc-100">{t('dashboard.title')}</h1>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{t('dashboard.subtitle')}</p>
        </div>

        {/* Overall Survival Status */}
        <div className={"flex items-center gap-2 px-4 py-2 rounded-xl border " + config.bg + " " + config.border + " " + (config.animate || "")}>
           <span className="text-sm">{config.icon}</span>
           <div>
              <p className="text-[7px] font-black text-zinc-500 uppercase tracking-widest">Survival Status</p>
              <p className={"text-[10px] font-black uppercase tracking-tighter " + config.color}>{status}</p>
           </div>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="text-right">
          <p className="text-[10px] uppercase font-black text-zinc-500 tracking-widest mb-1">
            {formatCalendarDate(currentDate, language)}
          </p>
          <div className="flex items-center justify-end gap-3">
             <p className="text-2xl font-mono font-bold text-zinc-100 tracking-tighter">
                {formatTime(gameTime.hour)}
             </p>
             <div className="bg-zinc-800 px-2 py-0.5 rounded text-[8px] font-black text-zinc-400 uppercase tracking-tighter">
                Day {gameTime.day}
             </div>
          </div>
        </div>

        <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-800">
          {[1, 2, 4].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={"px-3 py-1 rounded-lg text-[10px] font-bold transition-all " + 
                         (gameTime.speed === s ? "bg-zinc-100 text-zinc-950" : "text-zinc-500 hover:text-zinc-100")}
            >
              {s}x
            </button>
          ))}
          <button
            onClick={togglePause}
            className={"ml-2 px-3 py-1 rounded-lg text-[10px] font-bold border-l border-zinc-800 " + 
                       (gameTime.isPaused ? "text-emerald-500" : "text-zinc-500")}
          >
            {gameTime.isPaused ? t('common.resume') : t('common.pause')}
          </button>
        </div>

        <button
          onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
          className="bg-zinc-800 hover:bg-zinc-700 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter transition-all"
        >
          {language === 'en' ? 'ID' : 'EN'}
        </button>
      </div>
    </header>
  );
};
