import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Beaver } from '@/types/beaver';

export const BERRY_CONSUMPTION_PER_SECOND = 4;

interface BeaverState {
  beavers: Beaver[];
  addBeavers: (by: number) => void;
  setBeavers: (beavers: Beaver[]) => void;
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
              name: 'Beaver',
              age: 0,
              health: 100,
            })),
          ],
        })),
      setBeavers: (beavers) => set({ beavers }),
    }),
    {
      name: 'beaver-storage',
    },
  ),
);
