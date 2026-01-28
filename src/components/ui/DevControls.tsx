import { Settings2 } from 'lucide-react';
import { useBerryStore } from '@/store/useBerryStore';
import { useBeaverStore } from '@/store/useBeaverStore';
import { useWoodStore } from '@/store/useWoodStore';
import { useMudStore } from '@/store/useMudStore';
import { useLogStore } from '@/store/useLogStore';
import { useTimeStore } from '@/store/useTimeStore';

export function DevControls() {
    const { reset: resetBerries } = useBerryStore();
    const { addBeavers, reset: resetBeavers } = useBeaverStore();
    const { increaseWood, reset: resetWood } = useWoodStore();
    const { increaseMud, reset: resetMud } = useMudStore();
    const { reset: resetLogs, addLog } = useLogStore();
    const { reset: resetTime } = useTimeStore();

    const handleReset = () => {
        resetBerries();
        resetBeavers();
        resetWood();
        resetMud();
        resetLogs();
        resetTime();
        addLog('Welcome to your new colony, Overseer.', 'info');
        addLog('System initialized.', 'info');
    };

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
                    onClick={() => increaseWood(10)}
                    className="flex-1 py-2 px-4 bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm font-semibold rounded-lg transition-all border border-gray-700"
                >
                    +10 Wood
                </button>
                <button
                    onClick={() => increaseMud(10)}
                    className="flex-1 py-2 px-4 bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm font-semibold rounded-lg transition-all border border-gray-700"
                >
                    +10 Mud
                </button>
                <button
                    onClick={resetTime}
                    className="flex-1 py-2 px-4 bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm font-semibold rounded-lg transition-all border border-gray-700"
                >
                    Reset Time
                </button>
                <button
                    onClick={handleReset}
                    className="w-full py-2 px-4 bg-red-900/20 hover:bg-red-900/40 text-red-400 text-sm font-semibold rounded-lg transition-all border border-red-900/50"
                >
                    Reset All
                </button>
            </div>
        </section>
    );
}
