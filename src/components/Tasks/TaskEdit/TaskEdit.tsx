import classes from './TaskEdit.module.css';
import type { Task } from '../../../types/Task';
import { useState, type FormEvent } from 'react';

type TaskEditProps = {
  task: Task;
  onEdit: (id: string, newTaskName: string) => void;
  onFinishEdit: () => void;
};

export default function TaskEdit({
  task,
  onEdit,
  onFinishEdit,
}: TaskEditProps) {
  const [value, setValue] = useState(task.name);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onEdit(task.id, value);
    onFinishEdit();
  }

  return (
    <form className={classes.taskEditForm} onSubmit={handleSubmit}>
      <label htmlFor="edit-task" hidden>
        Edit a task
      </label>
      <input
        id="edit-task"
        aria-label="Edit a task"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={classes.taskInput}
      />
      <button
        type="submit"
        aria-label="Finish editing"
        className={classes.finishEditBtn}
      >
        Finish
      </button>
    </form>
  );
}
