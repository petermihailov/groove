import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

import { useStyles } from './Note.styles';

export interface NoteProps extends HTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
}

export function Note({ className, children, ...props }: NoteProps) {
  const classes = useStyles();

  return (
    <button className={clsx(className, classes.root)} {...props} />
  );
}
