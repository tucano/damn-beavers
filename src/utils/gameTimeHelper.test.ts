import { describe, it, expect } from 'vitest';
import { formatGameTime, formatBeaverAge } from './gameTimeHelper';
import { WINTER_DAYS, SPRING_DAYS, SUMMER_DAYS, DAYS_IN_YEAR } from '@/config/game';

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
            expect(formatGameTime(DAYS_IN_YEAR)).toBe('Year 2 - Winter - Day 1');
        });

        it('formats a day in the middle of Summer correctly', () => {
            // Winter 100 + Spring 100 + 15 days of Summer
            const days = WINTER_DAYS + SPRING_DAYS + 14;
            expect(formatGameTime(days)).toBe('Year 1 - Summer - Day 15');
        });
    });

    describe('formatBeaverAge', () => {
        it('formats < 1 year correctly', () => {
            expect(formatBeaverAge(20)).toBe('20 days');
        });

        it('formats 1 day correctly', () => {
            expect(formatBeaverAge(1)).toBe('1 day');
        });

        it('formats 0 days correctly', () => {
            expect(formatBeaverAge(0)).toBe('0 days');
        });

        it('formats 1 year correctly', () => {
            expect(formatBeaverAge(DAYS_IN_YEAR)).toBe('1 year');
        });

        it('formats > 1 year with days', () => {
            expect(formatBeaverAge(DAYS_IN_YEAR + 37)).toBe('1 year and 37 days');
        });

        it('formats > 1 year with 1 day', () => {
            expect(formatBeaverAge(DAYS_IN_YEAR + 1)).toBe('1 year and 1 day');
        });

        it('formats 2 years correctly', () => {
            expect(formatBeaverAge(DAYS_IN_YEAR * 2)).toBe('2 years');
        });

        it('formats 2 years and days', () => {
            expect(formatBeaverAge(DAYS_IN_YEAR * 2 + 20)).toBe('2 years and 20 days');
        });
    });
});
