import { type Ref } from 'react';
import classes from './AlertModal.module.css';

type ModalProps = {
  ref: Ref<HTMLDialogElement>;
  onClose: () => void;
  onConfirm: () => void;
};

export default function AlertModal({ onClose, onConfirm, ref }: ModalProps) {
  return (
    <dialog aria-label="delete alert" ref={ref} className={classes.dialog}>
      <div className={classes.dialogContent}>
        <h2>Are you sure you want to delete this task?</h2>
        <menu>
          <button
            className={classes.delete}
            aria-label="confirm"
            onClick={() => onConfirm()}
          >
            Delete
          </button>
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
