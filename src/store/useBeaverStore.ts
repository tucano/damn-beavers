import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Beaver } from '@/types/beaver';
import { getRandomBeaverName } from '@/utils/beaverHelper';
import { useTimeStore } from './useTimeStore';
import { useBerryStore } from './useBerryStore';
import { useLogStore } from './useLogStore';
import { useLodgeStore } from './useLodgeStore';
import { useWoodStore } from './useWoodStore';
import {
  BERRY_CONSUMPTION_PER_DAY,
  DAYS_IN_YEAR,
  BEAVER_ARRIVAL_RATE,
  LODGE_CAPACITY,
  WOOD_GNAWER_PRODUCTION_PER_DAY
} from '@/config/game';

interface BeaverState {
  beavers: Beaver[];
  addBeavers: (by: number) => void;
  setBeavers: (beavers: Beaver[]) => void;
  assignJob: (job: string, count: number) => void;
  unassignJob: (job: string, count: number) => void;
  reset: () => void;
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
              job: undefined,
            })),
          ],
        })),
      setBeavers: (beavers) => set({ beavers }),
      assignJob: (job, count) =>
        set((state) => {
          let assigned = 0;
          const newBeavers = state.beavers.map((b) => {
            if (assigned < count && !b.job) {
              assigned++;
              return { ...b, job };
            }
            return b;
          });
          return { beavers: newBeavers };
        }),
      unassignJob: (job, count) =>
        set((state) => {
          let unassigned = 0;
          const newBeavers = state.beavers.map((b) => {
            if (unassigned < count && b.job === job) {
              unassigned++;
              return { ...b, job: undefined };
            }
            return b;
          });
          return { beavers: newBeavers };
        }),
      reset: () => set({ beavers: [] }),
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
      const woodStore = useWoodStore.getState();
      const logStore = useLogStore.getState();

      const beavers = beaverStore.beavers;
      let availableBerries = berryStore.berries;
      let totalConsumed = 0;

      const yearPassed = Math.floor(days / DAYS_IN_YEAR) > Math.floor(prevDays / DAYS_IN_YEAR);

      const updatedBeavers = beavers.map((beaver) => {
        let health = beaver.health;
        if (availableBerries >= BERRY_CONSUMPTION_PER_DAY) {
          availableBerries -= BERRY_CONSUMPTION_PER_DAY;
          totalConsumed += BERRY_CONSUMPTION_PER_DAY;
        } else {
          // Can't eat fully
          health -= 25;
          // Consume what's left
          const remaining = Math.max(0, availableBerries);
          availableBerries -= remaining;
          totalConsumed += remaining;
        }

        return {
          ...beaver,
          age: yearPassed ? beaver.age + 1 : beaver.age,
          health: health,
        };
      });

      const survivors = updatedBeavers.filter((beaver) => {
        if (beaver.health <= 0) {
          logStore.addLog(`Beaver ${beaver.name} dies for starvation`, 'error');
          return false;
        }
        return true;
      });

      // Job Production
      const woodGnawers = survivors.filter((b) => b.job === 'woodGnawer').length;
      if (woodGnawers > 0) {
        woodStore.increaseWood(woodGnawers * WOOD_GNAWER_PRODUCTION_PER_DAY);
      }

      // Arrival logic
      const lodgeStore = useLodgeStore.getState();
      const lodges = lodgeStore.lodges;
      const capacity = lodges * LODGE_CAPACITY;

      if (survivors.length < capacity) {
        if (Math.random() < BEAVER_ARRIVAL_RATE) {
          survivors.push({
            name: getRandomBeaverName(),
            age: 0,
            health: 100,
            job: undefined,
          });
          logStore.addLog('A new beaver has joined the colony!', 'success');
        }
      }

      // Update stores
      berryStore.increaseBerries(-totalConsumed);
      beaverStore.setBeavers(survivors);
    }
  }
);
