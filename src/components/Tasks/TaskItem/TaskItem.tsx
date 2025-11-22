import { useState, useEffect, useRef } from 'react';
import type { Task } from '../../../types/Task';
import classes from './TaskItem.module.css';
import {
  IoCheckmarkCircle,
  IoEllipseOutline,
  IoTrashOutline,
} from 'react-icons/io5';

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const [selected, setSelected] = useState(false);

  let style = `${classes.task} ${
    task.completed ? classes.isDone : classes.isPending
  }`;

  if (selected) {
    style += ` ${classes.selected}`;
  }

  const liRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const li = liRef.current;
      if (li && !li.contains(e.target as Node) && selected) {
        setSelected(false);
      }
    }

    document.body.addEventListener('click', handleClick);

    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, [selected]);

  return (
    <li
      key={task.id}
      className={style}
      data-selected={selected}
      onClick={() => setSelected(!selected)}
      ref={liRef}
    >
      <span className={classes.taskName}>{task.name}</span>
      {/* Buttons */}
      <menu className={classes.buttons}>
        {/* 
        Delete button
        used to remove a task
        */}
        <button
          aria-label="Delete task"
          className={classes.button}
          onClick={() => onDelete(task.id)}
        >
          <IoTrashOutline
            size={24}
            className={classes.deleteButton}
            strokeWidth={1.72}
          />
        </button>
        {/* 
        Toggle task completion button
        Changes depending on the task status
        */}
        <button
          className={classes.button}
          aria-label={
            task.completed ? 'Mark as incomplete' : 'Mark as complete'
          }
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
      </menu>
    </li>
  );
}
