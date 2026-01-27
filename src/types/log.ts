export type LogType = 'info' | 'success' | 'warning' | 'error';

export interface LogEntry {
    id: string;
    message: string;
    type: LogType;
    timestamp: number;
}
