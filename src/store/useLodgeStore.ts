import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useWoodStore } from './useWoodStore';
import {
    LODGE_BASE_COST_WOOD,
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

                const woodCost = Math.floor(LODGE_BASE_COST_WOOD * Math.pow(LODGE_PRICE_RATIO, lodges));

                if (woodStore.wood >= woodCost) {
                    woodStore.increaseWood(-woodCost);
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
