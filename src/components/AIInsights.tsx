import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

// DeepSeek API key is now directly integrated
const DEEPSEEK_API_KEY = "sk-b269b97497974e3b96b5d27b766cbb7b";
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// New constants for timer settings
const INSIGHT_GENERATION_INTERVAL = 90 * 60 * 1000; // 90 minutes in milliseconds

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
  const [difficultSubjects, setDifficultSubjects] = useState<string[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
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

    // Load difficult subjects from localStorage
    const storedDifficultSubjects = localStorage.getItem('difficultSubjects');
    if (storedDifficultSubjects) {
      try {
        setDifficultSubjects(JSON.parse(storedDifficultSubjects));
      } catch (error) {
        console.error("Error parsing difficult subjects:", error);
        setDifficultSubjects([]);
      }
    }

    // Initial insight generation when component mounts
    generateInsight();

    // Setup interval for generating insights every 90 minutes
    timerRef.current = setInterval(() => {
      generateInsight();
    }, INSIGHT_GENERATION_INTERVAL);

    // Cleanup interval when component unmounts
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Update difficult subjects when tasks change
  useEffect(() => {
    // Identify difficult subjects (difficulty >= 4) and store them
    const hardSubjects = tasks
      .filter(t => t.difficulty >= 4)
      .map(t => t.subject);
    
    const uniqueDifficultSubjects = [...new Set(hardSubjects)];
    
    if (JSON.stringify(uniqueDifficultSubjects) !== JSON.stringify(difficultSubjects)) {
      setDifficultSubjects(uniqueDifficultSubjects);
      localStorage.setItem('difficultSubjects', JSON.stringify(uniqueDifficultSubjects));
    }
  }, [tasks, difficultSubjects]);

  // Save data when user is active
  useEffect(() => {
    if (workSeconds > 60) { // If user has worked for at least a minute
      localStorage.setItem('lastActiveDate', new Date().toDateString());
    }
  }, [workSeconds]);
  
  const generateInsight = async () => {
    // Prevent generating insights too frequently (30-second cooldown)
    const now = Date.now();
    if (now - lastGeneratedAt < 30000) {
      return;
    }
    
    setIsLoading(true);
    setInsight('');
    setLastGeneratedAt(now);

    try {
      // Identify difficult subjects from state (already filtered from tasks)
      const uniqueDifficultSubjects = difficultSubjects;
      
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
      const safeSubject = subjects.length > 0 ? subjects[0] : 'your subjects';
      const safeDifficultSubject = uniqueDifficultSubjects.length > 0 ? uniqueDifficultSubjects[0] : safeSubject;
      
      if (insightMode === 'slacking') {
        // Hinglish slang for when user is slacking
        const slackingInsights = [
          `Arrey yaar! ${slackDays} din se gayab ho? Kitna chill kar rahe ho! Get back to your study schedule, especially for ${safeDifficultSubject}!`,
          `Kya scene hai bhai? ${slackDays} din se koi padhai nahi? Thoda to mehnat karo, especially on ${safeDifficultSubject}!`,
          `Bhai/Behen, ${slackDays} din ho gaye aur aap dikhe nahi. Padhai ka kya hua? ${safeDifficultSubject} needs your attention ASAP!`,
          `Hello ji, ${slackDays} din se break chal raha hai? Great chill! Par ab ${safeDifficultSubject} pe dhyan do thoda!`,
          `Kaise ho mitr? ${slackDays} din se gayab? Thoda padhai pe dhyan do, especially ${safeDifficultSubject} pe focus karo!`
        ];
        
        randomInsight = slackingInsights[Math.floor(Math.random() * slackingInsights.length)];
      } else if (insightMode === 'difficult_subjects') {
        // Enhanced reminders about difficult subjects with more frequent revision suggestions
        const difficultSubjectsJoined = uniqueDifficultSubjects.join(', ');
        const difficultSubjectInsights = [
          `I noticed ${difficultSubjectsJoined} are challenging for you. You should revise these topics at least twice a week. Try dedicating 25% more time to these subjects.`,
          `Your difficult subjects (${difficultSubjectsJoined}) need more frequent revision. Schedule daily 15-minute sessions for these topics using the Feynman technique - explain the concepts aloud to improve understanding.`,
          `Time to focus on your challenging areas! ${difficultSubjectsJoined} need extra attention. Try breaking these topics into smaller chunks and review them every 48 hours for better retention.`,
          `Your difficult subjects (${difficultSubjectsJoined}) should be reviewed at least 3 times per week. Studies show spaced repetition with multiple short study sessions is most effective for challenging material.`,
          `I've noticed ${difficultSubjectsJoined} are your most challenging areas. Consider creating flashcards for these topics and review them daily for 10 minutes - this consistent practice is key to mastering difficult concepts.`
        ];
        
        randomInsight = difficultSubjectInsights[Math.floor(Math.random() * difficultSubjectInsights.length)];
      } else if (insightMode === 'low_productivity') {
        // Low productivity insights
        const lowProductivityInsights = [
          `Your productivity ratio is at ${productivityRatio}%. Try the Pomodoro technique - 25 minutes of focused work followed by a 5-minute break might help improve this.`,
          `I've noticed your productivity is at ${productivityRatio}%. Consider eliminating distractions or changing your study environment to help focus better.`,
          `With a productivity ratio of ${productivityRatio}%, you might benefit from shorter, more focused study sessions. Quality often beats quantity!`,
          `Your current productivity ratio is ${productivityRatio}%. Try setting specific goals for each study session to maintain focus and track progress better.`,
          `Productivity currently at ${productivityRatio}%. Consider studying your most challenging subject (${safeDifficultSubject}) when you're most alert during the day.`
        ];
        
        randomInsight = lowProductivityInsights[Math.floor(Math.random() * lowProductivityInsights.length)];
      } else {
        // Regular insights with reminders about difficult subjects if they exist
        const regularInsights = uniqueDifficultSubjects.length > 0 ? 
        [
          `You've been working hard! With a productivity ratio of ${productivityRatio}%. Don't forget to review your challenging subjects (${uniqueDifficultSubjects.join(', ')}) this week.`,
          `I notice you've completed ${completedTasks} tasks. Great progress! Remember to schedule extra review time for ${uniqueDifficultSubjects.join(', ')} - consistent practice is key for difficult topics.`,
          `Your study pattern shows good focus. For optimal learning, make sure to revisit ${uniqueDifficultSubjects.join(', ')} at least twice this week to enhance memory retention.`,
          `Based on your progress, you're doing well! Don't forget that your difficult subjects (${uniqueDifficultSubjects.join(', ')}) benefit most from spaced repetition - review them every 2-3 days.`,
          `You've spent ${workTime} working productively. To optimize your learning, consider daily short reviews of ${uniqueDifficultSubjects.join(', ')} to strengthen neural connections.`
        ] : 
        [
          `You've been working hard! With a productivity ratio of ${productivityRatio}%, you're doing great. Consider taking a slightly longer break next time to maintain this momentum.`,
          `I notice you've completed ${completedTasks} tasks today. Great progress! Focus on breaking down your remaining ${pendingTasks} tasks into smaller chunks for better momentum.`,
          `Your study pattern shows strength in ${safeSubject}. For optimal learning, try interleaving with ${subjects.length > 1 ? subjects[1] : 'other subjects'} to enhance memory retention.`,
          `Based on your focus patterns, you might benefit from the Pomodoro technique. Try 25-minute focus sessions with 5-minute breaks between them.`,
          `You've spent ${workTime} working. To optimize your learning, consider reviewing ${safeSubject} again in 24 hours to strengthen neural connections.`
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
