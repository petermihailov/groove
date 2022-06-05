import clsx from 'clsx';
import { memo } from 'react';

import type { IconName } from '../../types';

import { useStyles } from './Icon.styles';

type IconProps = {
  className?: string;
  name: IconName;
};

export const Icon = memo(function Icon({ name, className }: IconProps) {
  const classes = useStyles();

  return (
    <svg
      aria-hidden="true"
      className={clsx(className, classes.root)}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <use href={`#${name}`} />
    </svg>
  );
});
