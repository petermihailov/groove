import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

import classes from './Pill.module.css';

export type PillProps = HTMLAttributes<HTMLDivElement>;

const Pill = ({ className, ...delegated }: PillProps) => {
  return <div className={clsx(className, classes.root)} {...delegated} />;
};

export default Pill;
