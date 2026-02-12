import { Settings2 } from 'lucide-react';
import { useBerryStore } from '../../store/useBerryStore';
import { useBeaverStore } from '@/store/useBeaverStore';
import { useWoodStore } from '@/store/useWoodStore';
import { useMudStore } from '@/store/useMudStore';
import { useBerryFieldStore } from '@/store/useBerryFieldStore';
import { useLodgeStore } from '@/store/useLodgeStore';
import { formatResource } from '@/utils/numberHelper';
import { LODGE_CAPACITY } from '@/config/game';

export function Statistics() {
    const berries = useBerryStore((state) => state.berries);
    const beavers = useBeaverStore((state) => state.beavers);
    const wood = useWoodStore((state) => state.wood);
    const mud = useMudStore((state) => state.mud);
    const berryFields = useBerryFieldStore((state) => state.berryFields);
    const lodges = useLodgeStore((state) => state.lodges);

    const totalCapacity = lodges * LODGE_CAPACITY;

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
                        {formatResource(wood)}
                    </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                    <span className="text-gray-400 text-sm">Total Mud</span>
                    <span data-testid="mud-count-stats" className="font-mono text-white">
                        {formatResource(mud)}
                    </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                    <span className="text-gray-400 text-sm">Total Berries</span>
                    <span data-testid="berry-count-stats" className="font-mono text-white">
                        {formatResource(berries)}
                    </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                    <span className="text-gray-400 text-sm">Berry Fields</span>
                    <span data-testid="berry-field-count-stats" className="font-mono text-white">
                        {berryFields}
                    </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                    <span className="text-gray-400 text-sm">Lodges</span>
                    <span data-testid="lodge-count-stats" className="font-mono text-white">
                        {lodges}
                    </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                    <span className="text-gray-400 text-sm">Housing Capacity</span>
                    <span data-testid="housing-capacity-stats" className="font-mono text-white">
                        {totalCapacity}
                    </span>
                </div>
            </div>
        </section>
    );
}
