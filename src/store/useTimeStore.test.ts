import { describe, it, expect, beforeEach } from 'vitest';
import { useTimeStore } from './useTimeStore';
import { act } from '@testing-library/react';

describe('useTimeStore', () => {
    beforeEach(() => {
        act(() => {
            useTimeStore.getState().reset();
        });
    });

    it('initializes with 0 days and not paused', () => {
        const state = useTimeStore.getState();
        expect(state.days).toBe(0);
        expect(state.isPaused).toBe(false);
    });

    it('increases days', () => {
        act(() => {
            useTimeStore.getState().increaseDays(5);
        });
        expect(useTimeStore.getState().days).toBe(5);
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
        expect(useTimeStore.getState().isPaused).toBe(false);
    });
});
