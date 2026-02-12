import { describe, it, expect, beforeEach } from 'vitest';
import { useTimeStore } from './useTimeStore';
import { act } from '@testing-library/react';

describe('useTimeStore Security', () => {
    beforeEach(() => {
        act(() => {
            useTimeStore.getState().reset();
        });
    });

    it('should not allow decreasing days via increaseDays', () => {
        act(() => {
            useTimeStore.getState().increaseDays(10);
        });
        expect(useTimeStore.getState().days).toBe(10);

        act(() => {
            useTimeStore.getState().increaseDays(-5);
        });

        // This is expected to fail before the fix
        expect(useTimeStore.getState().days).toBe(10);
    });

    it('should not allow setting timeMultiplier to 0 or negative', () => {
        act(() => {
            useTimeStore.getState().setTimeMultiplier(0);
        });
        expect(useTimeStore.getState().timeMultiplier).toBeGreaterThan(0);

        act(() => {
            useTimeStore.getState().setTimeMultiplier(-1);
        });
        expect(useTimeStore.getState().timeMultiplier).toBeGreaterThan(0);
    });
});
