import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Beaver } from '@/types/beaver';
import { getRandomBeaverName } from '@/utils/beaverHelper';
import { useTimeStore } from './useTimeStore';
import { useBerryStore } from './useBerryStore';
import { BERRY_CONSUMPTION_PER_DAY } from '@/config/game';

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

// Subscribe to game tick
useTimeStore.subscribe(
  (state) => state.days,
  (days, prevDays) => {
    if (days > prevDays) {
      const beaverStore = useBeaverStore.getState();
      const berryStore = useBerryStore.getState();

      const beavers = beaverStore.beavers;
      const consumption = beavers.length * BERRY_CONSUMPTION_PER_DAY;

      // Subtract berries
      berryStore.increaseBerries(-consumption);

      // Update beavers (aging)
      beaverStore.setBeavers(
        beavers.map((beaver) => ({
          ...beaver,
          age: beaver.age + 1,
        }))
      );
    }
  }
);
