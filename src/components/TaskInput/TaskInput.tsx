import { useState } from 'react';
import classes from './TaskInput.module.css';

type TaskInputProps = {
  value: string;
  onChange: (newValue: string) => void;
};

export default function TaskInput({ value, onChange }: TaskInputProps) {
  const [error, setError] = useState<string>();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (value === '') {
      setError('Task name cannot be empty');
    }
  }

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit}>
        <input
          aria-label="Add a task"
          placeholder="Add a task"
          className={classes.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button type="submit" hidden>
          Add
        </button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
}
