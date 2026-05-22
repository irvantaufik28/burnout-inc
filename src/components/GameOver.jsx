import React from 'react';
import { useGameStore } from '../store/useGameStore';

export const GameOver = () => {
  const isGameOver = useGameStore((state) => state.isGameOver);
  const reason = useGameStore((state) => state.gameOverReason);
  const restart = useGameStore((state) => state.restartGame);

  if (!isGameOver) return null;

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-zinc-900 border-2 border-red-900/50 p-10 rounded-2xl max-w-md w-full shadow-2xl shadow-red-900/20 text-center">
        <div className="w-16 h-16 bg-red-900/20 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">💀</span>
        </div>
        <h2 className="text-2xl font-bold text-zinc-100 mb-2 tracking-tight">GAME OVER</h2>
        <p className="text-zinc-400 mb-8 text-sm leading-relaxed">{reason}</p>
        <button 
          onClick={restart}
          className="w-full bg-zinc-100 hover:bg-white text-zinc-950 font-bold py-3 rounded-xl transition-all active:scale-95"
        >
          Initialize Restart
        </button>
      </div>
    </div>
  );
};
