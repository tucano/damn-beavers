import { act, renderHook } from '@testing-library/react';
import { useBeaverStore } from './useBeaverStore';
import { useBerryStore } from './useBerryStore';
import { useTimeStore } from './useTimeStore';
import { useLogStore } from './useLogStore';
import { describe, it, expect, beforeEach } from 'vitest';

describe('useBeaverStore', () => {
  // Reset store state before each test to prevent leakage
  beforeEach(() => {
    act(() => {
        useBeaverStore.getState().reset();
        useBerryStore.getState().reset();
        useTimeStore.getState().reset();
        useLogStore.getState().reset();
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

  describe('Starvation logic', () => {
    it('should reduce health when not enough berries', () => {
      act(() => {
        useBeaverStore.getState().addBeavers(1);
        // No berries in store
      });

      act(() => {
        useTimeStore.getState().tick();
      });

      const beavers = useBeaverStore.getState().beavers;
      expect(beavers[0].health).toBe(75);
    });

    it('should kill beaver when health reaches 0', () => {
      act(() => {
          useBeaverStore.getState().setBeavers([{ name: 'Starving Beaver', age: 0, health: 25 }]);
      });

      act(() => {
        useTimeStore.getState().tick();
      });

      const beavers = useBeaverStore.getState().beavers;
      expect(beavers.length).toBe(0);

      const logs = useLogStore.getState().logs;
      expect(logs[0].message).toBe('Beaver Starving Beaver dies for starvation');
    });
  });
});
