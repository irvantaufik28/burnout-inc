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
  const availableContracts = useGameStore((state) => state.availableContracts);
  const activeContract = useGameStore((state) => state.activeContract);
  const pending = useGameStore((state) => state.pendingApplication);
  const refreshBoard = useGameStore((state) => state.refreshContractBoard);
  const selectContract = useGameStore((state) => state.selectContract);
  const rejectPending = useGameStore((state) => state.rejectPending);
  const getEfficiency = useGameStore((state) => state.getMatchEfficiency);
  const t = useGameStore((state) => state.t);

  React.useEffect(() => {
    if (availableContracts.length === 0) refreshBoard();
  }, [availableContracts.length, refreshBoard]);

  const recoveryActions = [
    { id: 'nap', name: t('actions.takeNap'), desc: t('actions.takeNapDesc'), config: { type: 'rest', name: t('actions.takeNap'), duration: 4, energyCost: 0 } },
    { id: 'coffee', name: t('actions.drinkCoffee'), desc: t('actions.drinkCoffeeDesc'), config: { type: 'coffee', name: t('actions.drinkCoffee'), duration: 0, energyCost: 0 } },
    { id: 'break', name: t('actions.takeBreak'), desc: t('actions.takeBreakDesc'), config: { type: 'rest', name: t('actions.takeBreak'), duration: 2, energyCost: 0 } },
  ];

  return (
    <section className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl h-full flex flex-col shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{t('freelance.board')}</h2>
        {!activeContract && !pending && (
          <button onClick={refreshBoard} className="text-[10px] text-zinc-600 hover:text-zinc-300 uppercase font-bold tracking-tighter">[ {t('freelance.refresh')} ]</button>
        )}
      </div>

      <div className="flex-1 grid grid-cols-1 gap-3 relative">
        {pending?.status === 'waiting' && <StatusOverlay t={t} message={t('freelance.reviewing')} />}
        {pending?.status === 'rejected' && <StatusOverlay t={t} message={t('freelance.rejected')} onClear={rejectPending} />}
        {pending?.status === 'interview' && <StatusOverlay t={t} message={t('freelance.interviewing')} />}

        {activeContract?.status === 'active' && (
          <div className="space-y-3">
            <p className="text-[9px] uppercase text-zinc-600 font-black tracking-widest px-1 italic opacity-50">Operational Protocol</p>
            {recoveryActions.map(action => (
              <button 
                key={action.id}
                onClick={() => startTask(action.config)}
                disabled={Boolean(currentTask)}
                className={"w-full bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-left transition-all " + 
                           (currentTask ? "opacity-40 grayscale cursor-not-allowed" : "hover:border-zinc-700 active:scale-[0.98]")}
              >
                <div className="font-bold text-zinc-100 text-sm">{action.name}</div>
                <div className="text-[10px] text-zinc-500 uppercase mt-1 tracking-tighter">{action.desc}</div>
              </button>
            ))}
          </div>
        )}

        {!activeContract && !pending && availableContracts.map((contract) => {
          const efficiency = getEfficiency(contract);
          const matchPercent = Math.round(efficiency * 100);
          const matchColor = matchPercent >= 90 ? "text-emerald-500" : matchPercent >= 70 ? "text-yellow-500" : "text-red-500";
          
          return (
            <button 
              key={contract.id}
              onClick={() => selectContract(contract)}
              className="w-full bg-zinc-950 border border-zinc-800/80 p-5 rounded-2xl text-left transition-all hover:border-zinc-600 active:scale-[0.98] group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-zinc-600 text-[8px] font-black uppercase">Click_To_Review</span>
              </div>
              
              <div className="flex justify-between items-start mb-1">
                <span className="font-black text-zinc-100 text-sm tracking-tight">{contract.company}</span>
                <span className="text-xs font-mono text-emerald-500 font-bold">{"$" + contract.reward}</span>
              </div>
              
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-4">
                {contract.req.ai ? 'AI System' : contract.req.backend ? 'API Server' : 'Web UI'}
              </p>

              <div className="flex justify-between items-center border-t border-zinc-900 pt-3">
                <div className="flex gap-2 text-[8px] uppercase tracking-[0.2em] text-zinc-600 font-black">
                  <span>{contract.difficulty}</span>
                  <span>•</span>
                  <span>{contract.client}</span>
                </div>
                <div className="text-right">
                  <span className={"text-[10px] font-black " + matchColor}>{matchPercent + "% Match"}</span>
                </div>
              </div>
            </button>
          );
        })}

        {!activeContract && !pending && (
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
        )}
      </div>
    </section>
  );
};
