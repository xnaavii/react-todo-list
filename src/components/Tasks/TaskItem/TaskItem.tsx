import type { Task } from '../../../types/Task';
import classes from './TaskItem.module.css';

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
};

export default function TaskItem({ task, onToggle }: TaskItemProps) {
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
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        onClick={() => onToggle(task.id)}
      />
    </li>
  );
}
