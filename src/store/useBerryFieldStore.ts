import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useTimeStore } from './useTimeStore';
import { useBerryStore } from './useBerryStore';
import {
    BERRY_FIELD_BASE_COST,
    BERRY_FIELD_PRICE_RATIO,
    BERRY_FIELD_PRODUCTION_PER_TICK,
    TICKS_PER_DAY
} from '@/config/game';
import { getSeason } from '@/utils/gameTimeHelper';

interface BerryFieldState {
    berryFields: number;
    buildBerryField: () => void;
    reset: () => void;
}

export const useBerryFieldStore = create<BerryFieldState>()(
    persist(
        (set, get) => ({
            berryFields: 0,
            buildBerryField: () => {
                const { berryFields } = get();
                const berryStore = useBerryStore.getState();
                const cost = Math.floor(BERRY_FIELD_BASE_COST * Math.pow(BERRY_FIELD_PRICE_RATIO, berryFields));

                if (berryStore.berries >= cost) {
                    berryStore.increaseBerries(-cost);
                    set({ berryFields: berryFields + 1 });
                }
            },
            reset: () => set({ berryFields: 0 }),
        }),
        {
            name: 'berry-field-storage',
        }
    )
);

// Subscribe to game tick
useTimeStore.subscribe(
    (state) => state.ticks,
    (ticks, prevTicks) => {
        if (ticks > prevTicks) {
            const ticksPassed = ticks - prevTicks;
            const { berryFields } = useBerryFieldStore.getState();

            if (berryFields > 0) {
                let totalProduction = 0;

                for(let i=0; i<ticksPassed; i++) {
                    const currentTick = prevTicks + i + 1;
                    const currentDay = Math.floor(currentTick / TICKS_PER_DAY);
                    const season = getSeason(currentDay);
                    let modifier = 1.0;

                    switch (season) {
                        case 'Spring':
                            modifier = 1.5;
                            break;
                        case 'Summer':
                        case 'Autumn':
                            modifier = 1.0;
                            break;
                        case 'Winter':
                            modifier = 0.25;
                            break;
                    }
                    totalProduction += berryFields * BERRY_FIELD_PRODUCTION_PER_TICK * modifier;
                }

                if (totalProduction > 0) {
                    useBerryStore.getState().increaseBerries(totalProduction);
                }
            }
        }
    }
);
