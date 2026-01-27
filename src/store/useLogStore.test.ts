import { renderHook, act } from '@testing-library/react';
import { useLogStore } from './useLogStore';
import { describe, it, expect, afterEach, beforeEach } from 'vitest';

describe('useLogStore', () => {
    beforeEach(() => {
        // Polyfill crypto.randomUUID if not available
        if (typeof crypto === 'undefined' || !crypto.randomUUID) {
            Object.defineProperty(globalThis, 'crypto', {
                value: {
                    randomUUID: () => 'test-uuid-' + Math.random().toString(36).slice(2, 11),
                },
                configurable: true,
            });
        }
    });

    afterEach(() => {
        act(() => {
            useLogStore.getState().reset();
        });
    });

    it('should have empty logs initially', () => {
        const { result } = renderHook(() => useLogStore());
        expect(result.current.logs).toEqual([]);
    });

    it('should add a log entry', () => {
        const { result } = renderHook(() => useLogStore());
        const message = 'Test log message';

        act(() => {
            result.current.addLog(message);
        });

        expect(result.current.logs).toHaveLength(1);
        expect(result.current.logs[0].message).toBe(message);
        expect(result.current.logs[0].type).toBe('info');
        expect(result.current.logs[0].id).toBeDefined();
        expect(result.current.logs[0].timestamp).toBeLessThanOrEqual(Date.now());
    });

    it('should add multiple logs in reverse chronological order', () => {
        const { result } = renderHook(() => useLogStore());

        act(() => {
            result.current.addLog('Log 1');
            result.current.addLog('Log 2');
        });

        expect(result.current.logs).toHaveLength(2);
        expect(result.current.logs[0].message).toBe('Log 2');
        expect(result.current.logs[1].message).toBe('Log 1');
    });

    it('should limit the number of logs to 50', () => {
        const { result } = renderHook(() => useLogStore());

        act(() => {
            for (let i = 1; i <= 60; i++) {
                result.current.addLog(`Log ${i}`);
            }
        });

        expect(result.current.logs).toHaveLength(50);
        expect(result.current.logs[0].message).toBe('Log 60');
        expect(result.current.logs[49].message).toBe('Log 11');
    });

    it('should reset logs', () => {
        const { result } = renderHook(() => useLogStore());

        act(() => {
            result.current.addLog('Test log');
        });

        expect(result.current.logs).toHaveLength(1);

        act(() => {
            result.current.reset();
        });

        expect(result.current.logs).toHaveLength(0);
    });
});
