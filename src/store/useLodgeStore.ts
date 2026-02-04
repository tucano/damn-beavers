import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useWoodStore } from './useWoodStore';
import { useMudStore } from './useMudStore';
import {
    LODGE_BASE_COST_WOOD,
    LODGE_BASE_COST_MUD,
    LODGE_PRICE_RATIO
} from '@/config/game';

interface LodgeState {
    lodges: number;
    buildLodge: () => void;
    reset: () => void;
}

export const useLodgeStore = create<LodgeState>()(
    persist(
        (set, get) => ({
            lodges: 0,
            buildLodge: () => {
                const { lodges } = get();
                const woodStore = useWoodStore.getState();
                const mudStore = useMudStore.getState();

                const woodCost = Math.floor(LODGE_BASE_COST_WOOD * Math.pow(LODGE_PRICE_RATIO, lodges));
                const mudCost = Math.floor(LODGE_BASE_COST_MUD * Math.pow(LODGE_PRICE_RATIO, lodges));

                if (woodStore.wood >= woodCost && mudStore.mud >= mudCost) {
                    woodStore.increaseWood(-woodCost);
                    mudStore.increaseMud(-mudCost);
                    set({ lodges: lodges + 1 });
                }
            },
            reset: () => set({ lodges: 0 }),
        }),
        {
            name: 'lodge-storage',
        }
    )
);
