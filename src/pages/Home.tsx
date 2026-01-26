import { TreePine, Barrel } from 'lucide-react';
import { useBerryStore } from '../store/useBerryStore';
import { useBeaverStore } from '@/store/useBeaverStore';

function Home() {
  const { berries, increaseBerries, reset } = useBerryStore();
  const { beavers, addBeavers } = useBeaverStore();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#1a1a1a] text-white">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold flex items-center justify-center gap-4 text-[#8B4513]">
          <TreePine size={64} />
          Damn Beavers
          <TreePine size={64} />
        </h1>
        <p className="text-xl text-blue-300">
          Build. Manage. Dominate.
        </p>
        <div className="p-6 border border-gray-700 rounded-lg bg-gray-900 shadow-xl max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Beavers</span>
            <span className="text-2xl font-mono">{beavers.length}</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Berries</span>
            <span className="text-2xl font-mono">{berries}</span>
          </div>
          <button
            onClick={() => increaseBerries(1)}
            className="w-full py-3 px-6 bg-[#8B4513] hover:bg-[#A0522D] text-white font-bold rounded-md flex items-center justify-center gap-2 transition-colors"
          >
            <Barrel size={20} />
            Gather Berries
          </button>
        </div>
        <div className="p-6 border border-gray-700 rounded-lg bg-gray-900 shadow-xl max-w-md mx-auto mt-6">
          <h2 className="text-xl font-bold mb-4 text-yellow-400">Dev Controls</h2>
          <button
            onClick={() => addBeavers(1)}
            className="w-full py-2 px-4 bg-[#8B4513] hover:bg-[#A0522D] text-white font-bold rounded-md transition-colors"
          >
            Add Beaver
          </button>
          <button
            onClick={reset}
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition-colors"
          >
            Reset Berries
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
