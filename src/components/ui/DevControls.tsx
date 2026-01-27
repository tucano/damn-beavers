import { Settings2 } from 'lucide-react';
import { useBerryStore } from '../../store/useBerryStore';
import { useBeaverStore } from '@/store/useBeaverStore';

export function DevControls() {
    const { reset } = useBerryStore();
    const { addBeavers, resetBeavers } = useBeaverStore();

    return (
        <section className="bg-gray-900/40 border border-gray-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-gray-400">
                <Settings2 size={18} />
                <h2 className="text-sm font-bold uppercase tracking-widest">Dev Controls</h2>
            </div>
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => addBeavers(1)}
                    className="flex-1 py-2 px-4 bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm font-semibold rounded-lg transition-all border border-gray-700"
                >
                    + Beaver
                </button>
                <button
                    onClick={() => {
                        reset();
                        resetBeavers();
                    }}
                    className="flex-1 py-2 px-4 bg-red-900/20 hover:bg-red-900/40 text-red-400 text-sm font-semibold rounded-lg transition-all border border-red-900/50"
                >
                    Reset
                </button>
            </div>
        </section>
    );
}
