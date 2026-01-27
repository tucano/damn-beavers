import { Barrel, Pickaxe } from 'lucide-react';
import { useBerryStore } from '../../store/useBerryStore';

export function VillageActions() {
    const { increaseBerries } = useBerryStore();

    return (
        <section className="bg-gray-900/60 border border-gray-700 rounded-xl p-6 shadow-md h-full min-h-[400px]">
            <div className="flex items-center gap-2 mb-6 text-yellow-500">
                <Pickaxe size={20} />
                <h2 className="text-sm font-bold uppercase tracking-widest">Village Actions</h2>
            </div>

            <button
                onClick={() => increaseBerries(1)}
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
        </section>
    );
}
