import { TreePine, Barrel, ScrollText, Pickaxe, Settings2 } from 'lucide-react';
import { useBerryStore } from '../store/useBerryStore';
import { useBeaverStore } from '@/store/useBeaverStore';

function Home() {
  const { berries, increaseBerries, reset } = useBerryStore();
  const { beavers, addBeavers, resetBeavers } = useBeaverStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1a1a] text-white font-sans">
      {/* App Bar */}
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
              <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Berries</span>
              <span data-testid="berry-count-header" className="text-lg font-mono font-bold text-green-500">{berries}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Left Column: Stats & Dev Controls */}
        <div className="space-y-6">
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
                onClick={reset}
                className="flex-1 py-2 px-4 bg-red-900/20 hover:bg-red-900/40 text-red-400 text-sm font-semibold rounded-lg transition-all border border-red-900/50"
              >
                Reset
              </button>
            </div>
          </section>

          <section className="bg-gray-900/40 border border-gray-800 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-gray-400">
              <Settings2 size={18} />
              <h2 className="text-sm font-bold uppercase tracking-widest">Statistics</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                <span className="text-gray-400 text-sm">Population</span>
                <span data-testid="beaver-count-stats" className="font-mono text-white">{beavers.length}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-800/50">
                <span className="text-gray-400 text-sm">Total Berries</span>
                <span data-testid="berry-count-stats" className="font-mono text-white">{berries}</span>
              </div>
            </div>
          </section>
        </div>

        {/* Middle Column: Actions */}
        <div className="space-y-6">
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
        </div>

        {/* Right Column: Log */}
        <div className="space-y-6">
          <section className="bg-gray-900/40 border border-gray-800 rounded-xl p-5 shadow-sm h-full flex flex-col min-h-[400px]">
            <div className="flex items-center gap-2 mb-4 text-gray-400">
              <ScrollText size={18} />
              <h2 className="text-sm font-bold uppercase tracking-widest">Activity Log</h2>
            </div>
            <div className="flex-1 bg-black/20 rounded-lg p-4 font-mono text-xs text-gray-500 space-y-2 overflow-y-auto">
              <p className="text-blue-400/80 tracking-tight">[{new Date().toLocaleTimeString()}] System initialized.</p>
              <p className="tracking-tight">[{new Date().toLocaleTimeString()}] Welcome to your new colony, Overseer.</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Home;
