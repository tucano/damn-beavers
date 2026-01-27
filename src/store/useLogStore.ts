import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LogEntry, LogType } from '../types/log';

interface LogState {
    logs: LogEntry[];
    addLog: (message: string, type?: LogType) => void;
    reset: () => void;
}

export const useLogStore = create<LogState>()(
    persist(
        (set) => ({
            logs: [],
            addLog: (message, type = 'info') =>
                set((state) => ({
                    logs: [
                        {
                            id: crypto.randomUUID(),
                            message,
                            type,
                            timestamp: Date.now(),
                        },
                        ...state.logs,
                    ].slice(0, 50),
                })),
            reset: () => set({ logs: [] }),
        }),
        {
            name: 'log-storage',
        }
    )
);
