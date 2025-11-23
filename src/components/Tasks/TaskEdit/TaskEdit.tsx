import classes from './TaskEdit.module.css';
import type { Task } from '../../../types/Task';

type TaskEditProps = {
  task: Task;
  onFinishEditing: () => void;
};

export default function TaskEdit({ task, onFinishEditing }: TaskEditProps) {
  return (
    <form className={classes.taskEditForm}>
      <label htmlFor="edit-task" hidden>
        Edit a task
      </label>
      <input
        id="edit-task"
        aria-label="Edit a task"
        defaultValue={task.name}
        className={classes.taskInput}
      />
      <button
        type="submit"
        onClick={() => onFinishEditing()}
        className={classes.finishEditBtn}
      >
        Finish
      </button>
    </form>
  );
}
