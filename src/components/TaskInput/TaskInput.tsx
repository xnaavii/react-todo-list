import classes from './TaskInput.module.css';

type TaskInputProps = {
  value: string;
  onChange: (newValue: string) => void;
};

export default function TaskInput({ value, onChange }: TaskInputProps) {
  return (
    <form className={classes.form}>
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
  );
}
