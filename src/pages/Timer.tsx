import * as React from 'react';
import Sidebar from '@/components/Sidebar';
import WorkTimer from '@/components/WorkTimer';
import TaskManagement from '@/components/TaskManagement';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Timer = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Focus Timer</h1>
              <p className="text-muted-foreground">
                Track your work sessions and manage your productivity.
              </p>
            </div>
            <ThemeToggle />
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="grid place-items-center">
              <WorkTimer />
            </div>
            <div>
              <TaskManagement />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Timer;
