import React from 'react';
import { useGameStore } from '../store/useGameStore';

export const ActionPanel = () => {
  const startTask = useGameStore((state) => state.startTask);
  const currentTask = useGameStore((state) => state.currentTask);
  const activeProduct = useGameStore((state) => state.activeProduct);
  const toggleModal = useGameStore((state) => state.toggleCreateModal);
  const launch = useGameStore((state) => state.launchProduct);
  const techStack = useGameStore((state) => state.techStack);

  const isLaunchReady = activeProduct && activeProduct.stats.progress >= 100;

  // Dynamic Freelance Contracts
  const freelanceContracts = [
    { 
      id: 'f1', 
      name: 'Frontend Landing Page', 
      req: { frontend: 0 },
      config: { type: 'freelance', name: 'Frontend Landing Page', duration: 6, energyCost: 15, reward: 150 }
    },
    { 
      id: 'f2', 
      name: 'Scalable API MVP', 
      req: { backend: 15 },
      config: { type: 'freelance', name: 'Backend API Dev', duration: 10, energyCost: 25, reward: 400 }
    },
    { 
      id: 'f3', 
      name: 'AI Agent Prototype', 
      req: { ai: 10, backend: 10 },
      config: { type: 'freelance', name: 'AI Engineering', duration: 8, energyCost: 20, reward: 350 }
    }
  ];

  return (
    <section className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl h-full">
      <h2 className="text-zinc-500 text-xs font-bold uppercase mb-4 tracking-wider">Commands</h2>
      <div className="grid grid-cols-1 gap-3">
        
        {!activeProduct ? (
          <button 
            onClick={() => toggleModal(true)}
            className="bg-emerald-900/20 border border-emerald-500/30 p-4 rounded-lg text-left hover:bg-emerald-900/30 transition-all group"
          >
            <div className="font-bold text-emerald-400 group-hover:text-emerald-300">New Product Blueprint</div>
            <div className="text-[10px] text-emerald-600 uppercase mt-1 tracking-tighter">Ideate and define market strategy</div>
          </button>
        ) : isLaunchReady ? (
          <button 
            onClick={launch}
            className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg text-left hover:bg-blue-900/30 transition-all group animate-pulse"
          >
            <div className="font-bold text-blue-400 group-hover:text-blue-300">Launch Product</div>
            <div className="text-[10px] text-blue-600 uppercase mt-1 tracking-tighter">Release to the public</div>
          </button>
        ) : (
          <button 
            onClick={() => startTask({ type: 'build', name: 'Develop: ' + activeProduct.name, duration: 4, energyCost: 15 })}
            disabled={!!currentTask}
            className={"bg-zinc-800 border border-zinc-700 p-4 rounded-lg text-left transition-all " + 
                       (!!currentTask ? "opacity-40 grayscale cursor-not-allowed" : "hover:bg-zinc-700 active:scale-95")}
          >
            <div className="font-bold text-zinc-100">Develop Features</div>
            <div className="text-[10px] text-zinc-500 uppercase mt-1">4h development cycle</div>
          </button>
        )}

        <div className="h-[1px] bg-zinc-800 my-2"></div>

        <div className="space-y-2">
          <p className="text-[9px] uppercase text-zinc-600 font-bold tracking-widest px-1">Available Gigs</p>
          {freelanceContracts.map(contract => {
            const meetsReq = Object.entries(contract.req).every(([key, val]) => techStack[key] >= val);
            return (
              <button 
                key={contract.id}
                onClick={() => startTask(contract.config)}
                disabled={!!currentTask || !meetsReq}
                className={"w-full bg-zinc-950 border border-zinc-800/80 p-3 rounded-lg text-left transition-all " + 
                           (!!currentTask || !meetsReq ? "opacity-40 grayscale cursor-not-allowed" : "hover:border-zinc-600 active:scale-[0.98]")}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-zinc-300 text-xs">{contract.name}</span>
                  <span className="text-[10px] font-mono text-emerald-500">{"$" + contract.config.reward}</span>
                </div>
                {!meetsReq && (
                  <div className="text-[9px] text-red-900 font-bold uppercase mt-1">
                    Requirements not met
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="h-[1px] bg-zinc-800 my-2"></div>

        <button 
          onClick={() => startTask({ type: 'rest', name: 'Deep Rest', duration: 6, energyCost: 0 })}
          disabled={!!currentTask}
          className={"bg-zinc-800 border border-zinc-700 p-4 rounded-lg text-left transition-all " + 
                     (!!currentTask ? "opacity-40 grayscale cursor-not-allowed" : "hover:bg-zinc-700 active:scale-95")}
        >
          <div className="font-bold text-zinc-100 text-sm">Deep Sleep</div>
          <div className="text-[10px] text-zinc-500 uppercase mt-1">6h recovery cycle</div>
        </button>

      </div>
    </section>
  );
};
