
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, BarChart2, Settings, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, href, active }) => {
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

  return (
    <div className="w-64 h-screen bg-karna-dark-blue p-4 flex flex-col gap-6">
      <div className="flex items-center gap-2 px-4 py-2">
        <h1 className="text-2xl font-bold text-karna-accent">KARNA</h1>
      </div>
      
      <div className="flex flex-col gap-2">
        <SidebarItem icon={Home} label="Dashboard" href="/" active={activeRoute === '/'} />
        <SidebarItem icon={Clock} label="Focus Timer" href="/timer" active={activeRoute === '/timer'} />
        <SidebarItem icon={BookOpen} label="Tasks" href="/tasks" active={activeRoute === '/tasks'} />
        <SidebarItem icon={BarChart2} label="Statistics" href="/statistics" active={activeRoute === '/statistics'} />
        <SidebarItem icon={Settings} label="Settings" href="/settings" active={activeRoute === '/settings'} />
      </div>

      <div className="mt-auto px-4 py-4">
        <div className="text-sm text-muted-foreground">
          <p>Today's Productivity</p>
          <div className="w-full bg-muted rounded-full h-2 mt-2">
            <div className="bg-karna-accent h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <p className="mt-1 text-xs">65% Effective</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
