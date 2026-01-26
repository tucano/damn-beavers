import { renderHook, act } from '@testing-library/react';
import { useMudStore } from './useMudStore';

describe('useMudStore', () => {
    afterEach(() => {
        act(() => {
            useMudStore.getState().reset();
        });
    });

    it('should have 0 mud initially', () => {
        const { result } = renderHook(() => useMudStore());

        expect(result.current.mud).toBe(0);
    });

    it('should increase mud by the given amount', () => {
        const { result } = renderHook(() => useMudStore());

        act(() => {
            result.current.increaseMud(10);
        });

        expect(result.current.mud).toBe(10);
    });

    it('should reset mud to 0', () => {
        const { result } = renderHook(() => useMudStore());

        act(() => {
            result.current.increaseMud(10);
        });

        expect(result.current.mud).toBe(10);

        act(() => {
            result.current.reset();
        });

        expect(result.current.mud).toBe(0);
    });
});
