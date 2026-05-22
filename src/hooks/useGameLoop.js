import { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';

export const useGameLoop = (baseIntervalMs = 1000) => {
  const tickTime = useGameStore((state) => state.tickTime);
  const isPaused = useGameStore((state) => state.gameTime.isPaused);
  const speed = useGameStore((state) => state.gameTime.speed);
  const isGameOver = useGameStore((state) => state.isGameOver);

  useEffect(() => {
    if (isPaused || isGameOver) return;

    const interval = setInterval(() => {
      tickTime();
    }, baseIntervalMs / speed);

    return () => clearInterval(interval);
  }, [tickTime, isPaused, speed, isGameOver, baseIntervalMs]);
};
