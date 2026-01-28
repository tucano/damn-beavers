import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Beaver } from '@/types/beaver';
import { getRandomBeaverName } from '@/utils/beaverHelper';

interface BeaverState {
  beavers: Beaver[];
  addBeavers: (by: number) => void;
  setBeavers: (beavers: Beaver[]) => void;
  resetBeavers: () => void;
}

export const useBeaverStore = create<BeaverState>()(
  persist(
    (set) => ({
      beavers: [],
      addBeavers: (by) =>
        set((state) => ({
          beavers: [
            ...state.beavers,
            ...Array.from({ length: by }, () => ({
              name: getRandomBeaverName(),
              age: 0,
              health: 100,
            })),
          ],
        })),
      setBeavers: (beavers) => set({ beavers }),
      resetBeavers: () => set({ beavers: [] }),
    }),
    {
      name: 'beaver-storage',
    },
  ),
);
