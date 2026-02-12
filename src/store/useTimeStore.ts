import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { TICKS_PER_DAY } from '@/config/game';

interface TimeState {
    ticks: number;
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
                ticks: 0,
                days: 0,
                isPaused: false,
                timeMultiplier: 1,
                increaseDays: (amount: number) =>
                    set((state) => {
                        if (amount < 0) return state;
                        const newTicks = state.ticks + amount * TICKS_PER_DAY;
                        return {
                            ticks: newTicks,
                            days: Math.floor(newTicks / TICKS_PER_DAY)
                        };
                    }),
                tick: () => set((state) => {
                    const newTicks = state.ticks + 1;
                    return {
                        ticks: newTicks,
                        days: Math.floor(newTicks / TICKS_PER_DAY)
                    };
                }),
                togglePause: () =>
                    set((state) => ({ isPaused: !state.isPaused })),
                setPaused: (paused: boolean) =>
                    set({ isPaused: paused }),
                setTimeMultiplier: (multiplier: number) =>
                    set((state) => {
                        if (multiplier <= 0) return state;
                        return { timeMultiplier: multiplier };
                    }),
                reset: () => set({ ticks: 0, days: 0, isPaused: false, timeMultiplier: 1 }),
            }),
            {
                name: 'time-storage',
                version: 1,
                migrate: (persistedState: any, version) => {
                    if (version === 0 || version === undefined) {
                        const days = persistedState.days || 0;
                        return {
                            ...persistedState,
                            ticks: days * TICKS_PER_DAY,
                        };
                    }
                    return persistedState;
                },
            }
        )
    )
);
