import type { Task } from '../../../types/Task';
import classes from './TaskItem.module.css';
import {
  IoCheckmarkCircle,
  IoEllipseOutline,
  IoTrashOutline,
} from 'react-icons/io5';
import { motion } from 'framer-motion';

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <motion.li
      key={task.id}
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{
        opacity: task.completed ? 0.5 : 1,
        y: 0,
        scale: task.completed ? 0.98 : 1,
      }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className={`${classes.task} ${
        task.completed ? classes.isDone : classes.isPending
      }`}
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
    </motion.li>
  );
}
