import { useState } from 'react';
import TaskInput from './components/TaskInput/TaskInput';
import Logo from './components/Logo/Logo';
import classes from './App.module.css';

type Task = {
  id: string;
  name: string;
  createdAt: string;
  completed?: boolean;
};

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
    const newTask = {
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

  return (
    <div className={classes.main}>
      <Logo />
      <TaskInput
        value={taskInputValue}
        onChange={handleOnChange}
        onSubmit={handleSubmit}
        error={error}
      />
      {tasks &&
        tasks.map((task) => {
          return <li key={task.id}>{task.name}</li>;
        })}
    </div>
  );
}

export default App;
