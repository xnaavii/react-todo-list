import classes from './TaskInput.module.css';

type TaskInputProps = {
  value: string;
  error?: string;
  onChange: (newValue: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function TaskInput({
  value,
  error,
  onChange,
  onSubmit,
}: TaskInputProps) {
  return (
    <>
      <form className={classes.form} onSubmit={onSubmit}>
        <input
          aria-label="Add a task"
          placeholder="Add a task"
          className={`${classes.input} ${error && classes.error}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button type="submit" hidden>
          Add
        </button>
      </form>
      {error && <p className={classes.errorMessage}>{error}</p>}
    </>
  );
}
