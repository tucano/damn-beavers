import { useEffect } from 'react';
import { useTimeStore } from '@/store/useTimeStore';
import { GAME_TICK_TIME } from '@/config/game';

export const useGameTime = () => {
  const tick = useTimeStore((state) => state.tick);
  const isPaused = useTimeStore((state) => state.isPaused);
  const timeMultiplier = useTimeStore((state) => state.timeMultiplier);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        tick();
      }
    }, GAME_TICK_TIME / timeMultiplier);

    return () => clearInterval(interval);
  }, [tick, isPaused, timeMultiplier]);
};
