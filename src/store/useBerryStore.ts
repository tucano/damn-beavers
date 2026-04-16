import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
        set((state) => {
          if (typeof amount !== 'number' || isNaN(amount)) {
            return state;
          }
          return { berries: Math.max(0, state.berries + amount) };
        }),
      reset: () => set({ berries: 0 }),
    }),
    {
      name: 'berry-storage',
    }
  )
);
