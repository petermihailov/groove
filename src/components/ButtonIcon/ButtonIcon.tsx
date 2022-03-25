import clsx from 'clsx';
import * as React from 'react';

import { useStyles } from './ButtonIcon.styles';

export interface ButtonIconProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  'aria-label': string; // required
  active?: boolean;
}

export function ButtonIcon({ className, active, ...props }: ButtonIconProps) {
  const classes = useStyles();

  return (
    <button
      className={clsx(className, classes.root, { [classes.active]: active })}
      {...props}
    />
  );
}
