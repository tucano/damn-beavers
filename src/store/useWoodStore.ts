import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WoodState {
    wood: number;
    increaseWood: (amount: number) => void;
    reset: () => void;
}

export const useWoodStore = create<WoodState>()(
    persist(
        (set) => ({
            wood: 0,
            increaseWood: (amount: number) =>
                set((state) => {
                    if (typeof amount !== 'number' || isNaN(amount)) {
                        return state;
                    }
                    return { wood: Math.max(0, state.wood + amount) };
                }),
            reset: () => set({ wood: 0 }),
        }),
        {
            name: 'wood-storage',
        }
    )
);
