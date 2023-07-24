import clsx from 'clsx';
import type { MouseEventHandler } from 'react';
import { Fragment, memo, useEffect, useMemo, useRef } from 'react';

import { sizeIconDefault } from '../../../constants';
import type { Bar as BarType, Group, Note } from '../../../types/instrument';
import { ensureArray } from '../../../utils/array';
import { orderGroups } from '../../../utils/groove';
import { defaultGroupNoteMap } from '../../../utils/maps';
import { createNoteDataset, getEmptyIconName } from '../Editor.utils';
import { getIconName } from '../Picker/Note/Note.utils';

import classes from './Bar.module.css';

export interface BarProps {
  bar: BarType;
  barIndex: number;
  className?: string;
  enabledGroups: Group[];
  focusedNote: Note | null;
  muted: Group[];
  playing: boolean;
  sizeNote: number;
  tracking: null | number;
  onClick?: MouseEventHandler<SVGSVGElement>;
}

const Bar = ({
  bar,
  barIndex,
  className,
  enabledGroups,
  focusedNote,
  playing,
  muted,
  sizeNote,
  tracking,
  onClick,
}: BarProps) => {
  const refTracker = useRef<SVGRectElement>(null);
  const orderedGroups = useMemo(() => orderGroups(enabledGroups), [enabledGroups]);

  const colsCount = bar.length;
  const rowsCount = enabledGroups.length;

  const hhFootHeight = enabledGroups.includes('hh') ? sizeNote / 2 + 2 : 0;
  const hhFootHeightVB = enabledGroups.includes('hh') ? sizeIconDefault / 2 + 2 : 0;

  const svgWidth = colsCount * sizeNote;
  const svgHeight = rowsCount * sizeNote + hhFootHeight;
  const vbWidth = colsCount * sizeIconDefault;
  const vbHeight = rowsCount * sizeIconDefault + hhFootHeightVB;
  const viewBox = `0 0 ${vbWidth} ${vbHeight}`;

  useEffect(() => {
    const tracker = refTracker.current;
    const index = tracking ?? -1;

    if (tracker) {
      if (playing) {
        if (tracking !== null) {
          tracker.setAttribute('x', String(index * sizeIconDefault));
          tracker.setAttribute('fill', 'var(--color-highlight)');
        }
      } else {
        tracker.setAttribute('fill', 'transparent');
      }
    }
  }, [playing, tracking]);

  return (
    <svg
      className={clsx(className, classes.root)}
      height={svgHeight}
      viewBox={viewBox}
      width={svgWidth}
      onClick={onClick}
    >
      <rect
        ref={refTracker}
        className={classes.tracker}
        fill="transparent"
        height={vbHeight}
        width={sizeIconDefault}
      />

      {orderedGroups.map((group, row) => {
        const columns = [];
        const isMuted = muted.includes(group);

        for (let i = 0; i < bar.length; i++) {
          const instrumentOrNull = ensureArray(bar.groups[group])[i];
          const instrument = instrumentOrNull ?? defaultGroupNoteMap[group];
          const value = Boolean(instrumentOrNull);
          const isHHFootIcon = instrument === 'hhFootRegular' && value;
          const isFocused =
            focusedNote?.instrument === instrument &&
            focusedNote.rhythmIndex === i &&
            focusedNote.barIndex === barIndex;

          columns.push(
            <Fragment key={`${row}-${i}-${instrument}`}>
              <rect
                {...createNoteDataset({
                  barIndex,
                  group,
                  instrument,
                  rhythmIndex: i,
                  value,
                })}
                fill="transparent"
                height={sizeIconDefault}
                width={sizeIconDefault}
                x={sizeIconDefault * i}
                {...(isHHFootIcon
                  ? { y: sizeIconDefault * rowsCount }
                  : { y: sizeIconDefault * row })}
              />
              <use
                fill={isFocused ? 'var(--color-accent)' : undefined}
                href={`#${value ? getIconName(instrument) : getEmptyIconName(group)}`}
                opacity={(value ? 1 : 0.15) * (isMuted ? 0.25 : 1)}
                x={sizeIconDefault * i}
                {...(enabledGroups.includes('hh') && isHHFootIcon
                  ? { y: sizeIconDefault * rowsCount - sizeIconDefault + hhFootHeightVB }
                  : { y: sizeIconDefault * row })}
              />
            </Fragment>,
          );
        }

        return columns;
      })}
    </svg>
  );
};

export default memo(Bar);
