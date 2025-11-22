import { useCallback, useEffect, useRef, useState } from 'react';
import TaskInput from './components/TaskInput/TaskInput';
import Logo from './components/Logo/Logo';
import classes from './App.module.css';
import type { Task } from './types/Task';
import TaskList from './components/Tasks/TaskList/TaskList';
import Modal from './components/AlertModal/AlertModal';

function App() {
  const [taskInputValue, setTaskInputValue] = useState('');
  const [error, setError] = useState<string>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (taskInputValue.trim() === '') {
      setError('Task name cannot be empty.');
      return;
    }

    setError('');

    // Create a new task object
    const newTask: Task = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      name: taskInputValue,
      createdAt: new Date().toISOString(),
      completed: false,
    };

    // Add a new task to the list
    setTasks([...tasks, newTask]);
    // Clear the input field after
    setTaskInputValue('');
  }

  function handleOnChange(newValue: string) {
    setError('');
    setTaskInputValue(newValue);
  }

  function toggleDone(id: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function handleStartDeleteTask() {
    setIsOpen(true);

    // Show modal once mounted after a delay
    setTimeout(() => dialogRef.current?.showModal(), 0);
  }

  const handleCancelDeleteTask = useCallback(function handleCancelDeleteTask() {
    dialogRef.current?.close();
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Handler for clicks on the dialog element
    function handleDialogMouseDown(e: MouseEvent) {
      if (e.target === dialog) {
        dialogRef.current?.close();
        setIsOpen(false);
      }
    }

    // Attach listener to the dialog
    dialog.addEventListener('mousedown', handleDialogMouseDown);

    // Cleanup on unmount
    return () => {
      dialog.removeEventListener('mousedown', handleDialogMouseDown);
    };
  }, [dialogRef, isOpen]);

  const tasksInProgress = tasks.filter((task) => task.completed === false);
  const doneTasks = tasks.filter((task) => task.completed === true);

  return (
    <div className={classes.main}>
      <Logo />
      <TaskInput
        value={taskInputValue}
        onChange={handleOnChange}
        onSubmit={handleSubmit}
        error={error}
      />

      <div className={classes.tasksContainer}>
        <TaskList
          tasks={tasksInProgress}
          listName={'In Progress'}
          onToggle={toggleDone}
          onDelete={handleStartDeleteTask}
        />
        <TaskList
          tasks={doneTasks}
          listName={'Done'}
          onToggle={toggleDone}
          onDelete={handleStartDeleteTask}
        />
      </div>
      {isOpen && <Modal ref={dialogRef} onClose={handleCancelDeleteTask} />}
    </div>
  );
}

export default App;
