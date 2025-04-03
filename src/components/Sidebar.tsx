import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, Clock, ChevronLeft, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Sidebar: React.FC = () => {
  // Use the location hook to determine the active route
  const location = useLocation();
  const activeRoute = location.pathname;
  const [collapsed, setCollapsed] = React.useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={cn(
      "h-screen bg-karna-dark-blue p-4 flex flex-col gap-6 transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between">
        {!collapsed && (
          <h1 className="text-2xl font-bold text-karna-accent">KARNA</h1>
        )}
        <Button variant="ghost" size="icon" onClick={toggleCollapse} className="text-karna-accent">
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>
      
      <div className="flex flex-col gap-4">
        {/* Timer link */}
        <Link 
          to="/timer"
          className={cn(
            "p-3 rounded-lg transition-colors flex items-center justify-center",
            (activeRoute === '/timer' || activeRoute === '/') 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-muted text-muted-foreground hover:text-foreground"
          )}
          aria-label="Focus Timer"
        >
          <Clock size={20} />
          {!collapsed && <span className="ml-3">Focus Timer</span>}
        </Link>
        
        {/* Statistics link */}
        <Link 
          to="/statistics"
          className={cn(
            "p-3 rounded-lg transition-colors flex items-center justify-center",
            activeRoute === '/statistics'
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-muted text-muted-foreground hover:text-foreground"
          )}
          aria-label="Statistics"
        >
          <BarChart2 size={20} />
          {!collapsed && <span className="ml-3">Statistics</span>}
        </Link>
      </div>

      <div className="mt-auto px-4 py-4">
        {!collapsed && (
          <div className="text-sm text-muted-foreground">
            <p>Today's Productivity</p>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div className="bg-karna-accent h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <p className="mt-1 text-xs">65% Effective</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
