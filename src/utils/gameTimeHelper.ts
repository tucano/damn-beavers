import { DAYS_IN_YEAR, WINTER_DAYS, SPRING_DAYS, SUMMER_DAYS } from '@/config/game';

export type Season = 'Winter' | 'Spring' | 'Summer' | 'Autumn';

export const getSeason = (totalDays: number): Season => {
    const dayOfYear = totalDays % DAYS_IN_YEAR;

    if (dayOfYear < WINTER_DAYS) {
        return 'Winter';
    } else if (dayOfYear < WINTER_DAYS + SPRING_DAYS) {
        return 'Spring';
    } else if (dayOfYear < WINTER_DAYS + SPRING_DAYS + SUMMER_DAYS) {
        return 'Summer';
    } else {
        return 'Autumn';
    }
};

export const formatGameTime = (totalDays: number): string => {
    const year = Math.floor(totalDays / DAYS_IN_YEAR) + 1;
    const dayOfYear = totalDays % DAYS_IN_YEAR;
    const season = getSeason(totalDays);

    let seasonDay = 0;

    if (season === 'Winter') {
        seasonDay = dayOfYear + 1;
    } else if (season === 'Spring') {
        seasonDay = dayOfYear - WINTER_DAYS + 1;
    } else if (season === 'Summer') {
        seasonDay = dayOfYear - (WINTER_DAYS + SPRING_DAYS) + 1;
    } else {
        seasonDay = dayOfYear - (WINTER_DAYS + SPRING_DAYS + SUMMER_DAYS) + 1;
    }

    return `Year ${year} - ${season} - Day ${seasonDay}`;
};
