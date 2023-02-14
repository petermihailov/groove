import clsx from 'clsx';
import { memo } from 'react';

import type { IconName } from '../../types';

import classes from './Icon.css';

export interface IconProps {
  className?: string;
  name: IconName;
}

const Icon = ({ name, className }: IconProps) => {
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
};

export default memo(Icon);
