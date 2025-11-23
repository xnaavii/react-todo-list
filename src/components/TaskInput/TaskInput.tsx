import { useState } from 'react';
import classes from './TaskInput.module.css';
import { useTodos } from '../../hooks/useTodos';

export default function TaskInput() {
  const [taskInputValue, setTaskInputValue] = useState('');
  const [error, setError] = useState<string>();
  const { createTask } = useTodos();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (taskInputValue.trim() === '') {
      setError('Task name cannot be empty.');
      return;
    }

    // Create a new task by passing in the current input value as name
    createTask(taskInputValue);

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
