import { DAYS_IN_YEAR, WINTER_DAYS, SPRING_DAYS, SUMMER_DAYS } from '@/config/game';

export const formatGameTime = (totalDays: number): string => {
    const year = Math.floor(totalDays / DAYS_IN_YEAR) + 1;
    const dayOfYear = totalDays % DAYS_IN_YEAR;

    let season = '';
    let seasonDay = 0;

    if (dayOfYear < WINTER_DAYS) {
        season = 'Winter';
        seasonDay = dayOfYear + 1;
    } else if (dayOfYear < WINTER_DAYS + SPRING_DAYS) {
        season = 'Spring';
        seasonDay = dayOfYear - WINTER_DAYS + 1;
    } else if (dayOfYear < WINTER_DAYS + SPRING_DAYS + SUMMER_DAYS) {
        season = 'Summer';
        seasonDay = dayOfYear - (WINTER_DAYS + SPRING_DAYS) + 1;
    } else {
        season = 'Autumn';
        seasonDay = dayOfYear - (WINTER_DAYS + SPRING_DAYS + SUMMER_DAYS) + 1;
    }

    return `Year ${year} - ${season} - Day ${seasonDay}`;
};
