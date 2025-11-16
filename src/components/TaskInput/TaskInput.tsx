import classes from './TaskInput.module.css';

export default function TaskInput() {
  return (
    <form className={classes.form}>
      <input
        aria-label="Add a task"
        placeholder="Add a task"
        className={classes.input}
      />
      <button type="submit" hidden>
        Add
      </button>
    </form>
  );
}
