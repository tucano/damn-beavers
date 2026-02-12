import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useBerryFieldStore } from './useBerryFieldStore';
import { useBerryStore } from './useBerryStore';
import { useTimeStore } from './useTimeStore';
import { useBeaverStore } from './useBeaverStore';
import {
    BERRY_FIELD_BASE_COST,
    BERRY_FIELD_PRODUCTION_PER_TICK,
    TICKS_PER_DAY,
    WINTER_DAYS,
    SPRING_DAYS,
    SUMMER_DAYS
} from '../config/game';

describe('useBerryFieldStore', () => {
  beforeEach(() => {
    act(() => {
      useBerryFieldStore.getState().reset();
      useBerryStore.getState().reset();
      useTimeStore.getState().reset();
      useBeaverStore.getState().reset();
    });
  });

  it('should have 0 berry fields initially', () => {
    const { result } = renderHook(() => useBerryFieldStore());
    expect(result.current.berryFields).toBe(0);
  });

  it('should not build a berry field if not enough berries', () => {
    const { result } = renderHook(() => useBerryFieldStore());

    act(() => {
      result.current.buildBerryField();
    });

    expect(result.current.berryFields).toBe(0);
  });

  it('should build a berry field if enough berries', () => {
    const { result } = renderHook(() => useBerryFieldStore());

    act(() => {
      useBerryStore.getState().increaseBerries(BERRY_FIELD_BASE_COST);
    });

    act(() => {
      result.current.buildBerryField();
    });

    expect(result.current.berryFields).toBe(1);
    expect(useBerryStore.getState().berries).toBe(0);
  });

  it('should increase berries daily based on fields and season', () => {
    const { result } = renderHook(() => useBerryFieldStore());

    act(() => {
      useBerryStore.getState().increaseBerries(BERRY_FIELD_BASE_COST);
      result.current.buildBerryField();
      // Reset berries after build to easily track production
      useBerryStore.getState().reset();
    });

    expect(result.current.berryFields).toBe(1);

    // Day 0 is Winter.
    // Tick to Day 1.
    act(() => {
      useTimeStore.getState().increaseDays(1);
    });

    // Winter modifier is 0.25
    // Daily production = PER_TICK * TICKS_PER_DAY
    expect(useBerryStore.getState().berries).toBeCloseTo(BERRY_FIELD_PRODUCTION_PER_TICK * TICKS_PER_DAY * 0.25);
  });

  it('should use Spring modifier (1.5x)', () => {
    const { result } = renderHook(() => useBerryFieldStore());

    act(() => {
      useBerryStore.getState().increaseBerries(BERRY_FIELD_BASE_COST);
      result.current.buildBerryField();

      // Jump to Spring
      useTimeStore.getState().increaseDays(WINTER_DAYS);
    });

    expect(useTimeStore.getState().days).toBe(WINTER_DAYS);

    act(() => {
      // Reset berries AFTER jumping to ensure we only count the next day's production
      useBerryStore.getState().reset();
      useTimeStore.getState().increaseDays(1);
    });

    expect(useBerryStore.getState().berries).toBeCloseTo(BERRY_FIELD_PRODUCTION_PER_TICK * TICKS_PER_DAY * 1.5);
  });

  it('should use Summer modifier (1.0x)', () => {
    const { result } = renderHook(() => useBerryFieldStore());

    act(() => {
      useBerryStore.getState().increaseBerries(BERRY_FIELD_BASE_COST);
      result.current.buildBerryField();

      // Jump to Summer
      useTimeStore.getState().increaseDays(WINTER_DAYS + SPRING_DAYS);
    });

    expect(useTimeStore.getState().days).toBe(WINTER_DAYS + SPRING_DAYS);

    act(() => {
      useBerryStore.getState().reset();
      useTimeStore.getState().increaseDays(1);
    });

    expect(useBerryStore.getState().berries).toBeCloseTo(BERRY_FIELD_PRODUCTION_PER_TICK * TICKS_PER_DAY * 1.0);
  });

  it('should use Autumn modifier (1.0x)', () => {
    const { result } = renderHook(() => useBerryFieldStore());

    act(() => {
      useBerryStore.getState().increaseBerries(BERRY_FIELD_BASE_COST);
      result.current.buildBerryField();

      // Jump to Autumn
      useTimeStore.getState().increaseDays(WINTER_DAYS + SPRING_DAYS + SUMMER_DAYS);
    });

    expect(useTimeStore.getState().days).toBe(WINTER_DAYS + SPRING_DAYS + SUMMER_DAYS);

    act(() => {
      useBerryStore.getState().reset();
      useTimeStore.getState().increaseDays(1);
    });

    expect(useBerryStore.getState().berries).toBeCloseTo(BERRY_FIELD_PRODUCTION_PER_TICK * TICKS_PER_DAY * 1.0);
  });
});
