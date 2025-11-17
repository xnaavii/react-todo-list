import type { Task } from '../../types/Task';
import classes from './TaskItem.module.css';

type TaskItemProps = {
  task: Task;
};

export default function TaskItem({ task }: TaskItemProps) {
  return (
    <li
      className={`${classes.task} ${
        task.completed ? classes.isDone : classes.isPending
      }`}
    >
      <span className={classes.taskName}>{task.name}</span>

      <button
        className={`${classes.button} ${
          task.completed ? classes.isDone : classes.isPending
        }`}
      />
    </li>
  );
}
