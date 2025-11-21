import { type Ref } from 'react';
import classes from './Modal.module.css';

type ModalProps = {
  ref: Ref<HTMLDialogElement>;
};

export default function Modal({ ref }: ModalProps) {
  return (
    <dialog aria-label="delete alert" ref={ref} className={classes.dialog}>
      <h2>Are you sure you want to delete this task?</h2>
      <menu>
        <button className={classes.delete}>Delete</button>
        <button className={classes.cancel}>Cancel</button>
      </menu>
    </dialog>
  );
}
