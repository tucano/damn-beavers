import { Users } from 'lucide-react';
import { useBeaverStore } from '@/store/useBeaverStore';
import { formatBeaverAge } from '@/utils/gameTimeHelper';

export function BeaverList() {
    const { beavers } = useBeaverStore();

    return (
        <section className="bg-gray-900/40 border border-gray-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-gray-400">
                <Users size={18} />
                <h2 className="text-sm font-bold uppercase tracking-widest">Your Beavers</h2>
            </div>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {beavers.length === 0 ? (
                    <p className="text-gray-500 text-sm italic">No beavers in your colony yet.</p>
                ) : (
                    beavers.map((beaver, index) => (
                        <div
                            key={`${beaver.name}-${index}`}
                            data-testid={`beaver-item-${index}`}
                            className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/50"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-white">{beaver.name}</span>
                                <span className="text-xs text-gray-400">Age: {formatBeaverAge(beaver.age)}</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
                                <div
                                    data-testid={`beaver-health-bar-${index}`}
                                    className={`h-full transition-all duration-500 ${beaver.health > 50 ? 'bg-green-500' : beaver.health > 20 ? 'bg-yellow-500' : 'bg-red-500'
                                        }`}
                                    style={{ width: `${beaver.health}%` }}
                                />
                            </div>
                            <div className="flex justify-between mt-1">
                                <span className="text-[10px] text-gray-500 uppercase font-bold">Health</span>
                                <span className="text-[10px] text-gray-400 font-mono">{beaver.health}%</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
