import clsx from 'clsx';
import type { MouseEventHandler } from 'react';
import { Fragment, memo, useEffect, useMemo, useRef } from 'react';

import { sizeIconDefault } from '../../../constants';
import type { Bar as BarType, InstrumentGroupEnabled, Note } from '../../../types/instrument';
import { convertBarInstrumentsByGroups } from '../../../utils/groove';
import { defaultGroupNoteMap } from '../../../utils/maps';
import { safeKeys } from '../../../utils/safe-keys';
import { createNoteDataset, getEmptyIconName } from '../Editor.utils';
import { getIconName } from '../Picker/Note/Note.utils';

import classes from './Bar.module.css';

export interface BarProps {
  bar: BarType;
  barIndex: number;
  className?: string;
  enabledGroups: InstrumentGroupEnabled;
  focusedNote: Note | null;
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
  sizeNote,
  tracking,
  onClick,
}: BarProps) => {
  const refTracker = useRef<SVGRectElement>(null);

  const instrumentsByGroups = useMemo(() => {
    return convertBarInstrumentsByGroups(bar, enabledGroups);
  }, [bar, enabledGroups]);

  const colsCount = bar.length;
  const rowsCount = Object.keys(instrumentsByGroups).length;

  const hhFootHeight = enabledGroups.hh ? sizeNote / 2 + 2 : 0;
  const hhFootHeightVB = enabledGroups.hh ? sizeIconDefault / 2 + 2 : 0;

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

      {safeKeys(instrumentsByGroups).map((group, row) => {
        return instrumentsByGroups[group].map((instrumentOrNull, col) => {
          const instrument = instrumentOrNull ?? defaultGroupNoteMap[group];
          const value = Boolean(instrumentOrNull);
          const isHHFootIcon = instrument === 'hhFootRegular' && value;
          const isFocused =
            focusedNote?.instrument === instrument &&
            focusedNote.rhythmIndex === col &&
            focusedNote.barIndex === barIndex;

          return (
            <Fragment key={`${row}-${col}-${instrument}`}>
              <rect
                {...createNoteDataset({
                  barIndex,
                  group,
                  instrument,
                  rhythmIndex: col,
                  value,
                })}
                fill="transparent"
                height={sizeIconDefault}
                width={sizeIconDefault}
                x={sizeIconDefault * col}
                {...(isHHFootIcon
                  ? { y: sizeIconDefault * rowsCount }
                  : { y: sizeIconDefault * row })}
              />
              <use
                fill={isFocused ? 'var(--color-accent)' : undefined}
                href={`#${value ? getIconName(instrument) : getEmptyIconName(group)}`}
                opacity={value ? 1 : 0.15}
                x={sizeIconDefault * col}
                {...(isHHFootIcon
                  ? { y: sizeIconDefault * rowsCount - sizeIconDefault + hhFootHeightVB }
                  : { y: sizeIconDefault * row })}
              />
            </Fragment>
          );
        });
      })}
    </svg>
  );
};

export default memo(Bar);
