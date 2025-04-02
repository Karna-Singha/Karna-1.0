
import React from 'react';
import Sidebar from '@/components/Sidebar';
import TaskManagement from '@/components/TaskManagement';

const Tasks = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Tasks</h1>
            <p className="text-muted-foreground">
              Manage your tasks and track your progress.
            </p>
          </header>
          
          <TaskManagement />
        </div>
      </main>
    </div>
  );
};

export default Tasks;
