import clsx from 'clsx';
import type { HTMLAttributes } from 'react';
import { memo } from 'react';

import { useStyles } from './Pill.styles';

type PillProps = HTMLAttributes<HTMLDivElement>;

export const Pill = memo(function Pill({ className, ...delegated }: PillProps) {
  const classes = useStyles();

  return <div className={clsx(className, classes.root)} {...delegated} />;
});
