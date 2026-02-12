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
import { VillageActionButton } from './VillageActionButton';

export function VillageActions() {
    // Select specific actions and state
    const increaseBerries = useBerryStore((state) => state.increaseBerries);
    const berryFields = useBerryFieldStore((state) => state.berryFields);
    const buildBerryField = useBerryFieldStore((state) => state.buildBerryField);
    const increaseWood = useWoodStore((state) => state.increaseWood);
    const lodges = useLodgeStore((state) => state.lodges);
    const buildLodge = useLodgeStore((state) => state.buildLodge);
    const addLog = useLogStore((state) => state.addLog);

    const handleGatherBerries = () => {
        increaseBerries(1);
        addLog('Gathered 1 berry', 'success');
    };

    const canAffordGnaw = useBerryStore((state) => state.berries >= 100);

    const handleGatherWood = () => {
        if (canAffordGnaw) {
            increaseBerries(-100);
            increaseWood(1);
            addLog('Gnawed some wood for 100 berries', 'success');
        }
    };

    const nextFieldCost = Math.floor(BERRY_FIELD_BASE_COST * Math.pow(BERRY_FIELD_PRICE_RATIO, berryFields));
    // Select boolean result directly to avoid re-renders on every berry change
    const canAffordField = useBerryStore((state) => state.berries >= nextFieldCost);

    const handleBuildBerryField = () => {
        if (canAffordField) {
            buildBerryField();
            addLog(`Built a Berry Field for ${nextFieldCost} berries`, 'success');
        }
    };

    const nextLodgeWoodCost = Math.floor(LODGE_BASE_COST_WOOD * Math.pow(LODGE_PRICE_RATIO, lodges));
    // Select boolean result directly to avoid re-renders on every wood change
    const canAffordLodge = useWoodStore((state) => state.wood >= nextLodgeWoodCost);

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
                    <VillageActionButton
                        onClick={handleGatherBerries}
                        label="Gather Berries"
                        subLabel="+1 Berry"
                        icon={Barrel}
                        gradientClasses="from-[#8B4513] to-[#5D2E0C] hover:from-[#A0522D] hover:to-[#8B4513] border-[#3D1F08]"
                        variant="gather"
                    />
                    <VillageActionButton
                        onClick={handleGatherWood}
                        disabled={!canAffordGnaw}
                        label="Gnaw Wood"
                        subLabel="+1 Wood (-100 Berries)"
                        icon={TreePine}
                        gradientClasses="from-[#5D2E0C] to-[#3D1F08] hover:from-[#8B4513] hover:to-[#5D2E0C] border-[#1A0D04]"
                        variant="gather"
                    />
                </div>

                <hr className="border-gray-800" />

                {/* Build Actions */}
                <div className="grid grid-cols-1 gap-3">
                    <VillageActionButton
                        onClick={handleBuildBerryField}
                        disabled={!canAffordField}
                        label={`Berry Field (${berryFields})`}
                        subLabel={`Cost: ${nextFieldCost} Berries`}
                        icon={Wheat}
                        gradientClasses="from-[#228B22] to-[#006400] hover:from-[#32CD32] hover:to-[#228B22] border-[#004d00]"
                        variant="build"
                    />

                    <VillageActionButton
                        onClick={handleBuildLodge}
                        disabled={!canAffordLodge}
                        label={`Lodge (${lodges})`}
                        subLabel={`Cost: ${nextLodgeWoodCost} Wood`}
                        icon={Home}
                        gradientClasses="from-[#4682B4] to-[#2F4F4F] hover:from-[#5F9EA0] hover:to-[#4682B4] border-[#1B2E2E]"
                        variant="build"
                    />
                </div>
            </div>
        </section>
    );
}
