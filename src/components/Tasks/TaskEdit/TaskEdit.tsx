import classes from './TaskEdit.module.css';
import type { Task } from '../../../types/Task';
import { useState, type FormEvent, type Ref } from 'react';
import { useTodos } from '../../../hooks/useTodos';

type TaskEditProps = {
  task: Task;
  setIsEditing: (arg0: boolean) => void;
  ref: Ref<HTMLInputElement>;
};

export default function TaskEdit({ task, setIsEditing, ref }: TaskEditProps) {
  const [value, setValue] = useState(task.name);
  const [error, setError] = useState('');
  const { editTask } = useTodos();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (value.trim() === '') {
      setError('Task name cannot be empty');
      return;
    }

    editTask(task.id, value);
    setIsEditing(false);
  }

  return (
    <>
      <form className={classes.taskEditForm} onSubmit={handleSubmit}>
        <label htmlFor="edit-task" hidden>
          Edit a task
        </label>
        <input
          id="edit-task"
          aria-label="Edit a task"
          value={value}
          onChange={(e) => {
            setError('');
            setValue(e.target.value);
          }}
          className={classes.taskInput}
          ref={ref}
        />
        <menu className={classes.buttons}>
          <button
            type="submit"
            aria-label="Finish editing"
            className={classes.finishEditBtn}
          >
            Finish
          </button>
          <button
            aria-label="Cancel editing"
            className={classes.cancelEditBtn}
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </menu>
      </form>
      {error && <p className={classes.errorMessage}>{error}</p>}
    </>
  );
}
