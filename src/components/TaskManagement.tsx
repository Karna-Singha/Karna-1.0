import * as React from 'react';
import { Check, Plus, X, Calendar, Clock, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useTask, Task } from '@/contexts/TaskContext';
import { format, isPast, isFuture, isToday, isSameDay, compareAsc } from 'date-fns';

interface TaskManagementProps {
  onTasksUpdate?: (tasks: Task[]) => void;
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

const TaskManagement: React.FC<TaskManagementProps> = ({ onTasksUpdate }) => {
  const { tasks, addTask, toggleTaskCompletion, deleteTask } = useTask();
  const [newTaskTitle, setNewTaskTitle] = React.useState<string>('');
  const [newSubject, setNewSubject] = React.useState<string>('Physics');
  const [newDifficulty, setNewDifficulty] = React.useState<number>(3);
  const [isAddingTask, setIsAddingTask] = React.useState<boolean>(false);
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date());
  
  React.useEffect(() => {
    // Notify parent component of task updates
    if (onTasksUpdate) {
      onTasksUpdate(tasks);
    }
  }, [tasks, onTasksUpdate]);

  // Function to check if a spaced task is due today or in the past
  const isTaskDue = (task: Task): boolean => {
    if (!task.isSpacedTask) return true;
    
    try {
      return isSameDay(task.createdAt, currentDate) || compareAsc(task.createdAt, currentDate) <= 0;
    } catch (error) {
      console.error('Error comparing dates:', error);
      return false;
    }
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim() === '') return;
    
    addTask({
      title: newTaskTitle,
      subject: newSubject,
      difficulty: newDifficulty,
      completed: false
    });
    
    setNewTaskTitle('');
    setNewSubject('Physics');
    setNewDifficulty(3);
    setIsAddingTask(false);
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

  const getSpacedTaskColor = (task: Task): string => {
    if (!task.isSpacedTask) return '';
    
    if (task.spaceRepetitionDay && task.spaceRepetitionDay <= 7) {
      return 'border-l-4 border-blue-500';
    } else if (task.spaceRepetitionDay && task.spaceRepetitionDay <= 30) {
      return 'border-l-4 border-purple-500';
    } else {
      return 'border-l-4 border-orange-500';
    }
  };
  
  const getDateDisplay = (date: Date): string => {
    try {
      if (isToday(date)) {
        return 'Today';
      } else {
        return format(date, 'MMM d');
      }
    } catch (error) {
      console.error('Error formatting date:', error, date);
      return 'Invalid date';
    }
  };

  // Filter tasks to only show ones that are due
  const filteredTasks = tasks.filter(isTaskDue);

  // Sort tasks - first by completion, then by due date for spaced tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // Put completed tasks at the bottom
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // For spaced tasks, sort by due date
    if (a.isSpacedTask && b.isSpacedTask) {
      return a.createdAt.getTime() - b.createdAt.getTime();
    }
    
    // Put non-spaced tasks above spaced tasks
    if (a.isSpacedTask !== b.isSpacedTask) {
      return a.isSpacedTask ? 1 : -1;
    }
    
    // Sort by creation date for regular tasks
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  // Check for due tasks periodically (every minute)
  React.useEffect(() => {
    const interval = setInterval(() => {
      // This will trigger a re-render and refresh the filtered tasks
      setCurrentDate(new Date());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="shadow-lg border-karna-primary/20">
      <CardHeader className="pb-2 flex-row flex justify-between items-center">
        <CardTitle className="text-2xl font-bold">Tasks</CardTitle>
        <div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsAddingTask(!isAddingTask)}
            className="rounded-full"
          >
            {isAddingTask ? <X /> : <Plus />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isAddingTask && (
          <div className="mb-4 p-3 bg-muted rounded-lg space-y-3 animate-fade-in">
            <Input
              placeholder="Enter task title..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
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
            
            <Button className="w-full" onClick={handleAddTask}>
              Add Task
            </Button>
          </div>
        )}
        
        <div className="space-y-2 max-h-[500px] overflow-y-auto">
          {sortedTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                task.completed ? 'bg-muted/40 text-muted-foreground line-through' : 'bg-muted'
              } ${getSpacedTaskColor(task)}`}
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTaskCompletion(task.id)}
                className="mt-1"
              />
              
              <div className="flex-1 min-w-0">
                <p className="font-medium">{task.title}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {task.subject}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColor(task.difficulty)}`}>
                    {getDifficultyLabel(task.difficulty)}
                  </span>
                  
                  {task.isSpacedTask && (
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {getDateDisplay(task.createdAt)}
                    </Badge>
                  )}
                </div>
              </div>
              
              <Button
                variant="ghost" 
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-destructive"
                onClick={() => deleteTask(task.id)}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
          
          {sortedTasks.length === 0 && (
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
