import { useEffect } from 'react';
import { useGameStore } from './store/useGameStore';
import { Header } from './components/Header';
import { StatPanel } from './components/StatPanel';
import { TechPanel } from './components/TechPanel';
import { TaskPanel } from './components/TaskPanel';
import { ActionPanel } from './components/ActionPanel';
import { LogPanel } from './components/LogPanel';
import { ModalManager } from './components/ModalManager';
import { FreelanceProjectDetailModal } from './components/FreelanceProjectDetailModal';
import { MentalAura } from './components/MentalAura';

function App() {
  const tickTime = useGameStore((state) => state.tickTime);
  const gameTime = useGameStore((state) => state.gameTime);
  const isGameOver = useGameStore((state) => state.isGameOver);
  const gameOverReason = useGameStore((state) => state.gameOverReason);
  const restartGame = useGameStore((state) => state.restartGame);
  
  const hasStarted = useGameStore((state) => state.hasStarted);
  const lastSaved = useGameStore((state) => state.lastSaved);
  const player = useGameStore((state) => state.player);
  const startNew = useGameStore((state) => state.startNewCareer);
  const continueCareer = useGameStore((state) => state.continueCareer);
  const getCareerTitle = useGameStore((state) => state.getCareerTitle);

  useEffect(() => {
    let timer;
    if (hasStarted && !gameTime.isPaused && !isGameOver) {
      timer = setInterval(() => {
        tickTime();
      }, 1000 / gameTime.speed);
    }
    return () => clearInterval(timer);
  }, [hasStarted, gameTime.isPaused, gameTime.speed, isGameOver, tickTime]);

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 text-zinc-100 font-sans selection:bg-emerald-500">
        <div className="max-w-md w-full space-y-12 text-center animate-in fade-in duration-1000">
          <div className="space-y-4">
            <h1 className="text-5xl font-black tracking-tighter text-zinc-100">BURNOUT INC.</h1>
            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em]">Freelance_Survival_Simulator // Phase_02</p>
          </div>

          <div className="space-y-4">
            {lastSaved && (
              <button 
                onClick={continueCareer}
                className="group w-full bg-zinc-900 border-2 border-zinc-800 p-6 rounded-[2rem] text-left hover:border-emerald-500/50 transition-all active:scale-95"
              >
                <div className="flex justify-between items-start mb-2">
                   <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">Continue Career</span>
                   <span className="text-zinc-600 text-[9px] font-mono">{new Date(lastSaved).toLocaleString()}</span>
                </div>
                <h2 className="text-xl font-black text-zinc-100">{getCareerTitle(player.careerLevel)}</h2>
                <p className="text-zinc-500 text-xs">Day {gameTime.day} • Level {player.careerLevel}</p>
              </button>
            )}

            <button 
              onClick={startNew}
              className={"w-full py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all active:scale-95 " + (lastSaved ? "text-zinc-500 hover:text-zinc-100" : "bg-zinc-100 text-zinc-950 shadow-xl shadow-white/5")}
            >
              {lastSaved ? "Initialize New Profile" : "Initialize Career"}
            </button>
          </div>

          <div className="text-[9px] text-zinc-800 uppercase font-black tracking-[0.3em]">
            System_Boot_Stable // User_Authorized
          </div>
        </div>
      </div>
    );
  }

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
    <main className="relative min-h-screen bg-zinc-950 text-zinc-100 font-sans p-4 md:p-8 selection:bg-emerald-500 selection:text-emerald-950 overflow-x-hidden">
      <MentalAura />
      
      <div className="relative z-10 max-w-[1400px] mx-auto space-y-6">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-3 space-y-6">
            <StatPanel />
            <TechPanel />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <TaskPanel />
            <LogPanel />
          </div>

          <div className="lg:col-span-3 h-full">
            <ActionPanel />
          </div>
        </div>
      </div>

      <ModalManager />
      <FreelanceProjectDetailModal />

      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-1.5 bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-full opacity-50 pointer-events-none animate-in fade-in duration-1000">
         <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
         <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Career Synced</span>
      </div>
    </main>
  );
}

export default App;
