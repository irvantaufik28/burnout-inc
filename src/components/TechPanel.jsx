import { useGameStore } from '../store/useGameStore';

export const TechPanel = () => {
  const techStack = useGameStore((state) => state.techStack);
  const playerSkills = useGameStore((state) => state.player.skills);
  const getExpForLevel = useGameStore((state) => state.getExpForLevel);
  const t = useGameStore((state) => state.t);

  const SkillBar = ({ name, data, color = "bg-zinc-500" }) => {
    const nextExp = getExpForLevel(data.level);
    const progress = (data.exp / nextExp) * 100;
    
    return (
      <div className="space-y-1.5">
        <div className="flex justify-between items-end">
          <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">{name}</span>
          <span className="text-[10px] font-mono text-zinc-100 font-bold">LV {data.level}</span>
        </div>
        <div className="h-1.5 w-full bg-zinc-950 border border-zinc-800 rounded-full overflow-hidden">
          <div 
            className={"h-full transition-all duration-1000 " + color} 
            style={{ width: progress + "%" }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
        {/* Core Methodology */}
        <section className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl shadow-lg">
            <h2 className="text-zinc-600 text-[10px] font-black uppercase mb-4 tracking-[0.2em]">{t('dashboard.skills')}</h2>
            <div className="grid grid-cols-1 gap-4">
                {Object.entries(playerSkills).map(([skill, data]) => (
                    <SkillBar key={skill} name={skill} data={data} color="bg-blue-600/50" />
                ))}
            </div>
        </section>

        {/* Tech Stack */}
        <section className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl shadow-lg">
            <h2 className="text-zinc-600 text-[10px] font-black uppercase mb-4 tracking-[0.2em]">{t('dashboard.techStack')}</h2>
            <div className="grid grid-cols-1 gap-4">
                {Object.entries(techStack).map(([tech, data]) => (
                    <SkillBar key={tech} name={tech} data={data} color="bg-emerald-600/50" />
                ))}
            </div>
        </section>
    </div>
  );
};
