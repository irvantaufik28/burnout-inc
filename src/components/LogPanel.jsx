import { useGameStore } from '../store/useGameStore';

export const LogPanel = () => {
  const logs = useGameStore((state) => state.logs);

  return (
    <section className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl h-[500px] flex flex-col shadow-lg">
      <h2 className="text-zinc-500 text-xs font-bold uppercase mb-4 tracking-wider">Console Log</h2>
      <div className="flex-1 overflow-y-auto space-y-2 font-mono text-sm pr-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        {logs.map((log, i) => (
          <div key={i} className={i === 0 ? "text-zinc-100" : "text-zinc-500"}>
            <span className="text-zinc-700 mr-2">&gt;</span> {log}
          </div>
        ))}
      </div>
    </section>
  );
};
