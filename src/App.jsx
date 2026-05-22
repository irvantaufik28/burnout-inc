import { useGameStore } from './store/useGameStore';
import { useGameLoop } from './hooks/useGameLoop';

// Components
import { StatsPanel } from './components/StatsPanel';
import { ActionPanel } from './components/ActionPanel';
import { ConsoleLog } from './components/ConsoleLog';
import { TaskPanel } from './components/TaskPanel';
import { GameOver } from './components/GameOver';
import { InterviewModal } from './components/InterviewModal';

const SpeedButton = ({ val, currentSpeed, setSpeed }) => (
  <button 
    onClick={() => setSpeed(val)}
    className={"px-3 py-1 text-[10px] font-bold rounded " + (currentSpeed === val ? "bg-zinc-100 text-zinc-950" : "bg-zinc-900 text-zinc-500 hover:bg-zinc-800")}
  >
    {val + "X"}
  </button>
);

function App() {
  useGameLoop(1000);

  const gameTime = useGameStore((state) => state.gameTime);
  const setSpeed = useGameStore((state) => state.setSpeed);
  const togglePause = useGameStore((state) => state.togglePause);
  const setLanguage = useGameStore((state) => state.setLanguage);
  const currentLang = useGameStore((state) => state.language);
  const t = useGameStore((state) => state.t);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 font-sans flex flex-col items-center">
      <div className="max-w-7xl w-full">
        <GameOver />
        <InterviewModal />

        {/* Top Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-zinc-900 pb-6 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-black tracking-tighter text-zinc-100">{t('dashboard.title')}</h1>
            <p className="text-zinc-500 text-xs uppercase tracking-[0.3em] mt-1 font-semibold text-emerald-900">{t('dashboard.subtitle')}</p>
          </div>

          <div className="flex items-center gap-8 bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800/50">
            <div className="text-center">
              <p className="text-zinc-600 text-[9px] uppercase tracking-widest font-bold mb-1">Language</p>
              <div className="flex items-center gap-1">
                <button onClick={() => setLanguage('en')} className={"px-2 py-1 text-[10px] rounded " + (currentLang === 'en' ? "bg-zinc-100 text-zinc-950" : "text-zinc-500")}>EN</button>
                <button onClick={() => setLanguage('id')} className={"px-2 py-1 text-[10px] rounded " + (currentLang === 'id' ? "bg-zinc-100 text-zinc-950" : "text-zinc-500")}>ID</button>
              </div>
            </div>

            <div className="text-center">
              <p className="text-zinc-600 text-[9px] uppercase tracking-widest font-bold mb-1">Time Speed</p>
              <div className="flex items-center gap-1">
                <SpeedButton val={1} currentSpeed={gameTime.speed} setSpeed={setSpeed} />
                <SpeedButton val={2} currentSpeed={gameTime.speed} setSpeed={setSpeed} />
                <SpeedButton val={4} currentSpeed={gameTime.speed} setSpeed={setSpeed} />
              </div>
            </div>
            
            <div className="w-[1px] h-8 bg-zinc-800"></div>

            <div className="text-right">
              <div className="text-xl font-mono tracking-tight text-zinc-200">
                {t('common.day') + " " + gameTime.day + " • " + String(gameTime.hour).padStart(2, '0') + ":00"}
              </div>
              <button 
                onClick={togglePause}
                className="text-[10px] uppercase text-zinc-500 hover:text-zinc-300 font-bold tracking-widest"
              >
                {gameTime.isPaused ? t('common.resume') : t('common.pause')}
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
          <p className="text-zinc-400 text-[10px] tracking-[0.5em] uppercase text-zinc-800">Survival_Protocol_V1 // status: operational</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
