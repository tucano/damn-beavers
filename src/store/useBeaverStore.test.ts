import { act, renderHook } from '@testing-library/react';
import { useBeaverStore } from './useBeaverStore';
import { describe, it, expect, afterEach } from 'vitest';

describe('useBeaverStore', () => {
  // Reset store state after each test to prevent leakage
  afterEach(() => {
    act(() => {
      useBeaverStore.setState({ beavers: [] });
    });
  });

  it('should have an initial state of 0 beavers', () => {
    const { result } = renderHook(() => useBeaverStore());

    expect(result.current.beavers).toEqual([]);
  });

  it('should add beavers to the count', () => {
    const { result } = renderHook(() => useBeaverStore());

    act(() => {
      result.current.addBeavers(5);
    });

    expect(result.current.beavers.length).toBe(5);

    act(() => {
      result.current.addBeavers(10);
    });

    expect(result.current.beavers.length).toBe(15);
  });

  it('should set the number of beavers', () => {
    const { result } = renderHook(() => useBeaverStore());

    act(() => {
      result.current.setBeavers([
        { name: 'Beaver', age: 0, health: 100 },
        { name: 'Beaver', age: 0, health: 100 },
      ]);
    });

    expect(result.current.beavers.length).toBe(2);
  });
});
