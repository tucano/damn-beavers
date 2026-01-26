import { renderHook, act } from '@testing-library/react';
import { useBerryStore } from './useBerryStore';

describe('useBerryStore', () => {
  afterEach(() => {
    act(() => {
      useBerryStore.getState().reset();
    });
  });

  it('should have 0 berries initially', () => {
    const { result } = renderHook(() => useBerryStore());

    expect(result.current.berries).toBe(0);
  });

  it('should increase berries by the given amount', () => {
    const { result } = renderHook(() => useBerryStore());

    act(() => {
      result.current.increaseBerries(10);
    });

    expect(result.current.berries).toBe(10);
  });

  it('should reset berries to 0', () => {
    const { result } = renderHook(() => useBerryStore());

    act(() => {
      result.current.increaseBerries(10);
    });

    expect(result.current.berries).toBe(10);

    act(() => {
      result.current.reset();
    });

    expect(result.current.berries).toBe(0);
  });
});
