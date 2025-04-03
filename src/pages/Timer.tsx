
import * as React from 'react';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import WorkTimer from '@/components/WorkTimer';
import TaskManagement from '@/components/TaskManagement';
import AIInsights from '@/components/AIInsights';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Timer = () => {
  const [workSeconds, setWorkSeconds] = useState<number>(0);
  const [breakSeconds, setBreakSeconds] = useState<number>(0);
  const [productivityRatio, setProductivityRatio] = useState<number>(100);
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Complete physics problems from chapter 5',
      subject: 'Physics',
      difficulty: 4,
      completed: false,
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Review organic chemistry nomenclature',
      subject: 'Organic Chemistry',
      difficulty: 3,
      completed: false,
      createdAt: new Date()
    }
  ]);

  // Handler for WorkTimer to update timer states
  const handleTimerUpdate = (work: number, break_: number, ratio: number) => {
    setWorkSeconds(work);
    setBreakSeconds(break_);
    setProductivityRatio(ratio);
  };

  // Handler for TaskManagement to update tasks
  const handleTasksUpdate = (updatedTasks: any[]) => {
    setTasks(updatedTasks);
  };

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
            <div>
              <WorkTimer 
                onTimerUpdate={handleTimerUpdate}
                initialWorkSeconds={workSeconds}
                initialBreakSeconds={breakSeconds}
                initialProductivityRatio={productivityRatio}
              />
              <div className="mt-6">
                <AIInsights 
                  workSeconds={workSeconds}
                  breakSeconds={breakSeconds}
                  productivityRatio={productivityRatio}
                  tasks={tasks}
                />
              </div>
            </div>
            <div>
              <TaskManagement 
                onTasksUpdate={handleTasksUpdate}
                initialTasks={tasks}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Timer;
