import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useLodgeStore } from './useLodgeStore';
import { useWoodStore } from './useWoodStore';
import { useMudStore } from './useMudStore';
import { LODGE_BASE_COST_WOOD, LODGE_BASE_COST_MUD } from '../config/game';

describe('useLodgeStore', () => {
  beforeEach(() => {
    act(() => {
      useLodgeStore.getState().reset();
      useWoodStore.getState().reset();
      useMudStore.getState().reset();
    });
  });

  it('should have 0 lodges initially', () => {
    const { result } = renderHook(() => useLodgeStore());
    expect(result.current.lodges).toBe(0);
  });

  it('should not build a lodge if not enough wood or mud', () => {
    const { result } = renderHook(() => useLodgeStore());

    act(() => {
      result.current.buildLodge();
    });

    expect(result.current.lodges).toBe(0);
  });

  it('should build a lodge if enough wood and mud', () => {
    const { result } = renderHook(() => useLodgeStore());

    act(() => {
      useWoodStore.getState().increaseWood(LODGE_BASE_COST_WOOD);
      useMudStore.getState().increaseMud(LODGE_BASE_COST_MUD);
    });

    act(() => {
      result.current.buildLodge();
    });

    expect(result.current.lodges).toBe(1);
    expect(useWoodStore.getState().wood).toBe(0);
    expect(useMudStore.getState().mud).toBe(0);
  });
});
