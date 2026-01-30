import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useTimeStore } from './useTimeStore';
import { useBerryStore } from './useBerryStore';
import {
    BERRY_FIELD_BASE_COST,
    BERRY_FIELD_PRICE_RATIO,
    BERRY_FIELD_PRODUCTION_PER_DAY
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
    (state) => state.days,
    (days, prevDays) => {
        if (days > prevDays) {
            const { berryFields } = useBerryFieldStore.getState();
            if (berryFields > 0) {
                const season = getSeason(days);
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

                const production = berryFields * BERRY_FIELD_PRODUCTION_PER_DAY * modifier;
                useBerryStore.getState().increaseBerries(production);
            }
        }
    }
);
