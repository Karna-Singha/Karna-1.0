import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, Clock, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useReset } from '@/contexts/ResetContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const activeRoute = location.pathname;
  const { resetData, canReset, resetCount } = useReset();

  return (
    <div className="h-screen bg-karna-dark-blue p-4 flex flex-col gap-10 w-20">
      <div className="flex items-center justify-center pt-4">
        {/* App logo or icon can go here */}
      </div>
      
      <div className="flex flex-col gap-8 items-center">
        {/* Timer link */}
        <Link 
          to="/timer"
          className={cn(
            "p-4 rounded-xl transition-colors flex items-center justify-center",
            "h-14 w-14",
            (activeRoute === '/timer' || activeRoute === '/') 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-muted text-muted-foreground hover:text-foreground"
          )}
          aria-label="Focus Timer"
        >
          <Clock size={40} />
        </Link>
        
        {/* Statistics link */}
        <Link 
          to="/statistics"
          className={cn(
            "p-4 rounded-xl transition-colors flex items-center justify-center",
            "h-14 w-14",
            activeRoute === '/statistics'
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-muted text-muted-foreground hover:text-foreground"
          )}
          aria-label="Statistics"
        >
          <BarChart2 size={40} />
        </Link>
      </div>

      <div className="mt-auto flex flex-col items-center gap-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "p-4 rounded-xl transition-colors flex items-center justify-center",
                "h-14 w-14",
                !canReset && "opacity-50 cursor-not-allowed"
              )}
              disabled={!canReset}
            >
              <Trash2 size={24} className="text-red-500" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset All Data?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will delete all your study data and statistics. This can only be done {2 - resetCount} more time{2 - resetCount === 1 ? '' : 's'}.
                <br /><br />
                <span className="font-medium text-destructive">This action cannot be undone.</span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={resetData}
              >
                Reset Data
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {!canReset && (
          <span className="text-xs text-muted-foreground text-center">
            Reset limit reached
          </span>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
