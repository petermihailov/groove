import clsx from 'clsx';
import { Fragment, memo } from 'react';

import { sizeIconDefault } from '../../../constants';
import type { Group } from '../../../types/instrument';
import { orderGroups } from '../../../utils/groove';

import classes from './Groups.module.css';

export interface GroupsProps {
  className?: string;
  enabledGroups: Group[];
  muted: Group[];
  muteGroup: (group: Group) => void;
  unmuteGroup: (group: Group) => void;
  sizeNote: number;
}

const Groups = ({
  className,
  enabledGroups,
  muted,
  muteGroup,
  unmuteGroup,
  sizeNote,
}: GroupsProps) => {
  const orderedGroups = orderGroups(enabledGroups);
  const rowsCount = orderedGroups.length;

  let hhFootHeight = 0;
  let hhFootHeightVB = 0;

  if (orderedGroups.includes('hh')) {
    hhFootHeight = sizeNote / 2 + 2;
    hhFootHeightVB = sizeIconDefault / 2 + 2;
  }

  const svgWidth = sizeNote;
  const svgHeight = rowsCount * sizeNote + hhFootHeight;
  const vbWidth = sizeIconDefault;
  const vbHeight = rowsCount * sizeIconDefault + hhFootHeightVB;
  const viewBox = `0 0 ${vbWidth} ${vbHeight}`;

  const toggle = (group: Group) => () =>
    muted.includes(group) ? unmuteGroup(group) : muteGroup(group);

  return (
    <svg
      className={clsx(className, classes.root)}
      height={svgHeight}
      viewBox={viewBox}
      width={svgWidth}
    >
      {orderedGroups.map((group, row) => (
        <Fragment key={group}>
          <use
            href={`#icon.group.${group}`}
            opacity={muted.includes(group) ? 0.5 : 1}
            x="0"
            y={row * sizeIconDefault}
          />
          <rect
            fill="transparent"
            height={sizeIconDefault}
            width={sizeIconDefault}
            x="0"
            y={row * sizeIconDefault}
            onClick={toggle(group)}
          />
        </Fragment>
      ))}

      {orderedGroups.includes('hh') && (
        <use href={`#icon.group.hh-foot`} x="0" y={rowsCount * sizeIconDefault - 3} />
      )}
    </svg>
  );
};

export default memo(Groups);
