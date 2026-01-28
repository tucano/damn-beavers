import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';

interface TimeState {
    days: number;
    isPaused: boolean;
    timeMultiplier: number;
    increaseDays: (amount: number) => void;
    tick: () => void;
    togglePause: () => void;
    setPaused: (paused: boolean) => void;
    setTimeMultiplier: (multiplier: number) => void;
    reset: () => void;
}

export const useTimeStore = create<TimeState>()(
    subscribeWithSelector(
        persist(
            (set) => ({
                days: 0,
                isPaused: false,
                timeMultiplier: 1,
                increaseDays: (amount: number) =>
                    set((state) => ({ days: state.days + amount })),
                tick: () => set((state) => ({ days: state.days + 1 })),
                togglePause: () =>
                    set((state) => ({ isPaused: !state.isPaused })),
                setPaused: (paused: boolean) =>
                    set({ isPaused: paused }),
                setTimeMultiplier: (multiplier: number) =>
                    set({ timeMultiplier: multiplier }),
                reset: () => set({ days: 0, isPaused: false, timeMultiplier: 1 }),
            }),
            {
                name: 'time-storage',
            }
        )
    )
);
