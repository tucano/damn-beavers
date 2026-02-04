import { describe, it, expect } from 'vitest';
import { formatResource } from './numberHelper';

describe('numberHelper', () => {
  describe('formatResource', () => {
    it('formats integers to 2 decimal places', () => {
      expect(formatResource(10)).toBe('10.00');
    });

    it('formats floats to 2 decimal places', () => {
      expect(formatResource(10.123)).toBe('10.12');
      expect(formatResource(10.126)).toBe('10.13');
    });

    it('handles zero', () => {
      expect(formatResource(0)).toBe('0.00');
    });

    it('handles negative numbers', () => {
      expect(formatResource(-5.5)).toBe('-5.50');
    });
  });
});
