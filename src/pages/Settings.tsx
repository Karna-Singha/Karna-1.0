
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [breakNotifications, setBreakNotifications] = useState(true);
  const [taskNotifications, setTaskNotifications] = useState(true);
  const [progressNotifications, setProgressNotifications] = useState(false);
  const [accentColor, setAccentColor] = useState('blue');

  const handleColorChange = (color: string) => {
    setAccentColor(color);
    toast({
      title: "Accent color updated",
      description: `Your accent color has been changed to ${color}.`,
    });
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
                      onCheckedChange={setBreakNotifications} 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="task-notifications">Task Reminders</Label>
                    <Switch 
                      id="task-notifications" 
                      checked={taskNotifications} 
                      onCheckedChange={setTaskNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="progress-notifications">Progress Updates</Label>
                    <Switch 
                      id="progress-notifications" 
                      checked={progressNotifications} 
                      onCheckedChange={setProgressNotifications}
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
                      onCheckedChange={setDarkMode} 
                    />
                  </div>
                  <Separator />
                  <div>
                    <Label>Accent Color</Label>
                    <div className="flex gap-2 mt-2">
                      <div 
                        className={`h-8 w-8 rounded-full bg-blue-500 cursor-pointer border-2 ${accentColor === 'blue' ? 'border-white' : 'border-transparent hover:border-white'}`}
                        onClick={() => handleColorChange('blue')}
                      ></div>
                      <div 
                        className={`h-8 w-8 rounded-full bg-purple-500 cursor-pointer border-2 ${accentColor === 'purple' ? 'border-white' : 'border-transparent hover:border-white'}`}
                        onClick={() => handleColorChange('purple')}
                      ></div>
                      <div 
                        className={`h-8 w-8 rounded-full bg-green-500 cursor-pointer border-2 ${accentColor === 'green' ? 'border-white' : 'border-transparent hover:border-white'}`}
                        onClick={() => handleColorChange('green')}
                      ></div>
                      <div 
                        className={`h-8 w-8 rounded-full bg-red-500 cursor-pointer border-2 ${accentColor === 'red' ? 'border-white' : 'border-transparent hover:border-white'}`}
                        onClick={() => handleColorChange('red')}
                      ></div>
                      <div 
                        className={`h-8 w-8 rounded-full bg-yellow-500 cursor-pointer border-2 ${accentColor === 'yellow' ? 'border-white' : 'border-transparent hover:border-white'}`}
                        onClick={() => handleColorChange('yellow')}
                      ></div>
                    </div>
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
