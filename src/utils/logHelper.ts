import type { LogType } from "@/types/log";


export const getLogTypeColor = (type: LogType) => {
    switch (type) {
        case 'success':
            return 'text-green-400/80';
        case 'warning':
            return 'text-yellow-400/80';
        case 'error':
            return 'text-red-400/80';
        case 'info':
        default:
            return 'text-blue-400/80';
    }
};
