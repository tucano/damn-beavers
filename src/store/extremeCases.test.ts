import { act } from '@testing-library/react';
import { useBeaverStore } from './useBeaverStore';
import { useBerryStore } from './useBerryStore';
import { useTimeStore } from './useTimeStore';
import { useLogStore } from './useLogStore';
import { useLodgeStore } from './useLodgeStore';
import { describe, it, expect, beforeEach } from 'vitest';
import { BERRY_CONSUMPTION_PER_TICK, TICKS_PER_DAY, DAYS_IN_YEAR } from '@/config/game';

describe('Extreme Cases Store Logic', () => {
    beforeEach(() => {
        act(() => {
            useBeaverStore.getState().reset();
            useBerryStore.getState().reset();
            useTimeStore.getState().reset();
            useLogStore.getState().reset();
            useLodgeStore.getState().reset();
        });
    });

    it('Mass Starvation: 50 beavers with 0 food should all take damage', () => {
        act(() => {
            useBeaverStore.getState().addBeavers(50);
            useBerryStore.setState({ berries: 0 });
        });

        act(() => {
            useTimeStore.getState().tick();
        });

        const beavers = useBeaverStore.getState().beavers;
        expect(beavers.length).toBe(50);
        beavers.forEach(b => {
            // Damage is 2.5 per tick.
            expect(b.health).toBe(97.5);
        });
    });

    it('Time Skipping: increasing days by 10 should process 10 days of consumption', () => {
        // Setup: 1 beaver, plenty of food
        act(() => {
            useBeaverStore.getState().addBeavers(1);
            useBerryStore.setState({ berries: 1000 });
        });

        const initialBerries = useBerryStore.getState().berries;
        const daysToSkip = 10;
        // Consumption per tick * ticks per day * days
        const expectedConsumption = BERRY_CONSUMPTION_PER_TICK * TICKS_PER_DAY * daysToSkip;

        // Action: Skip 10 days
        act(() => {
            useTimeStore.getState().increaseDays(daysToSkip);
        });

        // Check results
        const finalBerries = useBerryStore.getState().berries;
        const beavers = useBeaverStore.getState().beavers;

        // EXPECTATION: logic should run for 10 days (100 ticks)
        expect(initialBerries - finalBerries).toBeCloseTo(expectedConsumption, 5);
        expect(beavers[0].age).toBe(10); // Should be 10 days older
    });

    it('Time Skipping: 1 year jump should age beavers', () => {
        act(() => {
            useBeaverStore.getState().addBeavers(1);
            useBerryStore.setState({ berries: 10000 }); // Prevent starvation
        });

        const beaversBefore = useBeaverStore.getState().beavers;
        expect(beaversBefore[0].age).toBe(0);

        act(() => {
            useTimeStore.getState().increaseDays(DAYS_IN_YEAR + 1);
        });

        const beaversAfter = useBeaverStore.getState().beavers;
        expect(beaversAfter[0].age).toBeGreaterThan(0);
    });

});
