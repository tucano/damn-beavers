import { useEffect } from 'react';
import { AppBar } from '@/components/ui/AppBar';
import { ActivityLog } from '@/components/ui/ActivityLog';
import { DevControls } from '@/components/ui/DevControls';
import { Statistics } from '@/components/ui/Statistics';
import { BeaverList } from '@/components/ui/BeaverList';
import { VillageActions } from '@/components/ui/VillageActions';
import { useTimeStore } from '@/store/useTimeStore';

function Home() {
  const { increaseDays, isPaused } = useTimeStore();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        increaseDays(1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [increaseDays, isPaused]);

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1a1a] text-white font-sans">
      <AppBar />

      <main className="flex-1 max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Left Column: Stats & Dev Controls */}
        <div className="space-y-6">
          <DevControls />
          <Statistics />
          <BeaverList />
        </div>

        {/* Middle Column: Actions */}
        <div className="space-y-6">
          <VillageActions />
        </div>

        {/* Right Column: Log */}
        <div className="space-y-6">
          <ActivityLog />
        </div>
      </main>
    </div>
  );
}

export default Home;
