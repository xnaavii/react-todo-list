import type { Task } from '../../../types/Task';
import TaskItem from '../TaskItem/TaskItem';
import classes from './TaskList.module.css';

type TaskListProps = {
  tasks: Task[];
  listName: 'In Progress' | 'Done';
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskList({ tasks, listName, onToggle, onDelete }: TaskListProps) {
  let style;

  if (listName === 'In Progress') {
    style = classes.InProgress;
  } else if (listName === 'Done') {
    style = classes.Done;
  }

  return (
    <section className={style}>
      <h2>{listName}</h2>
      {!tasks.length && <p className={classes.noTasks}>No tasks yet.</p>}
      <ul className={classes.tasks} aria-label={listName}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete}/>
        ))}
      </ul>
    </section>
  );
}
