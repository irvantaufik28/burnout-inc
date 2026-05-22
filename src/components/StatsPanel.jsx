import React from 'react';
import { useGameStore } from '../store/useGameStore';

export const StatsPanel = () => {
  const player = useGameStore((state) => state.player);
  const products = useGameStore((state) => state.products);
  const techStack = useGameStore((state) => state.techStack);

  const StatBar = ({ label, value, color }) => (
    <div>
      <div className="flex justify-between text-[10px] mb-1 uppercase tracking-wider text-zinc-500">
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

  return (
    <div className="space-y-6">
      {/* Founder Status */}
      <section className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">
        <h2 className="text-zinc-500 text-xs font-bold uppercase mb-4 tracking-wider">Founder Status</h2>
        <div className="space-y-4">
          <StatBar label="Energy" value={player.energy} color="bg-blue-500" />
          <StatBar label="Focus" value={player.focus} color="bg-purple-500" />
          
          <div className="pt-2">
            <p className="text-[10px] uppercase text-zinc-500 tracking-widest font-bold">Total Capital</p>
            <span className={"text-2xl font-mono font-bold " + (player.money < 0 ? "text-red-500" : "text-emerald-400")}>
              {"$" + Math.floor(player.money).toLocaleString()}
            </span>
          </div>
        </div>
      </section>

      {/* Tech Familiarity */}
      <section className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">
        <h2 className="text-zinc-500 text-xs font-bold uppercase mb-4 tracking-wider">Tech Familiarity</h2>
        <div className="grid grid-cols-1 gap-3">
          {Object.entries(techStack).map(([tech, level]) => (
            <div key={tech} className="space-y-1">
              <div className="flex justify-between text-[9px] uppercase tracking-widest text-zinc-500">
                <span>{tech}</span>
                <span className="text-zinc-300 font-mono">{"LV " + Math.floor(level)}</span>
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

      {/* Portfolio */}
      <section className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">
        <h2 className="text-zinc-500 text-xs font-bold uppercase mb-4 tracking-wider">Portfolio</h2>
        <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2 scrollbar-hide">
          {products.length === 0 && <p className="text-zinc-700 text-[10px] uppercase text-center italic">No active products</p>}
          {products.map((p, i) => (
            <div key={i} className="border-b border-zinc-800 pb-3 last:border-0">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-zinc-200 text-sm truncate max-w-[120px]">{p.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">{"$" + p.stats.revenue}</span>
              </div>
              <div className="flex justify-between text-[9px] text-zinc-600 uppercase tracking-widest">
                <span>{p.stats.users + " Users"}</span>
                <span>{p.launchResult}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
