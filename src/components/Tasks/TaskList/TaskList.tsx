import type { Task } from '../../../types/Task';
import TaskItem from '../TaskItem/TaskItem';
import classes from './TaskList.module.css';

type TaskListProps = {
  tasks: Task[];
  listName: string;
};

export default function TaskList({ tasks, listName }: TaskListProps) {
  if (!tasks.length) return <p className={classes.noTasks}>No tasks yet.</p>;

  return (
    <ul className={classes.tasks} aria-label={listName}>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
