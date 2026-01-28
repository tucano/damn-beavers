import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useTimeStore } from './useTimeStore';

interface BerryState {
  berries: number;
  increaseBerries: (amount: number) => void;
  reset: () => void;
}

export const useBerryStore = create<BerryState>()(
  persist(
    (set) => ({
      berries: 0,
      increaseBerries: (amount: number) =>
        set((state) => ({ berries: state.berries + amount })),
      reset: () => set({ berries: 0 }),
    }),
    {
      name: 'berry-storage',
    }
  )
);

// Subscribe to game tick
useTimeStore.subscribe(
  (state) => state.days,
  (days, prevDays) => {
    if (days > prevDays) {
      // Logic for berry-specific tick actions can go here
      // Berry consumption is currently handled by useBeaverStore subscription
    }
  }
);
