import { ScrollText } from 'lucide-react';
import { useLogStore } from '@/store/useLogStore';
import { getLogTypeColor } from '@/utils/logHelper';

export function ActivityLog() {
    const { logs } = useLogStore();

    return (
        <section className="bg-gray-900/40 border border-gray-800 rounded-xl p-5 shadow-sm h-full flex flex-col min-h-[400px]">
            <div className="flex items-center gap-2 mb-4 text-gray-400">
                <ScrollText size={18} />
                <h2 className="text-sm font-bold uppercase tracking-widest">Activity Log</h2>
            </div>
            <div className="flex-1 bg-black/20 rounded-lg p-4 font-mono text-xs space-y-2 overflow-y-auto">
                {logs.length === 0 ? (
                    <p className="text-gray-600 italic">No activity yet...</p>
                ) : (
                    logs.map((log) => (
                        <p key={log.id} className="tracking-tight flex gap-2">
                            <span className="text-gray-500 shrink-0">
                                [{new Date(log.timestamp).toLocaleTimeString()}]
                            </span>
                            <span className={getLogTypeColor(log.type)}>{log.message}</span>
                        </p>
                    ))
                )}
            </div>
        </section>
    );
}
