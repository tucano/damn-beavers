// Game constants
export const TICKS_PER_DAY = 10;
export const DAYS_IN_SEASON = 100;
export const DAYS_IN_YEAR = 400;

// Resource Consumption (Per Tick)
export const BERRY_CONSUMPTION_PER_TICK = 0.85;

// Season lengths
export const WINTER_DAYS = 100;
export const SPRING_DAYS = 100;
export const SUMMER_DAYS = 100;
export const AUTUMN_DAYS = 100;

// Game tick time
// 10 ticks per day means 100ms per tick
export const GAME_TICK_TIME = 1000 / TICKS_PER_DAY;

// Buildings & Production
export const BERRY_FIELD_BASE_COST = 10;
export const BERRY_FIELD_PRICE_RATIO = 1.12;
export const BERRY_FIELD_PRODUCTION_PER_TICK = 0.63;

export const LODGE_BASE_COST_WOOD = 50;
export const LODGE_PRICE_RATIO = 1.75;
export const LODGE_CAPACITY = 2;
export const BEAVER_ARRIVAL_RATE = 0.01;
export const BEAVER_GROWTH_RATIO = 0.75;
export const WOOD_GNAWER_PRODUCTION_PER_TICK = 0.018;
