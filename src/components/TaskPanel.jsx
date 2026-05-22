import React from 'react';
import { useGameStore } from '../store/useGameStore';

export const TaskPanel = () => {
  const currentTask = useGameStore((state) => state.currentTask);
  const activeProduct = useGameStore((state) => state.activeProduct);

  if (currentTask) {
    const progress = Math.round(((currentTask.duration - currentTask.remaining) / currentTask.duration) * 100);
    return (
      <section className="bg-zinc-900 border-2 border-emerald-900/30 p-5 rounded-xl shadow-lg shadow-emerald-900/5 animate-pulse-slow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest">Active Process</h2>
            <p className="text-lg font-bold text-zinc-100 truncate max-w-[200px]">{currentTask.name}</p>
          </div>
          <div className="text-right">
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest">Remaining</p>
            <p className="text-lg font-mono text-zinc-300">{currentTask.remaining + "h"}</p>
          </div>
        </div>
        <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: progress + "%" }}></div>
        </div>
      </section>
    );
  }

  if (activeProduct) {
    return (
      <section className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Current Project</h2>
            <p className="text-lg font-bold text-zinc-100">{activeProduct.name}</p>
          </div>
          <div className="text-right">
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest">Blueprint</p>
            <p className="text-[10px] text-zinc-400 uppercase tracking-tighter">{activeProduct.type + " • " + activeProduct.market}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-[10px] uppercase text-zinc-500 mb-1">
              <span>Ready for Launch</span>
              <span>{Math.round(activeProduct.stats.progress) + "%"}</span>
            </div>
            <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: activeProduct.stats.progress + "%" }}></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] uppercase text-zinc-500 tracking-widest">Quality</p>
              <p className="text-lg font-mono font-bold text-zinc-200">{Math.round(activeProduct.stats.quality)}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-zinc-500 tracking-widest text-right text-red-500/80">Bugs</p>
              <p className="text-lg font-mono font-bold text-red-400 text-right">{activeProduct.stats.bugs}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-zinc-900/30 border border-zinc-800/50 border-dashed p-10 rounded-xl flex flex-col items-center justify-center text-center">
      <p className="text-zinc-600 text-[10px] uppercase tracking-[0.2em] font-bold">System Available</p>
      <p className="text-zinc-800 text-[10px] mt-2 italic">Idle founder detected. Initialize new blueprint to proceed.</p>
    </div>
  );
};
