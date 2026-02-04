import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useLodgeStore } from './useLodgeStore';
import { useWoodStore } from './useWoodStore';
import { LODGE_BASE_COST_WOOD } from '../config/game';

describe('useLodgeStore', () => {
  beforeEach(() => {
    act(() => {
      useLodgeStore.getState().reset();
      useWoodStore.getState().reset();
    });
  });

  it('should have 0 lodges initially', () => {
    const { result } = renderHook(() => useLodgeStore());
    expect(result.current.lodges).toBe(0);
  });

  it('should not build a lodge if not enough wood', () => {
    const { result } = renderHook(() => useLodgeStore());

    act(() => {
      result.current.buildLodge();
    });

    expect(result.current.lodges).toBe(0);
  });

  it('should build a lodge if enough wood', () => {
    const { result } = renderHook(() => useLodgeStore());

    act(() => {
      useWoodStore.getState().increaseWood(LODGE_BASE_COST_WOOD);
    });

    act(() => {
      result.current.buildLodge();
    });

    expect(result.current.lodges).toBe(1);
    expect(useWoodStore.getState().wood).toBe(0);
  });

  it('should increase the cost for the second lodge', () => {
    const { result } = renderHook(() => useLodgeStore());

    // Build first lodge
    act(() => {
      useWoodStore.getState().increaseWood(LODGE_BASE_COST_WOOD);
      result.current.buildLodge();
    });
    expect(result.current.lodges).toBe(1);

    // Try to build second lodge with base cost (should fail)
    act(() => {
      useWoodStore.getState().increaseWood(LODGE_BASE_COST_WOOD);
      result.current.buildLodge();
    });
    expect(result.current.lodges).toBe(1);

    // Build second lodge with increased cost
    const secondWoodCost = Math.floor(LODGE_BASE_COST_WOOD * 1.75);

    // We already added base cost, so we need to add the difference
    act(() => {
      useWoodStore.getState().increaseWood(secondWoodCost - LODGE_BASE_COST_WOOD);
      result.current.buildLodge();
    });
    expect(result.current.lodges).toBe(2);
  });
});
