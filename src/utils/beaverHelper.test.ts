import { describe, it, expect } from 'vitest';
import { getRandomBeaverName } from './beaverHelper';
import { BEAVER_NAMES } from '@/config/names';

describe('beaverHelper', () => {
    describe('getRandomBeaverName', () => {
        it('returns a string', () => {
            const name = getRandomBeaverName();
            expect(typeof name).toBe('string');
        });

        it('returns a name from the BEAVER_NAMES list', () => {
            const name = getRandomBeaverName();
            expect(BEAVER_NAMES).toContain(name);
        });

        it('returns different names over multiple calls', () => {
            const names = new Set();
            for (let i = 0; i < 100; i++) {
                names.add(getRandomBeaverName());
            }
            // With 100 names in the list, the probability of getting 
            // the same name 100 times is astronomical.
            expect(names.size).toBeGreaterThan(1);
        });
    });
});
