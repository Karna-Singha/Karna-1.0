import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, Clock, ChevronLeft, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Sidebar: React.FC = () => {
  // Use the location hook to determine the active route
  const location = useLocation();
  const activeRoute = location.pathname;
  const [collapsed, setCollapsed] = React.useState(true);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={cn(
      "h-screen bg-karna-dark-blue p-4 flex flex-col gap-10 transition-all duration-300",
      "w-20"
    )}>
      <div className="flex items-center justify-center">
        <Button variant="ghost" size="icon" onClick={toggleCollapse} className="text-karna-accent h-14 w-14 rounded-full">
          <Menu size={32} />
        </Button>
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

      <div className="mt-auto">
        {/* No text content here anymore */}
      </div>
    </div>
  );
};

export default Sidebar;
