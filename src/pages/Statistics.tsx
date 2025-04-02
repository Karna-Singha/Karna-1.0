
import React from 'react';
import Sidebar from '@/components/Sidebar';
import StatsOverview from '@/components/StatsOverview';

const Statistics = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Statistics</h1>
            <p className="text-muted-foreground">
              View detailed statistics about your productivity and progress.
            </p>
          </header>
          
          <StatsOverview />
        </div>
      </main>
    </div>
  );
};

export default Statistics;
