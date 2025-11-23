import { useState, createContext, type ReactNode } from 'react';
import type { Task } from '../types/Task';

export type TodoContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  toggleComplete: (id: string) => void;
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

  const value = {
    tasks,
    setTasks,
    toggleComplete,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export { TodoContext };
