import { useState } from 'react';
import TaskInput from './components/TaskInput/TaskInput';
import Logo from './components/Logo/Logo';
import classes from './App.module.css';
import type { Task } from './components/types/Task';
import TaskList from './components/Tasks/TaskList/TaskList';

function App() {
  const [taskInputValue, setTaskInputValue] = useState('');
  const [error, setError] = useState<string>();
  const [tasks, setTasks] = useState<Task[]>([]);

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
        
        <section className={classes.tasksInProgress}>
          <h2>In Progress</h2>
          {tasksInProgress && <TaskList tasks={tasksInProgress} />}
        </section>

        <section className={classes.tasksDone}>
          <h2>Done</h2>
          {doneTasks && <TaskList tasks={doneTasks} />}
        </section>
      
      </div>
    </div>
  );
}

export default App;
