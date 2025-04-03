import * as React from 'react';
import { addDays, format, isAfter } from 'date-fns';

// Define the structure of a task
export interface Task {
  id: string;
  title: string;
  subject: string;
  difficulty: number;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
  parentTaskId?: string;
  spaceRepetitionDay?: number; // 3, 7, 15, 30, 60, or 90
  isSpacedTask?: boolean;
}

// The intervals for spaced repetition in days
const SPACED_REPETITION_INTERVALS = [3, 7, 15, 30, 60, 90];
const LOCAL_STORAGE_KEY = 'karna-tasks';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = React.createContext<TaskContextType | undefined>(undefined);

// Helper function to parse dates from localStorage
const parseTaskDates = (task: any): Task => {
  return {
    ...task,
    createdAt: new Date(task.createdAt),
    completedAt: task.completedAt ? new Date(task.completedAt) : undefined
  };
};

// Sample default tasks
const defaultTasks: Task[] = [
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
];

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage if available
  const [tasks, setTasks] = React.useState<Task[]>(() => {
    try {
      const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        return Array.isArray(parsedTasks) 
          ? parsedTasks.map(parseTaskDates)
          : defaultTasks;
      }
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
    }
    
    // Default tasks if localStorage is empty or invalid
    return defaultTasks;
  });
  
  // Save tasks to localStorage whenever they change
  React.useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  }, [tasks]);

  // Function to create spaced repetition tasks
  const createSpacedRepetitionTasks = (task: Task) => {
    // Only create spaced tasks for non-spaced original tasks
    if (task.isSpacedTask) return;

    const newTasks: Task[] = [];

    // Create a new task for each interval
    SPACED_REPETITION_INTERVALS.forEach(interval => {
      const dueDate = addDays(new Date(), interval);
      let title = task.title;

      // Apply prefixes based on the interval
      if (interval >= 15 && interval <= 30) {
        title = `Revise [${Math.floor((interval - 15) / 15) + 1}]: ${task.title}`;
      } else if (interval > 30) {
        title = `Question Practice: ${task.title}`;
      }

      // Create the spaced repetition task
      const spacedTask: Task = {
        id: `${task.id}-sr-${interval}-${Date.now()}`,
        title,
        subject: task.subject,
        difficulty: task.difficulty,
        completed: false,
        createdAt: dueDate, // Scheduled for future
        parentTaskId: task.id,
        spaceRepetitionDay: interval,
        isSpacedTask: true
      };

      newTasks.push(spacedTask);
    });

    // Add the new spaced repetition tasks
    setTasks(prevTasks => [...prevTasks, ...newTasks]);
  };

  const addTask = (taskDetails: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskDetails,
      id: Date.now().toString(),
      createdAt: new Date()
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => {
        if (task.id === id) {
          const completed = !task.completed;
          const updatedTask = { 
            ...task, 
            completed,
            completedAt: completed ? new Date() : undefined
          };

          // If task is completed and it's not a spaced task, create spaced repetition tasks
          if (completed && !task.isSpacedTask) {
            // Schedule creation of spaced repetition tasks on next tick to ensure
            // the task completion state is updated first
            setTimeout(() => createSpacedRepetitionTasks(updatedTask), 0);
          }

          return updatedTask;
        }
        return task;
      });

      return updatedTasks;
    });
  };

  const deleteTask = (id: string) => {
    // Also delete any spaced repetition tasks derived from this task
    setTasks(prevTasks => prevTasks.filter(task => 
      task.id !== id && task.parentTaskId !== id
    ));
  };

  // Value to be provided by the context
  const value = {
    tasks,
    addTask,
    toggleTaskCompletion,
    deleteTask
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
  const context = React.useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export default TaskContext; 