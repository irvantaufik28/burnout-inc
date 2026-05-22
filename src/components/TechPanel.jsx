import { useGameStore } from '../store/useGameStore';

export const TechPanel = () => {
  const techStack = useGameStore((state) => state.techStack);
  const t = useGameStore((state) => state.t);

  return (
    <section className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl shadow-lg">
      <h2 className="text-zinc-500 text-xs font-bold uppercase mb-4 tracking-wider">{t('dashboard.techStack')}</h2>
      <div className="grid grid-cols-1 gap-3">
        {Object.entries(techStack || {}).map(([tech, level]) => (
          <div key={tech} className="space-y-1">
            <div className="flex justify-between text-[9px] uppercase tracking-widest text-zinc-500">
              <span className="font-bold">{tech}</span>
              <span className="text-zinc-400 font-mono">{"LV " + Math.floor(level)}</span>
            </div>
            <div className="h-0.5 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-zinc-500 transition-all duration-1000" 
                style={{ width: Math.min(100, level) + "%" }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
