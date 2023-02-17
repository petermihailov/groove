import clsx from 'clsx';
import { memo } from 'react';

import { sizeIconDefault } from '../../../constants';
import type { InstrumentGroupEnabled } from '../../../types';
import { orderedEnabledGroups } from '../../../utils/groove';

import classes from './Groups.module.css';

export interface GroupsProps {
  className?: string;
  enabledGroups: InstrumentGroupEnabled;
  sizeNote: number;
}

const Groups = ({ className, enabledGroups, sizeNote }: GroupsProps) => {
  const groups = orderedEnabledGroups(enabledGroups);
  const rowsCount = groups.length;

  const svgWidth = sizeNote;
  const svgHeight = rowsCount * sizeNote;
  const vbWidth = sizeIconDefault;
  const vbHeight = rowsCount * sizeIconDefault;
  const viewBox = `0 0 ${vbWidth} ${vbHeight}`;

  return (
    <svg
      className={clsx(className, classes.root)}
      height={svgHeight}
      viewBox={viewBox}
      width={svgWidth}
    >
      {groups.map((group, row) => (
        <use key={group} href={`#icon.group.${group}`} x="0" y={row * sizeIconDefault} />
      ))}
    </svg>
  );
};

export default memo(Groups);
