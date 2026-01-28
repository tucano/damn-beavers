import { useEffect } from 'react';
import { useTimeStore } from '@/store/useTimeStore';

export const useGameTime = () => {
  const tick = useTimeStore((state) => state.tick);
  const isPaused = useTimeStore((state) => state.isPaused);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        tick();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [tick, isPaused]);
};
