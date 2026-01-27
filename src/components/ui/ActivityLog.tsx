import { ScrollText } from 'lucide-react';

export function ActivityLog() {
    return (
        <section className="bg-gray-900/40 border border-gray-800 rounded-xl p-5 shadow-sm h-full flex flex-col min-h-[400px]">
            <div className="flex items-center gap-2 mb-4 text-gray-400">
                <ScrollText size={18} />
                <h2 className="text-sm font-bold uppercase tracking-widest">Activity Log</h2>
            </div>
            <div className="flex-1 bg-black/20 rounded-lg p-4 font-mono text-xs text-gray-500 space-y-2 overflow-y-auto">
                <p className="text-blue-400/80 tracking-tight">[{new Date().toLocaleTimeString()}] System initialized.</p>
                <p className="tracking-tight">[{new Date().toLocaleTimeString()}] Welcome to your new colony, Overseer.</p>
            </div>
        </section>
    );
}
