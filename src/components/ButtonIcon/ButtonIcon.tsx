import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

import classes from './ButtonIcon.css';

export interface ButtonIconProps extends HTMLAttributes<HTMLButtonElement> {
  'aria-label': string; // required
  active?: boolean;
  disabled?: boolean;
}

const ButtonIcon = ({ className, active, ...props }: ButtonIconProps) => {
  const title = props['aria-label'];

  return (
    <button
      className={clsx(className, classes.root, { [classes.active]: active })}
      title={title}
      {...props}
    />
  );
};

export default ButtonIcon;
