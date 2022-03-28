import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

import { useStyles } from './IconAccent.styles';

export function IconAccent({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  const classes = useStyles();

  return (
    <span className={clsx(className, classes.accent)} {...props} />
  );
}
