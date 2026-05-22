import { useGameStore } from '../store/useGameStore';
import React from 'react';

const StatusOverlay = ({ message, onClear, t }) => (
  <div className="bg-zinc-950/80 border border-zinc-800 p-6 rounded-xl flex flex-col items-center justify-center text-center space-y-4">
    <p className="text-zinc-300 text-sm">{message}</p>
    {onClear && (
      <button onClick={onClear} className="text-[10px] text-zinc-500 hover:text-white uppercase font-bold tracking-widest">[ {t('common.dismiss')} ]</button>
    )}
  </div>
);

export const ActionPanel = () => {
  const startTask = useGameStore((state) => state.startTask);
  const currentTask = useGameStore((state) => state.currentTask);
  const techStack = useGameStore((state) => state.techStack);
  const availableContracts = useGameStore((state) => state.availableContracts);
  const activeContract = useGameStore((state) => state.activeContract);
  const pending = useGameStore((state) => state.pendingApplication);
  const refreshBoard = useGameStore((state) => state.refreshContractBoard);
  const apply = useGameStore((state) => state.applyForContract);
  const rejectPending = useGameStore((state) => state.rejectPending);
  const t = useGameStore((state) => state.t);

  // Initialize board if empty
  React.useEffect(() => {
    if (availableContracts.length === 0) refreshBoard();
  }, [availableContracts.length, refreshBoard]);

  return (
    <section className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{t('freelance.board')}</h2>
        {!activeContract && !pending && (
          <button onClick={refreshBoard} className="text-[10px] text-zinc-600 hover:text-zinc-300 uppercase font-bold tracking-tighter">[ {t('freelance.refresh')} ]</button>
        )}
      </div>

      <div className="flex-1 grid grid-cols-1 gap-3 relative">
        
        {/* State: Waiting for response */}
        {pending?.status === 'waiting' && (
          <StatusOverlay t={t} message={t('freelance.waiting').replace('{client}', pending.contract.client)} />
        )}

        {/* State: Rejected */}
        {pending?.status === 'rejected' && (
          <StatusOverlay t={t} message={t('freelance.rejected')} onClear={rejectPending} />
        )}

        {/* State: Interview */}
        {pending?.status === 'interview' && (
          <StatusOverlay t={t} message={t('freelance.interviewing')} />
        )}

        {/* State: Active Contract */}
        {activeContract && (
          <div className="bg-emerald-950/10 border border-emerald-500/20 p-5 rounded-xl space-y-4">
            <div>
              <p className="text-emerald-500 text-[9px] font-bold uppercase tracking-widest mb-1">{t('freelance.activeContract')}</p>
              <h3 className="text-zinc-100 font-bold">{activeContract.title}</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-zinc-600 text-[8px] uppercase font-bold">Client</p>
                <p className="text-zinc-400 text-xs truncate">{activeContract.client}</p>
              </div>
              <div>
                <p className="text-zinc-600 text-[8px] uppercase font-bold">Reward</p>
                <p className="text-emerald-500 text-xs font-mono">{"$" + activeContract.reward}</p>
              </div>
            </div>
            <button 
              onClick={() => startTask({ 
                type: 'freelance', 
                name: 'Working on ' + activeContract.title, 
                duration: 4, 
                energyCost: 15, 
                reward: activeContract.reward 
              })}
              disabled={Boolean(currentTask)}
              className={"w-full py-3 rounded-lg font-bold text-xs transition-all " + 
                         (currentTask ? "bg-zinc-800 text-zinc-600 cursor-not-allowed" : "bg-emerald-500 text-zinc-950 hover:bg-emerald-400 active:scale-95")}
            >
              {t('freelance.executeWork')}
            </button>
          </div>
        )}

        {/* State: Browsing Board */}
        {!activeContract && !pending && availableContracts.map((contract) => {
          const meetsReq = Object.entries(contract.req || {}).every(([key, val]) => (techStack?.[key] || 0) >= val);
          return (
            <button 
              key={contract.id}
              onClick={() => apply(contract)}
              disabled={!meetsReq}
              className={"w-full bg-zinc-950 border border-zinc-800/80 p-4 rounded-xl text-left transition-all " + 
                         (!meetsReq ? "opacity-40 grayscale cursor-not-allowed" : "hover:border-zinc-600 active:scale-[0.98]")}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-zinc-100 text-sm">{contract.title}</span>
                <span className="text-xs font-mono text-emerald-500">{"$" + contract.reward}</span>
              </div>
              <div className="flex gap-2 text-[9px] uppercase tracking-widest text-zinc-500 font-bold">
                <span>{contract.difficulty}</span>
                <span>•</span>
                <span>{contract.client}</span>
              </div>
              {!meetsReq && <div className="text-[9px] text-red-900 font-black uppercase mt-2 italic">{t('dashboard.reqNotMet')}</div>}
            </button>
          );
        })}

        <div className="mt-auto pt-4 border-t border-zinc-800/50">
          <button 
            onClick={() => startTask({ type: 'rest', name: 'Deep Sleep', duration: 6, energyCost: 0 })}
            disabled={Boolean(currentTask)}
            className={"w-full bg-zinc-800 border border-zinc-700 p-4 rounded-xl text-left transition-all " + 
                       (currentTask ? "opacity-40 grayscale cursor-not-allowed" : "hover:bg-zinc-700 active:scale-95")}
          >
            <div className="font-bold text-zinc-100 text-sm">{t('dashboard.systemRecovery')}</div>
            <div className="text-[10px] text-zinc-500 uppercase mt-1 tracking-tighter">{t('dashboard.restDesc')}</div>
          </button>
        </div>

      </div>
    </section>
  );
};
