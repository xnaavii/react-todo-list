import type { Task } from '../../../types/Task';
import TaskItem from '../TaskItem/TaskItem';
import classes from './TaskList.module.css';

type TaskListProps = {
  tasks: Task[];
  listName: 'In Progress' | 'Done';
  onDelete: (id: string) => void;
};

export default function TaskList({
  tasks,
  listName,
  onDelete,
}: TaskListProps) {
  let style;

  if (listName === 'In Progress') {
    style = classes.InProgress;
  } else if (listName === 'Done') {
    style = classes.Done;
  }

  return (
    <section className={style}>
      <h2 className={classes.title}>{listName}</h2>
      {!tasks.length && <p className={classes.noTasks}>No tasks yet.</p>}
      <ul className={classes.tasks} aria-label={listName}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
}
