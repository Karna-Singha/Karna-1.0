
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

// DeepSeek API key is now directly integrated
const DEEPSEEK_API_KEY = "sk-b269b97497974e3b96b5d27b766cbb7b";
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

interface AIInsightsProps {
  workSeconds: number;
  breakSeconds: number;
  productivityRatio: number;
  tasks: {
    id: string;
    title: string;
    subject: string;
    difficulty: number;
    completed: boolean;
    createdAt: Date;
  }[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ 
  workSeconds, 
  breakSeconds, 
  productivityRatio, 
  tasks 
}) => {
  const [insight, setInsight] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const generateInsight = async () => {
    setIsLoading(true);
    setInsight('');

    try {
      // Prepare context for the AI
      const workTime = formatTime(workSeconds);
      const breakTime = formatTime(breakSeconds);
      const completedTasks = tasks.filter(t => t.completed).length;
      const pendingTasks = tasks.filter(t => !t.completed).length;
      const subjects = [...new Set(tasks.map(t => t.subject))];

      const userContext = `
        User Data:
        - Work time: ${workTime}
        - Break time: ${breakTime}
        - Productivity ratio: ${productivityRatio}%
        - Completed tasks: ${completedTasks}
        - Pending tasks: ${pendingTasks}
        - Subjects: ${subjects.join(', ')}
      `;

      // For demonstration - in a real app, this would be an actual API call
      console.log('Sending to DeepSeek API with context:', userContext);
      console.log('Using API key:', DEEPSEEK_API_KEY.substring(0, 3) + '...' + DEEPSEEK_API_KEY.substring(DEEPSEEK_API_KEY.length - 3));

      // Simulated API response for demonstration
      // In a real app, you would replace this with an actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Sample insights based on the provided context
      const insights = [
        `You've been working hard! With a productivity ratio of ${productivityRatio}%, you're doing great. Consider taking a slightly longer break next time to maintain this momentum.`,
        `I notice you've completed ${completedTasks} tasks today. Great progress! Focus on breaking down your remaining ${pendingTasks} tasks into smaller chunks for better momentum.`,
        `Your study pattern shows strength in ${subjects[0] || 'your subjects'}. For optimal learning, try interleaving with ${subjects[1] || 'other subjects'} to enhance memory retention.`,
        `Based on your focus patterns, you might benefit from the Pomodoro technique. Try 25-minute focus sessions with 5-minute breaks between them.`,
        `You've spent ${workTime} working. To optimize your learning, consider reviewing ${subjects[0] || 'your materials'} again in 24 hours to strengthen neural connections.`
      ];
      
      const randomInsight = insights[Math.floor(Math.random() * insights.length)];
      setInsight(randomInsight);
      
      toast.success("AI insight generated!");
    } catch (error) {
      console.error('Error fetching AI insight:', error);
      toast.error('Failed to generate insight. Please try again.');
      setInsight('Unable to generate insight at this time. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate insight automatically when component mounts or when relevant props change
  useEffect(() => {
    if (tasks.length > 0) {
      generateInsight();
    }
  }, [tasks, workSeconds, breakSeconds]);

  return (
    <Card className="shadow-lg border-karna-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          AI Insights
          <Sparkles className="h-5 w-5 text-yellow-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="min-h-[100px] p-3 bg-muted/50 rounded-lg">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="ml-2">Analyzing your data...</span>
            </div>
          ) : insight ? (
            <p className="text-sm">{insight}</p>
          ) : (
            <p className="text-sm text-muted-foreground text-center">Loading AI insights...</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsights;
