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
  BERRY_CONSUMPTION_PER_TICK,
  DAYS_IN_YEAR,
  BEAVER_ARRIVAL_RATE,
  BEAVER_GROWTH_RATIO,
  LODGE_CAPACITY,
  WOOD_GNAWER_PRODUCTION_PER_TICK,
  TICKS_PER_DAY
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
              birthday: useTimeStore.getState().days,
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
  (state) => state.ticks,
  (ticks, prevTicks) => {
    if (ticks > prevTicks) {
      const ticksPassed = ticks - prevTicks;
      const beaverStore = useBeaverStore.getState();
      const berryStore = useBerryStore.getState();
      const woodStore = useWoodStore.getState();
      const logStore = useLogStore.getState();
      const lodgeStore = useLodgeStore.getState();

      let currentBerries = berryStore.berries;
      let totalConsumed = 0;
      let totalWoodProduced = 0;
      let currentBeavers = [...beaverStore.beavers];

      // Process each tick individually
      for (let i = 0; i < ticksPassed; i++) {
        const currentTick = prevTicks + i + 1;
        const ticksInYear = DAYS_IN_YEAR * TICKS_PER_DAY;
        const yearPassed = Math.floor(currentTick / ticksInYear) > Math.floor((currentTick - 1) / ticksInYear);

        const updatedBeavers = currentBeavers.map((beaver) => {
          let health = beaver.health;
          if (currentBerries >= BERRY_CONSUMPTION_PER_TICK) {
            currentBerries -= BERRY_CONSUMPTION_PER_TICK;
            totalConsumed += BERRY_CONSUMPTION_PER_TICK;
          } else {
            // Scale damage to match approximately same time-to-death as before (25 per day -> 2.5 per tick)
            health -= 2.5;
            // Consume what's left
            const remaining = Math.max(0, currentBerries);
            currentBerries -= remaining;
            totalConsumed += remaining;
          }

          return {
            ...beaver,
            age: beaver.age + 1,
            health: health,
          };
        });

        // Filter out dead beavers
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
            totalWoodProduced += woodGnawers * WOOD_GNAWER_PRODUCTION_PER_TICK;
        }

        // Arrival logic
        const lodges = lodgeStore.lodges;
        const capacity = lodges * LODGE_CAPACITY;

        if (survivors.length < capacity) {
          if (Math.random() < BEAVER_ARRIVAL_RATE * (1 + BEAVER_GROWTH_RATIO)) {
            survivors.push({
              name: getRandomBeaverName(),
              age: 0,
              health: 100,
              birthday: currentDay,
            });
            logStore.addLog('A new beaver has joined the colony!', 'success');
          }
        }

        currentBeavers = survivors;
      }

      // Update stores with final state
      berryStore.increaseBerries(-totalConsumed);
      if (totalWoodProduced > 0) {
          woodStore.increaseWood(totalWoodProduced);
      }
      beaverStore.setBeavers(currentBeavers);
    }
  }
);
