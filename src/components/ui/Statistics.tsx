import { Settings2 } from 'lucide-react';
import { useBerryStore } from '../../store/useBerryStore';
import { useBeaverStore } from '@/store/useBeaverStore';
import { useWoodStore } from '@/store/useWoodStore';
import { useMudStore } from '@/store/useMudStore';

export function Statistics() {
    const { berries } = useBerryStore();
    const { beavers } = useBeaverStore();
    const { wood } = useWoodStore();
    const { mud } = useMudStore();

    return (
        <section className="bg-gray-900/40 border border-gray-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-gray-400">
                <Settings2 size={18} />
                <h2 className="text-sm font-bold uppercase tracking-widest">Statistics</h2>
            </div>
            <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                    <span className="text-gray-400 text-sm">Population</span>
                    <span data-testid="beaver-count-stats" className="font-mono text-white">
                        {beavers.length}
                    </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                    <span className="text-gray-400 text-sm">Total Wood</span>
                    <span data-testid="wood-count-stats" className="font-mono text-white">
                        {wood}
                    </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                    <span className="text-gray-400 text-sm">Total Mud</span>
                    <span data-testid="mud-count-stats" className="font-mono text-white">
                        {mud}
                    </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                    <span className="text-gray-400 text-sm">Total Berries</span>
                    <span data-testid="berry-count-stats" className="font-mono text-white">
                        {berries}
                    </span>
                </div>
            </div>
        </section>
    );
}
