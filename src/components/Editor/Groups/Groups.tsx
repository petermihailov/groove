import clsx from 'clsx';
import { memo } from 'react';

import { sizeIconDefault } from '../../../constants';
import type { InstrumentGroupEnabled } from '../../../types/instrument';
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

  const hhFootHeight = enabledGroups.hh ? sizeNote / 2 + 2 : 0;
  const hhFootHeightVB = enabledGroups.hh ? sizeIconDefault / 2 + 2 : 0;

  const svgWidth = sizeNote;
  const svgHeight = rowsCount * sizeNote + hhFootHeight;
  const vbWidth = sizeIconDefault;
  const vbHeight = rowsCount * sizeIconDefault + hhFootHeightVB;
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
      {enabledGroups.hh && (
        <use href={`#icon.group.hh-foot`} x="0" y={rowsCount * sizeIconDefault - 3} />
      )}
    </svg>
  );
};

export default memo(Groups);
