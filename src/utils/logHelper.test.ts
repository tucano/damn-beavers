import { describe, it, expect } from 'vitest';
import { getLogTypeColor } from './logHelper';

describe('logHelper', () => {
    describe('getLogTypeColor', () => {
        it('returns green for success', () => {
            expect(getLogTypeColor('success')).toBe('text-green-400/80');
        });

        it('returns yellow for warning', () => {
            expect(getLogTypeColor('warning')).toBe('text-yellow-400/80');
        });

        it('returns red for error', () => {
            expect(getLogTypeColor('error')).toBe('text-red-400/80');
        });

        it('returns blue for info', () => {
            expect(getLogTypeColor('info')).toBe('text-blue-400/80');
        });

        it('returns blue for unknown type', () => {
            // @ts-expect-error - testing fallback for invalid types
            expect(getLogTypeColor('unknown')).toBe('text-blue-400/80');
        });
    });
});
