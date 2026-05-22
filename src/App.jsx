import { useEffect } from 'react';
import { useGameStore } from './store/useGameStore';
import { Header } from './components/Header';
import { StatPanel } from './components/StatPanel';
import { TechPanel } from './components/TechPanel';
import { TaskPanel } from './components/TaskPanel';
import { ActionPanel } from './components/ActionPanel';
import { LogPanel } from './components/LogPanel';
import { InterviewModal } from './components/InterviewModal';
import { ChaosEventModal } from './components/ChaosEventModal';
import { FreelanceProjectDetailModal } from './components/FreelanceProjectDetailModal';

function App() {
  const tickTime = useGameStore((state) => state.tickTime);
  const gameTime = useGameStore((state) => state.gameTime);
  const isGameOver = useGameStore((state) => state.isGameOver);
  const gameOverReason = useGameStore((state) => state.gameOverReason);
  const restartGame = useGameStore((state) => state.restartGame);

  useEffect(() => {
    let timer;
    if (!gameTime.isPaused && !isGameOver) {
      timer = setInterval(() => {
        tickTime();
      }, 1000 / gameTime.speed);
    }
    return () => clearInterval(timer);
  }, [gameTime.isPaused, gameTime.speed, isGameOver, tickTime]);

  if (isGameOver) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 text-zinc-100 font-sans">
        <div className="text-center space-y-8 max-w-md">
          <div className="space-y-2">
            <h1 className="text-6xl font-black tracking-tighter text-red-600">GAME OVER</h1>
            <p className="text-zinc-500 uppercase tracking-widest text-sm font-bold">{gameOverReason}</p>
          </div>
          <button 
            onClick={restartGame}
            className="w-full bg-zinc-100 text-zinc-950 py-4 rounded-2xl font-black uppercase tracking-tighter hover:bg-white active:scale-95 transition-all"
          >
            Reboot System
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans p-4 md:p-8 selection:bg-emerald-500 selection:text-emerald-950">
      <div className="max-w-[1400px] mx-auto space-y-6">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Stats & Tech */}
          <div className="lg:col-span-3 space-y-6">
            <StatPanel />
            <TechPanel />
          </div>

          {/* Middle Column: Active Work */}
          <div className="lg:col-span-6 space-y-6">
            <TaskPanel />
            <LogPanel />
          </div>

          {/* Right Column: Board & Actions */}
          <div className="lg:col-span-3 h-full">
            <ActionPanel />
          </div>
        </div>
      </div>

      {/* Overlays */}
      <InterviewModal />
      <ChaosEventModal />
      <FreelanceProjectDetailModal />
    </main>
  );
}

export default App;
