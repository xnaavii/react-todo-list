import { useState, useEffect, useRef } from 'react';
import type { Task } from '../../../types/Task';
import classes from './TaskItem.module.css';
import {
  IoCheckmarkCircle,
  IoEllipseOutline,
  IoTrashOutline,
  IoPencilOutline,
} from 'react-icons/io5';
import TaskEdit from '../TaskEdit/TaskEdit';

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const [selected, setSelected] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const liRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    // Check if the click is outside the taskitem
    // Remove the class 'selected' if it's outside taskitem
    function handleClick(e: MouseEvent) {
      const li = liRef.current;
      if (li && !li.contains(e.target as Node) && selected) {
        setSelected(false);
      }
    }

    // Add event listener
    document.body.addEventListener('click', handleClick);

    // Cleanup function to remove the event listener
    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, [selected]);

  let style = `${classes.task} ${
    task.completed ? classes.isDone : classes.isPending
  }`;

  if (selected) {
    style += ` ${classes.selected}`;
  }

  if (isEditing)
    return <TaskEdit task={task} onFinishEditing={() => setIsEditing(false)} />;

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
        {/* 
        Edit button
        used to edit a task
        */}
        <button
          aria-label="Edit task"
          className={classes.button}
          onClick={() => setIsEditing(true)}
        >
          <IoPencilOutline
            size={18}
            className={classes.editButton}
            strokeWidth={1.72}
          />
        </button>
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
            size={18}
            className={classes.deleteButton}
            strokeWidth={1.72}
          />
        </button>
      </menu>
    </li>
  );
}
