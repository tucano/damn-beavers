import { Barrel, Pickaxe, Wheat, TreePine, Home } from 'lucide-react';
import { useBerryStore } from '@/store/useBerryStore';
import { useBerryFieldStore } from '@/store/useBerryFieldStore';
import { useWoodStore } from '@/store/useWoodStore';
import { useLodgeStore } from '@/store/useLodgeStore';
import { useLogStore } from '@/store/useLogStore';
import {
    BERRY_FIELD_BASE_COST,
    BERRY_FIELD_PRICE_RATIO,
    LODGE_BASE_COST_WOOD,
    LODGE_PRICE_RATIO
} from '@/config/game';

export function VillageActions() {
    const { berries, increaseBerries } = useBerryStore();
    const { berryFields, buildBerryField } = useBerryFieldStore();
    const { wood, increaseWood } = useWoodStore();
    const { lodges, buildLodge } = useLodgeStore();
    const { addLog } = useLogStore();

    const handleGatherBerries = () => {
        increaseBerries(1);
        addLog('Gathered 1 berry', 'success');
    };

    const canAffordGnaw = berries >= 100;

    const handleGatherWood = () => {
        if (canAffordGnaw) {
            increaseBerries(-100);
            increaseWood(1);
            addLog('Gnawed some wood for 100 berries', 'success');
        }
    };

    const nextFieldCost = Math.floor(BERRY_FIELD_BASE_COST * Math.pow(BERRY_FIELD_PRICE_RATIO, berryFields));
    const canAffordField = berries >= nextFieldCost;

    const handleBuildBerryField = () => {
        if (canAffordField) {
            buildBerryField();
            addLog(`Built a Berry Field for ${nextFieldCost} berries`, 'success');
        }
    };

    const nextLodgeWoodCost = Math.floor(LODGE_BASE_COST_WOOD * Math.pow(LODGE_PRICE_RATIO, lodges));
    const canAffordLodge = wood >= nextLodgeWoodCost;

    const handleBuildLodge = () => {
        if (canAffordLodge) {
            buildLodge();
            addLog(`Built a Lodge for ${nextLodgeWoodCost} wood`, 'success');
        }
    };

    return (
        <section className="bg-gray-900/60 border border-gray-700 rounded-xl p-6 shadow-md h-full min-h-[400px]">
            <div className="flex items-center gap-2 mb-6 text-yellow-500">
                <Pickaxe size={20} />
                <h2 className="text-sm font-bold uppercase tracking-widest">Village Actions</h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Gather Actions Grid */}
                <div className="grid grid-cols-1 gap-3">
                    <button
                        onClick={handleGatherBerries}
                        className="group w-full py-3 flex items-center justify-center gap-4 bg-gradient-to-br from-[#8B4513] to-[#5D2E0C] hover:from-[#A0522D] hover:to-[#8B4513] text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 active:translate-y-0 border-b-4 border-[#3D1F08]"
                    >
                        <Barrel size={24} />
                        <div className="flex flex-col items-start min-w-[120px]">
                            <span>Gather Berries</span>
                            <span className="text-[10px] text-white/60 font-normal">+1 Berry</span>
                        </div>
                    </button>
                    <button
                        onClick={handleGatherWood}
                        disabled={!canAffordGnaw}
                        className={`group w-full py-3 flex items-center justify-center gap-4 bg-gradient-to-br ${
                            canAffordGnaw
                            ? 'from-[#5D2E0C] to-[#3D1F08] hover:from-[#8B4513] hover:to-[#5D2E0C] border-[#1A0D04]'
                            : 'from-gray-700 to-gray-800 cursor-not-allowed border-gray-900 opacity-60'
                        } text-white font-bold rounded-xl shadow-lg transition-all transform ${canAffordGnaw ? 'hover:-translate-y-1 active:translate-y-0' : ''} border-b-4`}
                    >
                        <TreePine size={24} />
                        <div className="flex flex-col items-start min-w-[120px]">
                            <span>Gnaw Wood</span>
                            <span className="text-[10px] text-white/60 font-normal">+1 Wood (-100 Berries)</span>
                        </div>
                    </button>
                </div>

                <hr className="border-gray-800" />

                {/* Build Actions */}
                <div className="grid grid-cols-1 gap-3">
                    <button
                        onClick={handleBuildBerryField}
                        disabled={!canAffordField}
                        className={`group w-full p-4 flex items-center gap-4 bg-gradient-to-br ${
                            canAffordField
                            ? 'from-[#228B22] to-[#006400] hover:from-[#32CD32] hover:to-[#228B22] border-[#004d00]'
                            : 'from-gray-700 to-gray-800 cursor-not-allowed border-gray-900 opacity-60'
                        } text-white font-bold rounded-xl shadow-lg transition-all transform ${canAffordField ? 'hover:-translate-y-1 active:translate-y-0' : ''} border-b-4`}
                    >
                        <div className="bg-white/10 p-2 rounded-lg group-hover:scale-110 transition-transform">
                            <Wheat size={24} />
                        </div>
                        <div className="text-left">
                            <span className="block text-lg">Berry Field ({berryFields})</span>
                            <span className="text-xs text-white/60 font-normal">Cost: {nextFieldCost} Berries</span>
                        </div>
                    </button>

                    <button
                        onClick={handleBuildLodge}
                        disabled={!canAffordLodge}
                        className={`group w-full p-4 flex items-center gap-4 bg-gradient-to-br ${
                            canAffordLodge
                            ? 'from-[#4682B4] to-[#2F4F4F] hover:from-[#5F9EA0] hover:to-[#4682B4] border-[#1B2E2E]'
                            : 'from-gray-700 to-gray-800 cursor-not-allowed border-gray-900 opacity-60'
                        } text-white font-bold rounded-xl shadow-lg transition-all transform ${canAffordLodge ? 'hover:-translate-y-1 active:translate-y-0' : ''} border-b-4`}
                    >
                        <div className="bg-white/10 p-2 rounded-lg group-hover:scale-110 transition-transform">
                            <Home size={24} />
                        </div>
                        <div className="text-left">
                            <span className="block text-lg">Lodge ({lodges})</span>
                            <span className="text-xs text-white/60 font-normal">Cost: {nextLodgeWoodCost} Wood</span>
                        </div>
                    </button>
                </div>
            </div>
        </section>
    );
}
