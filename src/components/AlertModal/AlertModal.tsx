import { type Ref } from 'react';
import classes from './AlertModal.module.css';

type ModalProps = {
  ref: Ref<HTMLDialogElement>;
  onClose: () => void;
};

export default function AlertModal({ onClose, ref }: ModalProps) {
  return (
    <dialog aria-label="delete alert" ref={ref} className={classes.dialog}>
      <div>
        <h2>Are you sure you want to delete this task?</h2>
        <menu>
          <button className={classes.delete}>Delete</button>
          <button
            className={classes.cancel}
            aria-label="cancel"
            onClick={() => onClose()}
          >
            Cancel
          </button>
        </menu>
      </div>
    </dialog>
  );
}
