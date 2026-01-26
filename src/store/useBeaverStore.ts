import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BeaverState {
  beavers: number;
  addBeavers: (by: number) => void;
  setBeavers: (beavers: number) => void;
}

export const useBeaverStore = create<BeaverState>()(
  persist(
    (set) => ({
      beavers: 0,
      addBeavers: (by) => set((state) => ({ beavers: state.beavers + by })),
      setBeavers: (beavers) => set({ beavers }),
    }),
    {
      name: 'beaver-storage',
    },
  ),
);
