
import React, { useState, useEffect } from 'react';
import { Check, Plus, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Task {
  id: string;
  title: string;
  subject: string;
  difficulty: number;
  completed: boolean;
  createdAt: Date;
}

interface TaskManagementProps {
  onTasksUpdate?: (tasks: Task[]) => void;
  initialTasks?: Task[];
}

const subjects = [
  "Physics",
  "Mathematics",
  "Zoology",
  "Botany",
  "Physical Chemistry",
  "Inorganic Chemistry",
  "Organic Chemistry"
];

const TaskManagement: React.FC<TaskManagementProps> = ({ 
  onTasksUpdate,
  initialTasks = []
}) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks.length > 0 ? initialTasks : [
    {
      id: '1',
      title: 'Complete physics problems from chapter 5',
      subject: 'Physics',
      difficulty: 4,
      completed: false,
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Review organic chemistry nomenclature',
      subject: 'Organic Chemistry',
      difficulty: 3,
      completed: false,
      createdAt: new Date()
    }
  ]);
  
  const [newTask, setNewTask] = useState<string>('');
  const [newSubject, setNewSubject] = useState<string>('Physics');
  const [newDifficulty, setNewDifficulty] = useState<number>(3);
  const [isAddingTask, setIsAddingTask] = useState<boolean>(false);
  
  useEffect(() => {
    // Notify parent component of task updates
    if (onTasksUpdate) {
      onTasksUpdate(tasks);
    }
  }, [tasks, onTasksUpdate]);

  const addTask = () => {
    if (newTask.trim() === '') return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      subject: newSubject,
      difficulty: newDifficulty,
      completed: false,
      createdAt: new Date()
    };
    
    setTasks([...tasks, task]);
    setNewTask('');
    setNewSubject('Physics');
    setNewDifficulty(3);
    setIsAddingTask(false);
  };
  
  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  const getDifficultyLabel = (difficulty: number): string => {
    switch (difficulty) {
      case 1:
        return 'Very Easy';
      case 2:
        return 'Easy';
      case 3:
        return 'Medium';
      case 4:
        return 'Hard';
      case 5:
        return 'Very Hard';
      default:
        return 'Medium';
    }
  };
  
  const getDifficultyColor = (difficulty: number): string => {
    switch (difficulty) {
      case 1:
        return 'bg-green-500/10 text-green-600';
      case 2:
        return 'bg-emerald-500/10 text-emerald-600';
      case 3:
        return 'bg-yellow-500/10 text-yellow-600';
      case 4:
        return 'bg-orange-500/10 text-orange-600';
      case 5:
        return 'bg-red-500/10 text-red-600';
      default:
        return 'bg-yellow-500/10 text-yellow-600';
    }
  };
  
  return (
    <Card className="shadow-lg border-karna-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold flex items-center justify-between">
          Tasks
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsAddingTask(!isAddingTask)}
            className="rounded-full"
          >
            {isAddingTask ? <X /> : <Plus />}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isAddingTask && (
          <div className="mb-4 p-3 bg-muted rounded-lg space-y-3 animate-fade-in">
            <Input
              placeholder="Enter task title..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="border-muted-foreground/20"
            />
            
            <div className="grid grid-cols-2 gap-2">
              <Select
                value={newSubject}
                onValueChange={(value) => setNewSubject(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select
                value={newDifficulty.toString()}
                onValueChange={(value) => setNewDifficulty(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((level) => (
                    <SelectItem key={level} value={level.toString()}>
                      {getDifficultyLabel(level)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button className="w-full" onClick={addTask}>
              Add Task
            </Button>
          </div>
        )}
        
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                task.completed ? 'bg-muted/40 text-muted-foreground line-through' : 'bg-muted'
              }`}
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTaskCompletion(task.id)}
                className="mt-1"
              />
              
              <div className="flex-1 min-w-0">
                <p className="font-medium">{task.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {task.subject}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColor(task.difficulty)}`}>
                    {getDifficultyLabel(task.difficulty)}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {tasks.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No tasks yet. Add some to get started!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskManagement;
