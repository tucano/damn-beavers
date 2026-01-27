import { describe, it, expect } from 'vitest';
import { formatGameTime } from './gameTimeHelper';
import { WINTER_DAYS, SPRING_DAYS, SUMMER_DAYS } from '@/config/game';

describe('gameTimeHelper', () => {
    describe('formatGameTime', () => {
        it('formats day 0 correctly (Year 1, Winter, Day 1)', () => {
            expect(formatGameTime(0)).toBe('Year 1 - Winter - Day 1');
        });

        it('formats last day of Winter correctly', () => {
            expect(formatGameTime(WINTER_DAYS - 1)).toBe(`Year 1 - Winter - Day ${WINTER_DAYS}`);
        });

        it('formats first day of Spring correctly', () => {
            expect(formatGameTime(WINTER_DAYS)).toBe('Year 1 - Spring - Day 1');
        });

        it('formats first day of Summer correctly', () => {
            expect(formatGameTime(WINTER_DAYS + SPRING_DAYS)).toBe('Year 1 - Summer - Day 1');
        });

        it('formats first day of Autumn correctly', () => {
            expect(formatGameTime(WINTER_DAYS + SPRING_DAYS + SUMMER_DAYS)).toBe('Year 1 - Autumn - Day 1');
        });

        it('formats first day of Year 2 correctly', () => {
            expect(formatGameTime(365)).toBe('Year 2 - Winter - Day 1');
        });

        it('formats a day in the middle of Summer correctly', () => {
            // Winter 90 + Spring 92 + 15 days of Summer
            const days = 90 + 92 + 14;
            expect(formatGameTime(days)).toBe('Year 1 - Summer - Day 15');
        });
    });
});
