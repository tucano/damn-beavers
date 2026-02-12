import { describe, it, expect, beforeEach } from 'vitest';
import { useTimeStore } from './useTimeStore';
import { act } from '@testing-library/react';
import { TICKS_PER_DAY } from '@/config/game';

describe('useTimeStore', () => {
    beforeEach(() => {
        act(() => {
            useTimeStore.getState().reset();
        });
    });

    it('initializes with 0 days and not paused', () => {
        const state = useTimeStore.getState();
        expect(state.days).toBe(0);
        expect(state.ticks).toBe(0);
        expect(state.isPaused).toBe(false);
    });

    it('increases days', () => {
        act(() => {
            useTimeStore.getState().increaseDays(5);
        });
        expect(useTimeStore.getState().days).toBe(5);
        expect(useTimeStore.getState().ticks).toBe(5 * TICKS_PER_DAY);
    });

    it('increases ticks and updates days', () => {
        // 1 tick
        act(() => useTimeStore.getState().tick());
        expect(useTimeStore.getState().ticks).toBe(1);
        expect(useTimeStore.getState().days).toBe(0);

        // 9 more ticks -> 10 ticks total -> 1 day (assuming TICKS_PER_DAY is 10)
        for(let i=0; i<TICKS_PER_DAY - 1; i++) {
             act(() => useTimeStore.getState().tick());
        }
        expect(useTimeStore.getState().ticks).toBe(TICKS_PER_DAY);
        expect(useTimeStore.getState().days).toBe(1);
    });

    it('toggles pause', () => {
        act(() => {
            useTimeStore.getState().togglePause();
        });
        expect(useTimeStore.getState().isPaused).toBe(true);
        act(() => {
            useTimeStore.getState().togglePause();
        });
        expect(useTimeStore.getState().isPaused).toBe(false);
    });

    it('sets paused', () => {
        act(() => {
            useTimeStore.getState().setPaused(true);
        });
        expect(useTimeStore.getState().isPaused).toBe(true);
    });

    it('resets state', () => {
        act(() => {
            useTimeStore.getState().increaseDays(10);
            useTimeStore.getState().setPaused(true);
            useTimeStore.getState().reset();
        });
        expect(useTimeStore.getState().days).toBe(0);
        expect(useTimeStore.getState().ticks).toBe(0);
        expect(useTimeStore.getState().isPaused).toBe(false);
    });
});
