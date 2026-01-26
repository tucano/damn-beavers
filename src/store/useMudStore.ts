import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MudState {
    mud: number;
    increaseMud: (amount: number) => void;
    reset: () => void;
}

export const useMudStore = create<MudState>()(
    persist(
        (set) => ({
            mud: 0,
            increaseMud: (amount: number) =>
                set((state) => ({ mud: state.mud + amount })),
            reset: () => set({ mud: 0 }),
        }),
        {
            name: 'mud-storage',
        }
    )
);
