import React from 'react';
import { useGameStore } from './store/useGameStore';
import { useGameLoop } from './hooks/useGameLoop';

// Components
import { StatsPanel } from './components/StatsPanel';
import { ActionPanel } from './components/ActionPanel';
import { ConsoleLog } from './components/ConsoleLog';
import { TaskPanel } from './components/TaskPanel';
import { GameOver } from './components/GameOver';
import { ProductModal } from './components/ProductModal';

function App() {
  useGameLoop(1000);

  const gameTime = useGameStore((state) => state.gameTime);
  const setSpeed = useGameStore((state) => state.setSpeed);
  const togglePause = useGameStore((state) => state.togglePause);

  const SpeedButton = ({ val }) => (
    <button 
      onClick={() => setSpeed(val)}
      className={"px-3 py-1 text-[10px] font-bold rounded " + (gameTime.speed === val ? "bg-zinc-100 text-zinc-950" : "bg-zinc-900 text-zinc-500 hover:bg-zinc-800")}
    >
      {val + "X"}
    </button>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 font-sans flex flex-col items-center">
      <div className="max-w-7xl w-full">
        <GameOver />
        <ProductModal />

        {/* Top Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-zinc-900 pb-6 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-black tracking-tighter text-zinc-100">BURNOUT INC.</h1>
            <p className="text-zinc-500 text-xs uppercase tracking-[0.3em] mt-1 font-semibold text-emerald-900">System_Phase_03 // core_strategic_loop</p>
          </div>

          <div className="flex items-center gap-8 bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/50">
            <div className="text-center">
              <p className="text-zinc-600 text-[9px] uppercase tracking-widest font-bold mb-1">Time Speed</p>
              <div className="flex items-center gap-1">
                <SpeedButton val={1} />
                <SpeedButton val={2} />
                <SpeedButton val={4} />
              </div>
            </div>
            
            <div className="w-[1px] h-8 bg-zinc-800"></div>

            <div className="text-right">
              <div className="text-xl font-mono tracking-tight text-zinc-200">
                {"DAY " + gameTime.day + " • " + String(gameTime.hour).padStart(2, '0') + ":00"}
              </div>
              <button 
                onClick={togglePause}
                className="text-[10px] uppercase text-zinc-500 hover:text-zinc-300 font-bold tracking-widest"
              >
                {gameTime.isPaused ? "[ Resume ]" : "[ Pause ]"}
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <StatsPanel />
          </div>

          <div className="lg:col-span-5 space-y-8">
            <TaskPanel />
            <ActionPanel />
          </div>

          <div className="lg:col-span-4">
            <ConsoleLog />
          </div>
        </div>

        <footer className="mt-20 py-10 border-t border-zinc-900 text-center opacity-30 grayscale pointer-events-none">
          <p className="text-zinc-400 text-[10px] tracking-[0.5em] uppercase text-zinc-800">Burnout_Protocol_V3 // status: operational</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
