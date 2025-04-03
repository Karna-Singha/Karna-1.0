
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// In a real app, you would store this securely in environment variables or Supabase secrets
// This is just for demonstration
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
  const [apiKey, setApiKey] = useState<string>(localStorage.getItem('deepseekApiKey') || '');
  const [showApiInput, setShowApiInput] = useState<boolean>(!apiKey);

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const generateInsight = async () => {
    if (!apiKey) {
      setShowApiInput(true);
      return;
    }

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
      console.log('Using API key:', apiKey.substring(0, 3) + '...' + apiKey.substring(apiKey.length - 3));

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
      
      toast.success("Generated new insight!");
    } catch (error) {
      console.error('Error fetching AI insight:', error);
      toast.error('Failed to generate insight. Please try again.');
      setInsight('Unable to generate insight at this time. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const saveApiKey = () => {
    if (apiKey) {
      localStorage.setItem('deepseekApiKey', apiKey);
      setShowApiInput(false);
      toast.success('API key saved!');
    }
  };

  useEffect(() => {
    // Generate initial insight if API key is available
    if (apiKey && !insight && tasks.length > 0) {
      generateInsight();
    }
  }, []);

  return (
    <Card className="shadow-lg border-karna-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          AI Insights
          <Sparkles className="h-5 w-5 text-yellow-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {showApiInput ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Enter your DeepSeek API key to get personalized insights:</p>
            <div className="flex gap-2">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your DeepSeek API key"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <Button onClick={saveApiKey} disabled={!apiKey}>Save</Button>
            </div>
            <p className="text-xs text-muted-foreground">Your API key is stored in your browser's local storage and never sent to our servers.</p>
          </div>
        ) : (
          <>
            <div className="min-h-[100px] p-3 bg-muted/50 rounded-lg">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <span className="ml-2">Analyzing your data...</span>
                </div>
              ) : insight ? (
                <p className="text-sm">{insight}</p>
              ) : (
                <p className="text-sm text-muted-foreground text-center">Click "Generate Insight" to get personalized feedback and motivation.</p>
              )}
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowApiInput(true)}
              >
                Change API Key
              </Button>
              <Button 
                onClick={generateInsight} 
                disabled={isLoading}
                size="sm"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Insight
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AIInsights;
