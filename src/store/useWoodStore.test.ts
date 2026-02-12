import { renderHook, act } from '@testing-library/react';
import { useWoodStore } from './useWoodStore';

describe('useWoodStore', () => {
    afterEach(() => {
        act(() => {
            useWoodStore.getState().reset();
        });
    });

    it('should have 0 wood initially', () => {
        const { result } = renderHook(() => useWoodStore());

        expect(result.current.wood).toBe(0);
    });

    it('should increase wood by the given amount', () => {
        const { result } = renderHook(() => useWoodStore());

        act(() => {
            result.current.increaseWood(10);
        });

        expect(result.current.wood).toBe(10);
    });

    it('should reset wood to 0', () => {
        const { result } = renderHook(() => useWoodStore());

        act(() => {
            result.current.increaseWood(10);
        });

        expect(result.current.wood).toBe(10);

        act(() => {
            result.current.reset();
        });

        expect(result.current.wood).toBe(0);
    });

    it('should prevent negative wood amount', () => {
        const { result } = renderHook(() => useWoodStore());

        act(() => {
            result.current.increaseWood(10);
            result.current.increaseWood(-20);
        });

        expect(result.current.wood).toBe(0);
    });

    it('should ignore invalid inputs', () => {
        const { result } = renderHook(() => useWoodStore());

        act(() => {
            result.current.increaseWood(NaN);
        });

        expect(result.current.wood).toBe(0);
    });
});
