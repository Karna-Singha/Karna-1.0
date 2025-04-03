import * as React from 'react';
import Sidebar from '@/components/Sidebar';
import WorkTimer from '@/components/WorkTimer';
import TaskManagement from '@/components/TaskManagement';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTask } from '@/contexts/TaskContext';
import { useTimer } from '@/contexts/TimerContext';

const Timer = () => {
  // Use our context hooks instead of local state
  const { workSeconds, breakSeconds, productivityRatio } = useTimer();
  const { tasks } = useTask();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-10 flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-4xl font-bold text-karna-accent">Karna.app</h1>
              <div className="ml-6 h-8 w-[2px] bg-border"></div>
              <p className="ml-6 text-muted-foreground">
                Track your work sessions and manage your productivity.
              </p>
            </div>
            <ThemeToggle />
          </header>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
            <div className="flex items-center justify-center p-4 min-h-[500px]">
              <div className="w-full max-w-xl transform scale-110">
                <WorkTimer />
              </div>
            </div>
            <div className="flex items-center justify-center p-4 min-h-[500px]">
              <div className="w-full max-w-xl transform scale-110">
                <TaskManagement />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Timer;
