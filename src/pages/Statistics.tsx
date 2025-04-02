
import React from 'react';
import Sidebar from '@/components/Sidebar';
import StatsOverview from '@/components/StatsOverview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Productivity Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Your most productive day is <span className="font-medium text-primary">Friday</span>, with an average productivity ratio of <span className="font-medium text-primary">85%</span>.
                  </p>
                  <p className="text-muted-foreground">
                    You've completed <span className="font-medium text-primary">24 tasks</span> this week, which is <span className="font-medium text-green-500">15% more</span> than last week.
                  </p>
                  <p className="text-muted-foreground">
                    Your average study session lasts <span className="font-medium text-primary">45 minutes</span>, which is optimal for deep focus.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Statistics;
