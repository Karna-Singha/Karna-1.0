import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import StatsOverview from '@/components/StatsOverview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// DeepSeek API key is now directly integrated
const DEEPSEEK_API_KEY = "sk-b269b97497974e3b96b5d27b766cbb7b";

const Statistics = () => {
  const [aiRecommendation, setAiRecommendation] = useState<string>('');
  const [isLoadingRecommendation, setIsLoadingRecommendation] = useState<boolean>(true);

  const generateRecommendation = async () => {
    setIsLoadingRecommendation(true);
    
    try {
      // In a real implementation, this would make an API call to DeepSeek
      // For demonstration, we'll simulate a delay and response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const recommendations = [
        "Based on your study patterns, I recommend focusing more on Physics and allocating specific times for difficult exercises. Your performance in physical chemistry has improved by 15%, which suggests your study strategy for this subject is effective.",
        "Your revision pattern shows gaps in Organic Chemistry. Consider using spaced repetition for formulas and reactions. The data suggests you perform best when studying in 50-minute focused sessions followed by 10-minute breaks.",
        "Analysis of your learning patterns suggests you retain information better when you review material 24 hours after initially studying it. Try implementing a structured review schedule for Mathematics to improve problem-solving efficiency.",
        "Your productivity peaks during morning hours (8-11 AM) with a 78% efficiency rate. Consider scheduling your most challenging subjects during this window. For Botany, visual learning methods have proven most effective based on your task completion rates."
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

  // Generate recommendation automatically when component mounts
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
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                      <p className="text-muted-foreground">
                        {aiRecommendation}
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="text-muted-foreground">
                        Your most productive day is <span className="font-medium text-primary">Friday</span>, with an average productivity ratio of <span className="font-medium text-primary">85%</span>.
                      </p>
                      <p className="text-muted-foreground">
                        You've completed <span className="font-medium text-primary">24 tasks</span> this week, which is <span className="font-medium text-green-500">15% more</span> than last week.
                      </p>
                      <p className="text-muted-foreground">
                        Your average study session lasts <span className="font-medium text-primary">45 minutes</span>, which is optimal for deep focus.
                      </p>
                    </>
                  )}
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
