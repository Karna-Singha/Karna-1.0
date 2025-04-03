import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, Clock, ChevronLeft, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  visible: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, href, active, visible }) => {
  if (!visible) return null;
  
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
        active 
          ? "bg-primary text-primary-foreground" 
          : "hover:bg-muted text-muted-foreground hover:text-foreground"
      )}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  // Use the location hook to determine the active route
  const location = useLocation();
  const activeRoute = location.pathname;
  const [collapsed, setCollapsed] = React.useState(false);
  const [timerVisible, setTimerVisible] = React.useState(true);
  const [statsVisible, setStatsVisible] = React.useState(true);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const toggleTimer = () => {
    setTimerVisible(!timerVisible);
  };

  const toggleStats = () => {
    setStatsVisible(!statsVisible);
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
      
      <div className="flex flex-col gap-2">
        {collapsed ? (
          <>
            {timerVisible && (
              <Link to="/timer" className={cn(
                "p-2 rounded-lg transition-colors flex items-center justify-center",
                (activeRoute === '/timer' || activeRoute === '/') 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}>
                <Clock size={20} />
              </Link>
            )}
            {statsVisible && (
              <Link to="/statistics" className={cn(
                "p-2 rounded-lg transition-colors flex items-center justify-center",
                activeRoute === '/statistics'
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              )}>
                <BarChart2 size={20} />
              </Link>
            )}
          </>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <SidebarItem 
                icon={Clock} 
                label="Focus Timer" 
                href="/timer" 
                active={activeRoute === '/timer' || activeRoute === '/'} 
                visible={timerVisible}
              />
              {timerVisible && (
                <Button variant="ghost" size="icon" onClick={toggleTimer} className="h-6 w-6">
                  <ChevronLeft size={16} />
                </Button>
              )}
            </div>
            {!timerVisible && (
              <Button variant="ghost" onClick={toggleTimer} className="text-xs">
                Show Focus Timer
              </Button>
            )}
            
            <div className="flex items-center justify-between">
              <SidebarItem 
                icon={BarChart2} 
                label="Statistics" 
                href="/statistics" 
                active={activeRoute === '/statistics'} 
                visible={statsVisible}
              />
              {statsVisible && (
                <Button variant="ghost" size="icon" onClick={toggleStats} className="h-6 w-6">
                  <ChevronLeft size={16} />
                </Button>
              )}
            </div>
            {!statsVisible && (
              <Button variant="ghost" onClick={toggleStats} className="text-xs">
                Show Statistics
              </Button>
            )}
          </>
        )}
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
