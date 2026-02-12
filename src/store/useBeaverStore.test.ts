import { act, renderHook } from '@testing-library/react';
import { useBeaverStore } from './useBeaverStore';
import { useBerryStore } from './useBerryStore';
import { useTimeStore } from './useTimeStore';
import { useLogStore } from './useLogStore';
import { useLodgeStore } from './useLodgeStore';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { DAYS_IN_YEAR, BEAVER_ARRIVAL_RATE } from '@/config/game';

describe('useBeaverStore', () => {
  // Reset store state before each test to prevent leakage
  beforeEach(() => {
    act(() => {
        useBeaverStore.getState().reset();
        useBerryStore.getState().reset();
        useTimeStore.getState().reset();
        useLogStore.getState().reset();
        useLodgeStore.getState().reset();
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
        { name: 'Beaver', age: 0, health: 100, birthday: 0 },
        { name: 'Beaver', age: 0, health: 100, birthday: 0 },
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
          useBeaverStore.getState().setBeavers([{ name: 'Starving Beaver', age: 0, health: 25, birthday: 0 }]);
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

  describe('Aging logic', () => {
    it('should increase age every day', () => {
      act(() => {
        useBeaverStore.getState().addBeavers(1);
        useBerryStore.getState().increaseBerries(100); // Give them food
      });

      act(() => {
        useTimeStore.getState().tick();
      });

      const beavers = useBeaverStore.getState().beavers;
      expect(beavers[0].age).toBe(1);
    });

    it('should increase age by DAYS_IN_YEAR after DAYS_IN_YEAR days', () => {
      act(() => {
        useBeaverStore.getState().addBeavers(1);
        useBerryStore.getState().increaseBerries(1000); // Give them food
      });

      // Advance 365 days
      for (let i = 0; i < DAYS_IN_YEAR; i++) {
        act(() => {
          useTimeStore.getState().tick();
        });
      }

      const beavers = useBeaverStore.getState().beavers;
      expect(beavers[0].age).toBe(DAYS_IN_YEAR);
    });
  });

  describe('Arrival logic', () => {
    beforeEach(() => {
      vi.spyOn(Math, 'random');
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should not add beavers if no lodges', () => {
      vi.mocked(Math.random).mockReturnValue(0); // Always succeed arrival check if it were called

      act(() => {
        useTimeStore.getState().tick();
      });

      expect(useBeaverStore.getState().beavers.length).toBe(0);
    });

    it('should add a beaver if there is space and random succeeds', () => {
      act(() => {
        useLodgeStore.setState({ lodges: 1 });
      });

      vi.mocked(Math.random).mockReturnValue(BEAVER_ARRIVAL_RATE - 0.001); // Succeed

      act(() => {
        useTimeStore.getState().tick();
      });

      expect(useBeaverStore.getState().beavers.length).toBe(1);
      expect(useLogStore.getState().logs[0].message).toBe('A new beaver has joined the colony!');
    });

    it('should add a beaver with increased probability due to growth ratio', () => {
      act(() => {
        useLodgeStore.setState({ lodges: 1 });
      });

      // 0.015 is greater than BEAVER_ARRIVAL_RATE (0.01) but less than 0.01 * 1.75 (0.0175)
      vi.mocked(Math.random).mockReturnValue(0.015);

      act(() => {
        useTimeStore.getState().tick();
      });

      expect(useBeaverStore.getState().beavers.length).toBe(1);
      expect(useLogStore.getState().logs[0].message).toBe('A new beaver has joined the colony!');
    });

    it('should not add a beaver if at capacity', () => {
      act(() => {
        useLodgeStore.setState({ lodges: 1 }); // 2 capacity
        useBeaverStore.getState().addBeavers(2);
        useBerryStore.getState().increaseBerries(100); // Prevent starvation in this test
      });

      vi.mocked(Math.random).mockReturnValue(0); // Always succeed arrival check

      act(() => {
        useTimeStore.getState().tick();
      });

      expect(useBeaverStore.getState().beavers.length).toBe(2);
    });
  });
});
