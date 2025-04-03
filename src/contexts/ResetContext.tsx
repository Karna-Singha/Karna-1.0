import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface ResetContextType {
  resetCount: number;
  canReset: boolean;
  resetData: () => void;
}

const ResetContext = createContext<ResetContextType | undefined>(undefined);

export const ResetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resetCount, setResetCount] = useState<number>(() => {
    const saved = localStorage.getItem('resetCount');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('resetCount', resetCount.toString());
  }, [resetCount]);

  const canReset = resetCount < 2;

  const resetData = () => {
    if (!canReset) {
      toast.error('You have reached the maximum number of data resets');
      return;
    }

    // Clear all local storage data except the reset count
    const resetCountValue = localStorage.getItem('resetCount');
    localStorage.clear();
    localStorage.setItem('resetCount', resetCountValue || '0');

    // Increment reset count
    setResetCount(prev => prev + 1);
    
    toast.success('All data has been reset successfully');
  };

  return (
    <ResetContext.Provider value={{ resetCount, canReset, resetData }}>
      {children}
    </ResetContext.Provider>
  );
};

export const useReset = () => {
  const context = useContext(ResetContext);
  if (context === undefined) {
    throw new Error('useReset must be used within a ResetProvider');
  }
  return context;
};
