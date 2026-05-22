import { useGameStore } from '../store/useGameStore';

export const LevelUpModal = () => {
  const queue = useGameStore((state) => state.levelUpQueue);
  const dismiss = useGameStore((state) => state.dismissLevelUp);
  const t = useGameStore((state) => state.t);

  if (queue.length === 0) return null;

  const current = queue[0];
  const isCareer = current.type === 'career';

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-950/95 backdrop-blur-xl flex items-center justify-center p-6 font-sans">
      <div className="bg-zinc-900 border-2 border-emerald-500/30 p-10 rounded-[3rem] max-w-md w-full shadow-[0_0_100px_rgba(16,185,129,0.1)] text-center space-y-8 animate-in zoom-in duration-300">
        
        {/* Celebration Icon */}
        <div className="relative">
          <div className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-4xl mx-auto animate-bounce">
            {isCareer ? '🏆' : '⚡'}
          </div>
          <div className="absolute inset-0 bg-emerald-500 blur-[40px] opacity-20 rounded-full"></div>
        </div>

        <div className="space-y-2">
          <h2 className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">
            {isCareer ? t('career.promotion') : t('career.skillUp')}
          </h2>
          <h1 className="text-3xl font-black text-zinc-100 tracking-tighter uppercase">
            {isCareer ? current.title : current.name}
          </h1>
          <p className="text-emerald-500 font-mono text-xl font-bold tracking-widest">
            LEVEL {current.level}
          </p>
        </div>

        <div className="pt-4">
           <p className="text-zinc-400 text-sm leading-relaxed max-w-[280px] mx-auto italic">
             {isCareer ? t('career.promotionDesc') : t('career.skillUpDesc')}
           </p>
        </div>

        <button 
          onClick={dismiss}
          className="w-full bg-zinc-100 hover:bg-white text-zinc-950 py-5 rounded-3xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 shadow-xl shadow-white/5"
        >
          {t('common.resume')}
        </button>

        <div className="text-[9px] text-zinc-700 uppercase font-black tracking-[0.3em]">
          Burnout_Career_Registry_Verified
        </div>
      </div>
    </div>
  );
};
