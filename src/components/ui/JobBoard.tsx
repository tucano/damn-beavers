import { Briefcase } from 'lucide-react';
import { useBeaverStore } from '@/store/useBeaverStore';
import { WOOD_GNAWER_PRODUCTION_PER_DAY } from '@/config/game';

export function JobBoard() {
    const { beavers, assignJob, unassignJob } = useBeaverStore();

    const unemployedCount = beavers.filter((b) => !b.job).length;
    const woodGnawerCount = beavers.filter((b) => b.job === 'woodGnawer').length;

    const handleAssign = (job: string, count: number) => {
        if (count === -1) { // All
            assignJob(job, unemployedCount);
        } else {
            assignJob(job, count);
        }
    };

    const handleUnassign = (job: string, count: number) => {
        if (count === -1) { // All
            unassignJob(job, woodGnawerCount);
        } else {
            unassignJob(job, count);
        }
    };

    return (
        <section className="bg-gray-900/60 border border-gray-700 rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-6 text-blue-400">
                <Briefcase size={20} />
                <h2 className="text-sm font-bold uppercase tracking-widest">Job Board</h2>
            </div>

            <div className="flex justify-between items-center mb-4 text-sm text-gray-400">
                <span>Unemployed Beavers:</span>
                <span className="text-white font-bold">{unemployedCount}</span>
            </div>

            <div className="space-y-4">
                {/* Wood Gnawer Row */}
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <span className="font-bold text-white block">Wood Gnawer</span>
                            <span className="text-xs text-gray-500">
                                +{(woodGnawerCount * WOOD_GNAWER_PRODUCTION_PER_DAY).toFixed(2)} Wood / day
                            </span>
                        </div>
                        <span className="text-xl font-mono text-white">{woodGnawerCount}</span>
                    </div>

                    <div className="flex gap-2 justify-between mt-3">
                         <div className="flex gap-1">
                            <button
                                onClick={() => handleUnassign('woodGnawer', -1)}
                                disabled={woodGnawerCount === 0}
                                className="px-2 py-1 bg-red-900/40 text-red-200 text-xs rounded hover:bg-red-800/60 disabled:opacity-30 disabled:cursor-not-allowed"
                                title="Unassign All"
                            >
                                -All
                            </button>
                            <button
                                onClick={() => handleUnassign('woodGnawer', 5)}
                                disabled={woodGnawerCount < 5}
                                className="px-2 py-1 bg-red-900/40 text-red-200 text-xs rounded hover:bg-red-800/60 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                -5
                            </button>
                            <button
                                onClick={() => handleUnassign('woodGnawer', 1)}
                                disabled={woodGnawerCount === 0}
                                className="px-2 py-1 bg-red-900/40 text-red-200 text-xs rounded hover:bg-red-800/60 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                -
                            </button>
                        </div>

                        <div className="flex gap-1">
                            <button
                                onClick={() => handleAssign('woodGnawer', 1)}
                                disabled={unemployedCount === 0}
                                className="px-2 py-1 bg-green-900/40 text-green-200 text-xs rounded hover:bg-green-800/60 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                +
                            </button>
                             <button
                                onClick={() => handleAssign('woodGnawer', 5)}
                                disabled={unemployedCount < 5}
                                className="px-2 py-1 bg-green-900/40 text-green-200 text-xs rounded hover:bg-green-800/60 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                +5
                            </button>
                            <button
                                onClick={() => handleAssign('woodGnawer', -1)}
                                disabled={unemployedCount === 0}
                                className="px-2 py-1 bg-green-900/40 text-green-200 text-xs rounded hover:bg-green-800/60 disabled:opacity-30 disabled:cursor-not-allowed"
                                title="Assign All"
                            >
                                +All
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
