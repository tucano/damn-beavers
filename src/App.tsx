import { TreePine, Pickaxe } from 'lucide-react';

function App() {
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
            <span className="text-gray-400">Wood</span>
            <span className="text-2xl font-mono">0</span>
          </div>
          <button className="w-full py-3 px-6 bg-[#8B4513] hover:bg-[#A0522D] text-white font-bold rounded-md flex items-center justify-center gap-2 transition-colors">
            <Pickaxe size={20} />
            Gnaw Wood
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
