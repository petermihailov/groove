import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

import { useStyles } from './ButtonIcon.styles';

export interface ButtonIconProps extends HTMLAttributes<HTMLButtonElement> {
  'aria-label': string; // required
  active?: boolean;
  disabled?: boolean;
}

export function ButtonIcon({ className, active, ...props }: ButtonIconProps) {
  const classes = useStyles();
  const title = props['aria-label'];

  return (
    <button
      className={clsx(className, classes.root, { [classes.active]: active })}
      title={title}
      {...props}
    />
  );
}
