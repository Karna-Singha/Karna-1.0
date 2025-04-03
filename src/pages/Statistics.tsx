import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import StatsOverview from '@/components/StatsOverview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Loader2, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface AIRecommendation {
  evidence: string;
  problem: string;
  solution: string;
}

const Statistics = () => {
  const [aiRecommendation, setAiRecommendation] = useState<AIRecommendation | null>(null);
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState<boolean>(true);

  const generateRecommendation = async () => {
    setIsLoadingRecommendation(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const recommendations: AIRecommendation[] = [
        {
          evidence: "Your study data shows that you spend 45% of your time on Physics but only complete 25% of the assigned tasks.",
          problem: "There's a significant gap between time invested and task completion rate in Physics, indicating potential inefficiencies in your study approach.",
          solution: "Break down Physics problems into smaller, manageable chunks and use the Pomodoro technique (25-minute focused sessions) specifically for problem-solving exercises."
        },
        {
          evidence: "Analysis shows irregular study patterns in Organic Chemistry with gaps of 4-5 days between sessions.",
          problem: "Long gaps between study sessions are affecting your retention of complex organic chemistry concepts and reactions.",
          solution: "Implement a spaced repetition system: review organic chemistry concepts every 2 days, even if briefly (15-20 minutes), to maintain continuity."
        },
        {
          evidence: "Your productivity metrics show an 85% efficiency rate during morning hours (8-11 AM) compared to 45% in evenings.",
          problem: "You're not maximizing your peak productivity hours for challenging subjects.",
          solution: "Schedule your most demanding subjects (based on your assessments) during the morning hours. Save revision and lighter topics for evening sessions."
        },
        {
          evidence: "Task completion data indicates that you complete 30% more exercises when using visual learning methods.",
          problem: "Current text-heavy study approach may not be optimal for your learning style.",
          solution: "Incorporate more diagrams, mind maps, and visual aids in your study materials. Use color-coding for different concepts and create visual flowcharts for complex processes."
        }
      ];
      
      const randomRecommendation = recommendations[Math.floor(Math.random() * recommendations.length)];
      setAiRecommendation(randomRecommendation);
      toast.success("AI recommendation generated!");
    } catch (error) {
      console.error('Error generating recommendation:', error);
      toast.error('Failed to generate recommendation');
    } finally {
      setIsLoadingRecommendation(false);
    }
  };

  useEffect(() => {
    generateRecommendation();
  }, []);

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
                <CardTitle className="flex items-center">
                  <span>AI Recommendations</span>
                  <Sparkles className="ml-2 h-4 w-4 text-yellow-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isLoadingRecommendation ? (
                    <div className="flex items-center justify-center py-6">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      <span className="ml-2">Analyzing your study patterns...</span>
                    </div>
                  ) : aiRecommendation ? (
                    <div className="space-y-4">
                      {/* Evidence Section */}
                      <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                        <div className="flex items-start gap-3">
                          <Info className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="font-medium text-primary mb-1">Evidence</h3>
                            <p className="text-muted-foreground">{aiRecommendation.evidence}</p>
                          </div>
                        </div>
                      </div>

                      {/* Problem Section */}
                      <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/10">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-destructive mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="font-medium text-destructive mb-1">Problem</h3>
                            <p className="text-muted-foreground">{aiRecommendation.problem}</p>
                          </div>
                        </div>
                      </div>

                      {/* Solution Section */}
                      <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/10">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="font-medium text-green-500 mb-1">Solution</h3>
                            <p className="text-muted-foreground">{aiRecommendation.solution}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
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
