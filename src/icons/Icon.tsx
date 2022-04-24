import { memo } from 'react';

import type { IconName } from '../types';

type IconProps = {
  className?: string;
  name: IconName;
};

export const Icon = memo(function Icon({ name, className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      width="2rem"
      height="2rem"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <use href={`#${name}`} />
    </svg>
  );
});
