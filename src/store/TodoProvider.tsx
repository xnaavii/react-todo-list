import { useState, createContext, type ReactNode } from 'react';
import type { Task } from '../types/Task';

export type TodoContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  toggleComplete: (id: string) => void;
  createTask: (taskName: string) => void;
};

type TodoProviderProps = {
  children: ReactNode;
};

const TodoContext = createContext<TodoContextType | null>(null);

export default function TodoProvider({ children }: TodoProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  function toggleComplete(id: string) {
    // Takes an task id argument and toggles the completion status
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function createTask(taskName: string) {
    /* 
    Takes taskName as an argument and
    uses it to create a new object with
    taskName as a value for the name property
    */
    const newTask: Task = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      name: taskName,
      createdAt: new Date().toISOString(),
      completed: false,
    };

    // Add newly created task to the list
    setTasks((prev) => [...prev, newTask]);
  }

  const value = {
    tasks,
    setTasks,
    createTask,
    toggleComplete,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export { TodoContext };
