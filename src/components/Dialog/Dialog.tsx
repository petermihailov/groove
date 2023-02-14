import clsx from 'clsx';
import type { DialogHTMLAttributes, MouseEventHandler, ReactEventHandler } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';

import classes from './Dialog.css';

export interface DialogHandlers {
  show: () => void;
  showModal: () => void;
  close: () => void;
}

export interface DialogProps extends DialogHTMLAttributes<HTMLDialogElement> {
  mode: 'mega' | 'mini';
}

const Dialog = forwardRef<DialogHandlers, DialogProps>(function Dialog(props, ref) {
  const { className, mode = 'mega', ...restProps } = props;
  const dialogRef = useRef<HTMLDialogElement>(null);

  const lightDismiss: MouseEventHandler<HTMLDialogElement> = useCallback(({ target }) => {
    if (target === dialogRef.current) {
      dialogRef.current.offsetTop; // repaint
      dialogRef.current?.close('dismiss');
    }
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        show: () => dialogRef.current?.show(),
        showModal: () => dialogRef.current?.showModal(),
        close: () => dialogRef.current?.close(),
      };
    },
    [],
  );

  return (
    <dialog
      ref={dialogRef}
      className={clsx(className, classes.root)}
      data-mode={mode}
      onClick={lightDismiss}
      {...restProps}
    />
  );
});

export default Dialog;
