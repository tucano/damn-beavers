import { TreePine, Pause, Play } from 'lucide-react';
import { useBerryStore } from '../../store/useBerryStore';
import { useBeaverStore } from '@/store/useBeaverStore';
import { useWoodStore } from '@/store/useWoodStore';
import { useMudStore } from '@/store/useMudStore';
import { useTimeStore } from '@/store/useTimeStore';
import { formatGameTime } from '@/utils/gameTimeHelper';
import { formatResource } from '@/utils/numberHelper';

export function AppBar() {
    const { berries } = useBerryStore();
    const { beavers } = useBeaverStore();
    const { wood } = useWoodStore();
    const { mud } = useMudStore();
    const { days, isPaused, togglePause } = useTimeStore();

    return (
        <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-[#8B4513] p-2 rounded-lg">
                        <TreePine className="text-white" size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-white">Damn Beavers</h1>
                        <div className="flex items-center gap-2">
                            <p className="text-xs text-blue-400 font-medium">Build. Manage. Dominate.</p>
                            <span className="text-gray-600">|</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-mono text-gray-400">{formatGameTime(days)}</span>
                                <button
                                    onClick={togglePause}
                                    className="p-1 hover:bg-gray-800 rounded-md transition-colors text-gray-400 hover:text-white"
                                    title={isPaused ? "Resume" : "Pause"}
                                >
                                    {isPaused ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Beavers</span>
                        <span data-testid="beaver-count-header" className="text-lg font-mono font-bold text-yellow-500">{beavers.length}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Wood</span>
                        <span data-testid="wood-count-header" className="text-lg font-mono font-bold text-orange-400">{formatResource(wood)}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Mud</span>
                        <span data-testid="mud-count-header" className="text-lg font-mono font-bold text-brown-500">{formatResource(mud)}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Berries</span>
                        <span data-testid="berry-count-header" className="text-lg font-mono font-bold text-green-500">{formatResource(berries)}</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
