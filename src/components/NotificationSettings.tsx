import * as React from 'react';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const NotificationSettings = () => {
  const [breakNotifications, setBreakNotifications] = useState(true);
  const [taskNotifications, setTaskNotifications] = useState(true);
  const [progressNotifications, setProgressNotifications] = useState(false);

  const handleNotificationChange = (type: string, checked: boolean) => {
    switch (type) {
      case 'break':
        setBreakNotifications(checked);
        break;
      case 'task':
        setTaskNotifications(checked);
        break;
      case 'progress':
        setProgressNotifications(checked);
        break;
      default:
        return;
    }
    
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} notifications ${checked ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="break-notifications">Break Reminders</Label>
        <Switch 
          id="break-notifications" 
          checked={breakNotifications} 
          onCheckedChange={(checked) => handleNotificationChange('break', checked)} 
        />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="task-notifications">Task Reminders</Label>
        <Switch 
          id="task-notifications" 
          checked={taskNotifications} 
          onCheckedChange={(checked) => handleNotificationChange('task', checked)}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="progress-notifications">Progress Updates</Label>
        <Switch 
          id="progress-notifications" 
          checked={progressNotifications} 
          onCheckedChange={(checked) => handleNotificationChange('progress', checked)}
        />
      </div>
    </div>
  );
};

export default NotificationSettings; 