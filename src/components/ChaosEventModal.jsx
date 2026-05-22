import { useGameStore } from '../store/useGameStore';

export const ChaosEventModal = () => {
  const activeEvent = useGameStore((state) => state.activeChaosEvent);
  const resolve = useGameStore((state) => state.resolveChaosEvent);
  const t = useGameStore((state) => state.t);

  if (!activeEvent) return null;

  const eventKey = 'chaos.' + activeEvent.id;

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-md flex items-center justify-center p-6 font-sans">
      <div className="bg-zinc-900 border-2 border-red-900/30 p-10 rounded-3xl max-w-lg w-full shadow-2xl space-y-8 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-zinc-800 pb-6">
          <div className="w-12 h-12 bg-red-950/20 border border-red-500/30 rounded-full flex items-center justify-center text-xl">⚠️</div>
          <div>
            <h2 className="text-xl font-bold text-zinc-100">{t(eventKey + '.title')}</h2>
            <p className="text-red-500 text-[10px] font-black uppercase tracking-[0.2em]">{t('chaos.urgent')}</p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <p className="text-zinc-300 text-sm leading-relaxed">
            {t(eventKey + '.desc')}
          </p>

          <div className="grid grid-cols-1 gap-3">
            {activeEvent.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => resolve(opt.id)}
                className="bg-zinc-950/50 hover:bg-zinc-800 border border-zinc-800 p-5 rounded-2xl text-left text-sm transition-all active:scale-95 group flex items-center justify-between"
              >
                <span className="text-zinc-400 group-hover:text-zinc-100">
                  {t(eventKey + '.options.' + opt.id)}
                </span>
                <span className="text-zinc-800 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">{t('common.select')}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6 text-[9px] text-zinc-600 uppercase font-black tracking-widest text-center border-t border-zinc-800">
          Burnout_Protocol_INCIDENT_REPORT
        </div>
      </div>
    </div>
  );
};
