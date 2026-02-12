import { act, renderHook } from '@testing-library/react';
import { useBeaverStore } from './useBeaverStore';
import { useWoodStore } from './useWoodStore';
import { useTimeStore } from './useTimeStore';
import { useBerryStore } from './useBerryStore';
import { describe, it, expect, beforeEach } from 'vitest';
import { WOOD_GNAWER_PRODUCTION_PER_DAY } from '@/config/game';

describe('useBeaverStore Jobs', () => {
    beforeEach(() => {
        act(() => {
            useBeaverStore.getState().reset();
            useWoodStore.getState().reset();
            useTimeStore.getState().reset();
            useBerryStore.getState().reset();
        });
    });

    it('should assign jobs correctly', () => {
        const { result } = renderHook(() => useBeaverStore());

        act(() => {
            result.current.addBeavers(5);
        });

        act(() => {
            result.current.assignJob('woodGnawer', 2);
        });

        const woodGnawers = result.current.beavers.filter(b => b.job === 'woodGnawer').length;
        const unemployed = result.current.beavers.filter(b => !b.job).length;

        expect(woodGnawers).toBe(2);
        expect(unemployed).toBe(3);
    });

    it('should unassign jobs correctly', () => {
        const { result } = renderHook(() => useBeaverStore());

        act(() => {
            result.current.addBeavers(5);
            result.current.assignJob('woodGnawer', 5);
        });

        act(() => {
            result.current.unassignJob('woodGnawer', 2);
        });

        const woodGnawers = result.current.beavers.filter(b => b.job === 'woodGnawer').length;
        expect(woodGnawers).toBe(3);
    });

    it('should handle unassigning all jobs via count exceeding assigned', () => {
         const { result } = renderHook(() => useBeaverStore());

        act(() => {
            result.current.addBeavers(5);
            result.current.assignJob('woodGnawer', 3);
        });

        act(() => {
            result.current.unassignJob('woodGnawer', 10);
        });

        const woodGnawers = result.current.beavers.filter(b => b.job === 'woodGnawer').length;
        expect(woodGnawers).toBe(0);
    });

    it('should produce wood based on job count', () => {
        const { result } = renderHook(() => useBeaverStore());

        act(() => {
            result.current.addBeavers(2);
            result.current.assignJob('woodGnawer', 2);
            useBerryStore.getState().increaseBerries(100); // Feed them
        });

        expect(useWoodStore.getState().wood).toBe(0);

        act(() => {
            useTimeStore.getState().tick();
        });

        expect(useWoodStore.getState().wood).toBeCloseTo(2 * WOOD_GNAWER_PRODUCTION_PER_DAY);
    });

    it('should stop production if worker dies', () => {
        const { result } = renderHook(() => useBeaverStore());

        act(() => {
            // Add a beaver with low health
            result.current.setBeavers([{ name: 'Dying Worker', age: 10, health: 10, job: 'woodGnawer' }]);
        });

        // Tick 1: Starves and health drops to -15, dies.
        // Production logic happens BEFORE death in the tick? Or AFTER?
        // Let's check logic order:
        // 1. Calculate consumption/health
        // 2. Filter survivors
        // 3. Job Production (using survivors)
        // So if it dies this tick, it produces nothing.

        act(() => {
            useTimeStore.getState().tick();
        });

        expect(result.current.beavers.length).toBe(0);
        expect(useWoodStore.getState().wood).toBe(0);
    });
});
