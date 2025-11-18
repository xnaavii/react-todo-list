import type { Task } from '../../../types/Task';
import classes from './TaskItem.module.css';
import { IoCheckmarkCircle, IoEllipseOutline } from 'react-icons/io5';

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
        className={classes.button}
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        onClick={() => onToggle(task.id)}
      >
        {task.completed ? (
          // Tasks Done Icon
          <IoCheckmarkCircle
            size={24}
            color={'#448588'}
            stroke={'#448588'}
            strokeWidth={1.72}
          />
        ) : (
          // Tasks In Progress Icon
          <IoEllipseOutline
            size={24}
            color={'#5BC0EB'}
            stroke={'#5BC0EB'}
            strokeWidth={1.72}
          />
        )}
      </button>
    </li>
  );
}
