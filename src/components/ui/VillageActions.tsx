import { Barrel, Pickaxe, Wheat } from 'lucide-react';
import { useBerryStore } from '@/store/useBerryStore';
import { useBerryFieldStore } from '@/store/useBerryFieldStore';
import { useLogStore } from '@/store/useLogStore';
import { BERRY_FIELD_BASE_COST, BERRY_FIELD_PRICE_RATIO } from '@/config/game';

export function VillageActions() {
    const { berries, increaseBerries } = useBerryStore();
    const { berryFields, buildBerryField } = useBerryFieldStore();
    const { addLog } = useLogStore();

    const handleGatherBerries = () => {
        increaseBerries(1);
        addLog('Gathered 1 berry', 'success');
    };

    const nextFieldCost = Math.floor(BERRY_FIELD_BASE_COST * Math.pow(BERRY_FIELD_PRICE_RATIO, berryFields));
    const canAffordField = berries >= nextFieldCost;

    const handleBuildBerryField = () => {
        if (canAffordField) {
            buildBerryField();
            addLog(`Built a Berry Field for ${nextFieldCost} berries`, 'success');
        }
    };

    return (
        <section className="bg-gray-900/60 border border-gray-700 rounded-xl p-6 shadow-md h-full min-h-[400px]">
            <div className="flex items-center gap-2 mb-6 text-yellow-500">
                <Pickaxe size={20} />
                <h2 className="text-sm font-bold uppercase tracking-widest">Village Actions</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <button
                    onClick={handleGatherBerries}
                    className="group w-full aspect-video flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#8B4513] to-[#5D2E0C] hover:from-[#A0522D] hover:to-[#8B4513] text-white font-bold rounded-2xl shadow-lg transition-all transform hover:-translate-y-1 active:translate-y-0 border-b-4 border-[#3D1F08]"
                >
                    <div className="bg-white/10 p-4 rounded-full group-hover:scale-110 transition-transform">
                        <Barrel size={40} />
                    </div>
                    <div className="text-center">
                        <span className="block text-xl">Gather Berries</span>
                        <span className="text-xs text-white/60 font-normal mt-1">+1 Berry</span>
                    </div>
                </button>

                <button
                    onClick={handleBuildBerryField}
                    disabled={!canAffordField}
                    className={`group w-full aspect-video flex flex-col items-center justify-center gap-4 bg-gradient-to-br ${
                        canAffordField
                        ? 'from-[#228B22] to-[#006400] hover:from-[#32CD32] hover:to-[#228B22] border-[#004d00]'
                        : 'from-gray-700 to-gray-800 cursor-not-allowed border-gray-900 opacity-60'
                    } text-white font-bold rounded-2xl shadow-lg transition-all transform ${canAffordField ? 'hover:-translate-y-1 active:translate-y-0' : ''} border-b-4`}
                >
                    <div className="bg-white/10 p-4 rounded-full group-hover:scale-110 transition-transform">
                        <Wheat size={40} />
                    </div>
                    <div className="text-center">
                        <span className="block text-xl">Berry Field ({berryFields})</span>
                        <span className="text-xs text-white/60 font-normal mt-1">Cost: {nextFieldCost} Berries</span>
                    </div>
                </button>
            </div>
        </section>
    );
}
