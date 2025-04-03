import * as React from 'react';

interface TimerContextType {
  workSeconds: number;
  breakSeconds: number;
  isWorking: boolean;
  productivityRatio: number;
  toggleTimer: () => void;
  resetTimer: () => void;
  setWorkSeconds: React.Dispatch<React.SetStateAction<number>>;
  setBreakSeconds: React.Dispatch<React.SetStateAction<number>>;
}

const TimerContext = React.createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workSeconds, setWorkSeconds] = React.useState<number>(0);
  const [breakSeconds, setBreakSeconds] = React.useState<number>(0);
  const [isWorking, setIsWorking] = React.useState<boolean>(false);
  const [productivityRatio, setProductivityRatio] = React.useState<number>(100);
  
  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isWorking) {
      interval = setInterval(() => {
        setWorkSeconds(prev => prev + 1);
      }, 1000);
    } else if (!isWorking && workSeconds > 0) {
      interval = setInterval(() => {
        setBreakSeconds(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isWorking, workSeconds]);
  
  React.useEffect(() => {
    if (workSeconds > 0 || breakSeconds > 0) {
      const ratio = Math.round((workSeconds / (workSeconds + breakSeconds)) * 100);
      setProductivityRatio(ratio);
    }
  }, [workSeconds, breakSeconds]);
  
  const toggleTimer = () => {
    setIsWorking(!isWorking);
  };
  
  const resetTimer = () => {
    setWorkSeconds(0);
    setBreakSeconds(0);
    setIsWorking(false);
    setProductivityRatio(100);
  };
  
  const value = {
    workSeconds,
    breakSeconds,
    isWorking,
    productivityRatio,
    toggleTimer,
    resetTimer,
    setWorkSeconds,
    setBreakSeconds
  };
  
  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
};

export const useTimer = () => {
  const context = React.useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};

export default TimerContext; 