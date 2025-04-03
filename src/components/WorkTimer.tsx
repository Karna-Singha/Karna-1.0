import * as React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useTimer } from '@/contexts/TimerContext';

interface WorkTimerProps {
  onTimerUpdate?: (workSeconds: number, breakSeconds: number, productivityRatio: number) => void;
}

const formatTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  return `${hrs.toString().padStart(2, '0')}:${mins
    .toString()
    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const WorkTimer: React.FC<WorkTimerProps> = ({ onTimerUpdate }) => {
  const { 
    workSeconds, 
    breakSeconds, 
    isWorking, 
    productivityRatio,
    toggleTimer,
    resetTimer
  } = useTimer();
  
  React.useEffect(() => {
    // Call the parent component's callback if provided
    if (onTimerUpdate) {
      onTimerUpdate(workSeconds, breakSeconds, productivityRatio);
    }
  }, [workSeconds, breakSeconds, productivityRatio, onTimerUpdate]);
  
  const getStatusColor = (): string => {
    if (productivityRatio >= 80) return 'text-green-500';
    if (productivityRatio >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  return (
    <Card className="shadow-lg border-karna-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          Focus Timer
          <div 
            className={`w-3 h-3 rounded-full ${isWorking ? 'bg-green-500 animate-pulse-light' : 'bg-yellow-500'}`}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-medium">
            {isWorking ? 'Working' : 'Break'}
          </h3>
          <div className="timer-display mt-2">
            {isWorking ? formatTime(workSeconds) : formatTime(breakSeconds)}
          </div>
        </div>
        
        <div className="flex justify-center gap-3 mt-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleTimer}
            className="w-12 h-12 rounded-full"
          >
            {isWorking ? <Pause /> : <Play />}
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={resetTimer}
            className="w-12 h-12 rounded-full"
          >
            <RotateCcw />
          </Button>
        </div>
        
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Productivity Ratio</span>
            <span className={getStatusColor()}>{productivityRatio}%</span>
          </div>
          
          <Progress value={productivityRatio} className="h-2" />
          
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mt-2">
            <div>
              <p>Work Time</p>
              <p className="font-medium text-foreground">{formatTime(workSeconds)}</p>
            </div>
            <div>
              <p>Break Time</p>
              <p className="font-medium text-foreground">{formatTime(breakSeconds)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkTimer;
