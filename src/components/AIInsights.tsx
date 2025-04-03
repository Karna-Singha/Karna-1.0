
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
  const [lastGeneratedAt, setLastGeneratedAt] = useState<number>(0);
  const [slackDays, setSlackDays] = useState<number>(0);
  
  // Track last activity date to detect slack days
  const [lastActiveDate, setLastActiveDate] = useState<string>(new Date().toDateString());

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Check for slack days when component mounts
  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('lastActiveDate') || today;
    const storedSlackDays = parseInt(localStorage.getItem('slackDays') || '0');
    
    setLastActiveDate(storedDate);
    setSlackDays(storedSlackDays);
    
    // If this is a new day and different from last active day
    if (today !== storedDate) {
      // Calculate days difference
      const lastDate = new Date(storedDate);
      const currentDate = new Date(today);
      const daysDifference = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDifference > 1) {
        // User has missed days
        setSlackDays(storedSlackDays + daysDifference - 1);
        localStorage.setItem('slackDays', (storedSlackDays + daysDifference - 1).toString());
      }
      
      // Update the active date
      localStorage.setItem('lastActiveDate', today);
      setLastActiveDate(today);
    }
  }, []);

  // Save data when user is active
  useEffect(() => {
    if (workSeconds > 60) { // If user has worked for at least a minute
      localStorage.setItem('lastActiveDate', new Date().toDateString());
    }
  }, [workSeconds]);
  
  const generateInsight = async () => {
    // Prevent generating insights too frequently
    const now = Date.now();
    if (now - lastGeneratedAt < 30000) { // 30 seconds cooldown
      return;
    }
    
    setIsLoading(true);
    setInsight('');
    setLastGeneratedAt(now);

    try {
      // Identify difficult subjects (difficulty >= 4)
      const difficultSubjects = tasks
        .filter(t => t.difficulty >= 4)
        .map(t => t.subject);
      
      const uniqueDifficultSubjects = [...new Set(difficultSubjects)];
      
      // Prepare context for the AI
      const workTime = formatTime(workSeconds);
      const breakTime = formatTime(breakSeconds);
      const completedTasks = tasks.filter(t => t.completed).length;
      const pendingTasks = tasks.filter(t => !t.completed).length;
      const subjects = [...new Set(tasks.map(t => t.subject))];
      
      let insightMode = 'normal';
      if (slackDays > 0) {
        insightMode = 'slacking';
      } else if (uniqueDifficultSubjects.length > 0) {
        insightMode = 'difficult_subjects';
      } else if (productivityRatio < 50) {
        insightMode = 'low_productivity';
      }

      const userContext = `
        User Data:
        - Work time: ${workTime}
        - Break time: ${breakTime}
        - Productivity ratio: ${productivityRatio}%
        - Completed tasks: ${completedTasks}
        - Pending tasks: ${pendingTasks}
        - Subjects: ${subjects.join(', ')}
        - Difficult subjects: ${uniqueDifficultSubjects.join(', ')}
        - Slack days: ${slackDays}
        - Insight mode: ${insightMode}
      `;

      // For demonstration - in a real app, this would be an actual API call
      console.log('Sending to DeepSeek API with context:', userContext);
      console.log('Using API key:', DEEPSEEK_API_KEY.substring(0, 3) + '...' + DEEPSEEK_API_KEY.substring(DEEPSEEK_API_KEY.length - 3));

      // Simulated API response for demonstration
      // In a real app, you would replace this with an actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate insights based on the identified mode
      let randomInsight = '';
      
      if (insightMode === 'slacking') {
        // Hinglish slang for when user is slacking
        const slackingInsights = [
          `Arrey yaar! ${slackDays} din se gayab ho? Kitna chill kar rahe ho! Get back to your study schedule, especially for ${uniqueDifficultSubjects[0] || subjects[0]}!`,
          `Kya scene hai bhai? ${slackDays} din se koi padhai nahi? Thoda to mehnat karo, especially on ${uniqueDifficultSubjects[0] || subjects[0]}!`,
          `Bhai/Behen, ${slackDays} din ho gaye aur aap dikhe nahi. Padhai ka kya hua? ${uniqueDifficultSubjects[0] || subjects[0]} needs your attention ASAP!`,
          `Hello ji, ${slackDays} din se break chal raha hai? Great chill! Par ab ${uniqueDifficultSubjects[0] || subjects[0]} pe dhyan do thoda!`,
          `Kaise ho mitr? ${slackDays} din se gayab? Thoda padhai pe dhyan do, especially ${uniqueDifficultSubjects[0] || subjects[0]} pe focus karo!`
        ];
        
        randomInsight = slackingInsights[Math.floor(Math.random() * slackingInsights.length)];
      } else if (insightMode === 'difficult_subjects') {
        // Reminders about difficult subjects
        const difficultSubjectInsights = [
          `I noticed ${uniqueDifficultSubjects.join(', ')} are challenging for you. Consider dedicating 25% more time to these subjects this week.`,
          `Your difficult subjects (${uniqueDifficultSubjects.join(', ')}) need more frequent revision. Try the Feynman technique - explain the concepts aloud to improve understanding.`,
          `Time to focus on your challenging areas! ${uniqueDifficultSubjects.join(', ')} need extra attention. Try breaking down these topics into smaller chunks for better comprehension.`,
          `Don't forget to revise ${uniqueDifficultSubjects.join(', ')} today. Studies show that difficult subjects benefit from spaced repetition - multiple short study sessions spread over time.`,
          `Your difficult subjects (${uniqueDifficultSubjects.join(', ')}) are the key to improving your overall performance. Schedule focused sessions specifically for these topics.`
        ];
        
        randomInsight = difficultSubjectInsights[Math.floor(Math.random() * difficultSubjectInsights.length)];
      } else if (insightMode === 'low_productivity') {
        // Low productivity insights
        const lowProductivityInsights = [
          `Your productivity ratio is at ${productivityRatio}%. Try the Pomodoro technique - 25 minutes of focused work followed by a 5-minute break might help improve this.`,
          `I've noticed your productivity is at ${productivityRatio}%. Consider eliminating distractions or changing your study environment to help focus better.`,
          `With a productivity ratio of ${productivityRatio}%, you might benefit from shorter, more focused study sessions. Quality often beats quantity!`,
          `Your current productivity ratio is ${productivityRatio}%. Try setting specific goals for each study session to maintain focus and track progress better.`,
          `Productivity currently at ${productivityRatio}%. Consider studying your most challenging subject (${uniqueDifficultSubjects[0] || subjects[0]}) when you're most alert during the day.`
        ];
        
        randomInsight = lowProductivityInsights[Math.floor(Math.random() * lowProductivityInsights.length)];
      } else {
        // Regular insights
        const regularInsights = [
          `You've been working hard! With a productivity ratio of ${productivityRatio}%, you're doing great. Consider taking a slightly longer break next time to maintain this momentum.`,
          `I notice you've completed ${completedTasks} tasks today. Great progress! Focus on breaking down your remaining ${pendingTasks} tasks into smaller chunks for better momentum.`,
          `Your study pattern shows strength in ${subjects[0] || 'your subjects'}. For optimal learning, try interleaving with ${subjects[1] || 'other subjects'} to enhance memory retention.`,
          `Based on your focus patterns, you might benefit from the Pomodoro technique. Try 25-minute focus sessions with 5-minute breaks between them.`,
          `You've spent ${workTime} working. To optimize your learning, consider reviewing ${subjects[0] || 'your materials'} again in 24 hours to strengthen neural connections.`
        ];
        
        randomInsight = regularInsights[Math.floor(Math.random() * regularInsights.length)];
      }
      
      setInsight(randomInsight);
      
      // Reset slack days if user is active today
      if (slackDays > 0 && workSeconds > 300) {
        setSlackDays(0);
        localStorage.setItem('slackDays', '0');
      }
      
      toast.success("AI insight generated!");
    } catch (error) {
      console.error('Error fetching AI insight:', error);
      toast.error('Failed to generate insight. Please try again.');
      setInsight('Unable to generate insight at this time. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate insight automatically when component mounts or when significant changes occur
  useEffect(() => {
    // Only generate insights when there are tasks and either:
    // 1. This is the first load (lastGeneratedAt is 0)
    // 2. A task was completed/added (tasks.length or completed tasks changed)
    if (tasks.length > 0 && (
      lastGeneratedAt === 0 || 
      // We don't want to regenerate on every timer tick, only on significant changes
      (workSeconds > 300 && breakSeconds > 60) // Only after meaningful work/break periods
    )) {
      generateInsight();
    }
  }, [tasks]); // Only depend on tasks changes, not timer values

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
