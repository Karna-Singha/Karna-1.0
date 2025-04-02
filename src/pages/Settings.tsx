
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [breakNotifications, setBreakNotifications] = useState(true);
  const [taskNotifications, setTaskNotifications] = useState(true);
  const [progressNotifications, setProgressNotifications] = useState(false);

  const handleDarkModeChange = (checked: boolean) => {
    setDarkMode(checked);
    toast.success(`${checked ? 'Dark' : 'Light'} mode enabled`);
  };

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
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">
              Customize your experience and preferences.
            </p>
          </header>
          
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure how you receive notifications.</CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel of the application.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <Switch 
                      id="dark-mode" 
                      checked={darkMode} 
                      onCheckedChange={handleDarkModeChange} 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
