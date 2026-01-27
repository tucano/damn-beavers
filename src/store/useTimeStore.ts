import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TimeState {
    days: number;
    isPaused: boolean;
    increaseDays: (amount: number) => void;
    togglePause: () => void;
    setPaused: (paused: boolean) => void;
    reset: () => void;
}

export const useTimeStore = create<TimeState>()(
    persist(
        (set) => ({
            days: 0,
            isPaused: false,
            increaseDays: (amount: number) =>
                set((state) => ({ days: state.days + amount })),
            togglePause: () =>
                set((state) => ({ isPaused: !state.isPaused })),
            setPaused: (paused: boolean) =>
                set({ isPaused: paused }),
            reset: () => set({ days: 0, isPaused: false }),
        }),
        {
            name: 'time-storage',
        }
    )
);
