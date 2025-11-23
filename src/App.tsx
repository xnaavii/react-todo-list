import { useCallback, useEffect, useRef, useState } from 'react';
import TaskInput from './components/TaskInput/TaskInput';
import Logo from './components/Logo/Logo';
import classes from './App.module.css';
import TaskList from './components/Tasks/TaskList/TaskList';
import Modal from './components/AlertModal/AlertModal';
import { useTodos } from './hooks/useTodos';

function App() {
  const { tasks, setTasks } = useTodos();
  const [isOpen, setIsOpen] = useState(false);
  const [taskToRemoveId, setTaskToRemoveId] = useState('');

  const dialogRef = useRef<HTMLDialogElement>(null);

  function handleDeleteTask() {
    setTasks((prev) => prev.filter((task) => task.id !== taskToRemoveId));
    dialogRef.current?.close();
    setIsOpen(false);
  }

  function handleStartDeleteTask(id: string) {
    setIsOpen(true);
    setTaskToRemoveId(id);
    // Show modal once mounted after a delay
    setTimeout(() => dialogRef.current?.showModal(), 0);
  }

  const handleStopDeleteTask = useCallback(function handleStopDeleteTask() {
    dialogRef.current?.close();
    setIsOpen(false);
    setTaskToRemoveId('');
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Handler for clicks on the dialog element
    function handleDialogMouseDown(e: MouseEvent) {
      if (e.target === dialog) {
        handleStopDeleteTask();
      }
    }

    // Attach listener to the dialog
    dialog.addEventListener('mousedown', handleDialogMouseDown);

    // Cleanup on unmount
    return () => {
      dialog.removeEventListener('mousedown', handleDialogMouseDown);
    };
  }, [dialogRef, isOpen, handleStopDeleteTask]);

  const tasksInProgress = tasks.filter((task) => task.completed === false);
  const doneTasks = tasks.filter((task) => task.completed === true);

  return (
    <div className={classes.main}>
      <Logo />
      <TaskInput />

      <div className={classes.tasksContainer}>
        <TaskList
          tasks={tasksInProgress}
          listName={'In Progress'}
          onDelete={handleStartDeleteTask}
        />
        <TaskList
          tasks={doneTasks}
          listName={'Done'}
          onDelete={handleStartDeleteTask}
        />
      </div>
      {isOpen && (
        <Modal
          ref={dialogRef}
          onClose={handleStopDeleteTask}
          onConfirm={handleDeleteTask}
        />
      )}
    </div>
  );
}

export default App;
