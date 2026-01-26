import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BerryState {
  berries: number;
  increaseBerries: (amount: number) => void;
}

export const useBerryStore = create<BerryState>()(
  persist(
    (set) => ({
      berries: 0,
      increaseBerries: (amount: number) =>
        set((state) => ({ berries: state.berries + amount })),
    }),
    {
      name: 'berry-storage',
    }
  )
);
