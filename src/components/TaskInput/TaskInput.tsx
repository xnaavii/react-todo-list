import { useState } from 'react';
import classes from './TaskInput.module.css';

export default function TaskInput() {
  const [value, setValue] = useState('');

  return (
    <form className={classes.form}>
      <input
        aria-label="Add a task"
        placeholder="Add a task"
        className={classes.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" hidden>
        Add
      </button>
    </form>
  );
}
