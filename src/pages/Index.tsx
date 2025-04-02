
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import WorkTimer from '@/components/WorkTimer';
import TaskManagement from '@/components/TaskManagement';
import SubjectAssessment from '@/components/SubjectAssessment';
import StatsOverview from '@/components/StatsOverview';

const Index = () => {
  const [showAssessment, setShowAssessment] = useState<boolean>(false);
  
  // Check if it's a new month to show assessment form
  useEffect(() => {
    // In a real app, we would check against the user's last assessment date
    // For demo, let's just show it when the app loads
    const hasCompletedAssessment = localStorage.getItem('assessmentCompleted');
    if (!hasCompletedAssessment) {
      setShowAssessment(true);
    }
  }, []);
  
  const handleAssessmentClose = () => {
    // In a real app, we would save the date of completion
    localStorage.setItem('assessmentCompleted', 'true');
    setShowAssessment(false);
  };
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Track your study progress and manage your tasks.
            </p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <StatsOverview />
            </div>
            
            <div className="lg:col-span-1">
              <WorkTimer />
            </div>
          </div>
          
          <div className="mt-6">
            <TaskManagement />
          </div>
        </div>
      </main>
      
      <SubjectAssessment 
        open={showAssessment}
        onOpenChange={handleAssessmentClose}
      />
    </div>
  );
};

export default Index;
