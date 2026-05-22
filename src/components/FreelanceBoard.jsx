import { useGameStore } from '../store/useGameStore';

export const FreelanceBoard = () => {
  const contracts = useGameStore((state) => state.availableContracts);
  const activeContract = useGameStore((state) => state.activeContract);
  const pendingApplication = useGameStore((state) => state.pendingApplication);
  const selectContract = useGameStore((state) => state.selectContract);
  const t = useGameStore((state) => state.t);

  const isBusy = activeContract || pendingApplication;

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-[2rem] space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em]">{t('freelance.board')}</h3>
        {isBusy && (
           <span className="text-[8px] font-black text-zinc-600 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800 uppercase tracking-widest">
             System Busy
           </span>
        )}
      </div>

      <div className="space-y-3">
        {contracts.map((contract) => (
          <button
            key={contract.id}
            disabled={isBusy}
            onClick={() => selectContract(contract)}
            className={"w-full text-left p-5 rounded-2xl border transition-all flex items-center justify-between group " + 
                       (isBusy ? "bg-zinc-900/30 border-zinc-800/50 opacity-40 cursor-not-allowed" : "bg-zinc-950/50 border-zinc-800 hover:border-zinc-600 active:scale-95")}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={"w-2 h-2 rounded-full " + (contract.difficulty === 'Easy' || contract.difficulty === 'Beginner' ? "bg-emerald-500" : contract.difficulty === 'Medium' ? "bg-orange-500" : "bg-red-500")}></span>
                <p className="text-xs font-bold text-zinc-100">{contract.company}</p>
              </div>
              <p className="text-[10px] text-zinc-400 line-clamp-1">{contract.title}</p>
            </div>
            
            <div className="text-right">
                <p className="text-[10px] font-mono font-bold text-zinc-100">{useGameStore.getState().fCurrency(contract.reward)}</p>
                <p className="text-[8px] text-zinc-600 font-black uppercase tracking-tighter">{contract.risk} RISK</p>
            </div>
          </button>
        ))}

        {contracts.length === 0 && !isBusy && (
          <div className="py-10 text-center border-2 border-dashed border-zinc-800 rounded-2xl">
            <p className="text-xs text-zinc-600 font-medium">Scanning for opportunities...</p>
          </div>
        )}
      </div>
    </div>
  );
};
