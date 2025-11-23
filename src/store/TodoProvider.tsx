import { useState, createContext, type ReactNode } from 'react';
import type { Task } from '../types/Task';
import type { TodoContextType } from '../types/TodoContext';

type TodoProviderProps = {
  children: ReactNode;
};

const TodoContext = createContext<TodoContextType | null>(null);

export default function TodoProvider({ children }: TodoProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const value = {
    tasks,
    setTasks,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export { TodoContext };
