import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useBerriesStore } from './berries.store';

describe('useBerriesStore', () => {
  beforeEach(() => {
    act(() => {
      useBerriesStore.getState().reset();
    });
  });

  it('should have an initial count of 0', () => {
    const { result } = renderHook(() => useBerriesStore());

    expect(result.current.count).toBe(0);
  });

  it('should increment the count by 1', () => {
    const { result } = renderHook(() => useBerriesStore());

    act(() => {
      result.current.inc();
    });

    expect(result.current.count).toBe(1);
  });

  it('should reset the count to 0', () => {
    const { result } = renderHook(() => useBerriesStore());

    act(() => {
      result.current.inc();
    });

    expect(result.current.count).toBe(1);

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(0);
  });
});
