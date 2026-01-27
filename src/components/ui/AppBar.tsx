import { TreePine } from 'lucide-react';
import { useBerryStore } from '../../store/useBerryStore';
import { useBeaverStore } from '@/store/useBeaverStore';
import { useWoodStore } from '@/store/useWoodStore';
import { useMudStore } from '@/store/useMudStore';

export function AppBar() {
    const { berries } = useBerryStore();
    const { beavers } = useBeaverStore();
    const { wood } = useWoodStore();
    const { mud } = useMudStore();

    return (
        <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-[#8B4513] p-2 rounded-lg">
                        <TreePine className="text-white" size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-white">Damn Beavers</h1>
                        <p className="text-xs text-blue-400 font-medium">Build. Manage. Dominate.</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Beavers</span>
                        <span data-testid="beaver-count-header" className="text-lg font-mono font-bold text-yellow-500">{beavers.length}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Wood</span>
                        <span data-testid="wood-count-header" className="text-lg font-mono font-bold text-orange-400">{wood}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Mud</span>
                        <span data-testid="mud-count-header" className="text-lg font-mono font-bold text-brown-500">{mud}</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Berries</span>
                        <span data-testid="berry-count-header" className="text-lg font-mono font-bold text-green-500">{berries}</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
