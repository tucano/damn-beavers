import { BEAVER_NAMES } from '@/config/names';

/**
 * Picks a random name from the BEAVER_NAMES list.
 * @returns A random beaver name string.
 */
export const getRandomBeaverName = (): string => {
    const randomIndex = Math.floor(Math.random() * BEAVER_NAMES.length);
    return BEAVER_NAMES[randomIndex];
};
