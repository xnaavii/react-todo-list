import { useState } from 'react';
import classes from './TaskInput.module.css';
import { useTodos } from '../../hooks/useTodos';
import type { Task } from '../../types/Task';

export default function TaskInput() {
  const { setTasks } = useTodos();

  const [taskInputValue, setTaskInputValue] = useState('');
  const [error, setError] = useState<string>();

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
    setTasks((prev) => [...prev, newTask]);
    // Clear the input field after
    setTaskInputValue('');
  }

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit}>
        <input
          aria-label="Add a task"
          placeholder="Add a task"
          className={`${classes.input} ${error && classes.error}`}
          value={taskInputValue}
          onChange={(e) => {
            setError('');
            setTaskInputValue(e.target.value);
          }}
        />
        <button type="submit" hidden>
          Add
        </button>
      </form>
      {error && <p className={classes.errorMessage}>{error}</p>}
    </>
  );
}
