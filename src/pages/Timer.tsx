import * as React from 'react';
import Sidebar from '@/components/Sidebar';
import WorkTimer from '@/components/WorkTimer';
import TaskManagement from '@/components/TaskManagement';
import AIInsights from '@/components/AIInsights';
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
      
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <header className="mb-6 md:mb-10 flex justify-between items-center">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0">
              <h1 className="text-2xl md:text-4xl font-bold text-karna-accent">Karna.app</h1>
              <div className="hidden md:block ml-6 h-8 w-[2px] bg-border"></div>
              <p className="md:ml-6 text-sm md:text-base text-muted-foreground">
                Track your work sessions and manage your productivity.
              </p>
            </div>
            <ThemeToggle />
          </header>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-10">
            <div className="flex flex-col gap-6 md:gap-10">
              <div className="flex items-center justify-center">
                <div className="w-full max-w-xl">
                  <WorkTimer />
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="w-full max-w-xl">
                  <AIInsights 
                    workSeconds={workSeconds}
                    breakSeconds={breakSeconds}
                    productivityRatio={productivityRatio}
                    tasks={tasks}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-start justify-center min-h-[500px]">
              <div className="w-full max-w-xl">
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
