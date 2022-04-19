import type { MouseEventHandler } from 'react';
import { useCallback } from 'react';

import type { Measure as MeasureType } from '../../../lib/Measure';
import { theme } from '../../../styles';
import { sizes } from '../../../styles/tokens';
import type { InstrumentGroup, InstrumentGroupEnabled } from '../../../types';
import { Note } from '../Note';

import { useStyles } from './Measure.styles';

type MeasureProps = {
  enabledGroups: InstrumentGroupEnabled;
  measure: MeasureType;
  highlightIndex?: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export function Measure({ enabledGroups, measure, highlightIndex, ...delegated }: MeasureProps) {
  const classes = useStyles();

  const renderNotesByGroup = useCallback(
    (group: InstrumentGroup) => {
      if (enabledGroups[group]) {
        return measure.notes[group].map((instrument, idx) => {
          let style;

          if (instrument === 'hhFootRegular') {
            const enabledGroupsCount = Object.values(enabledGroups).filter(Boolean).length;
            style = {
              transform: `translateY(calc(${sizes.sizeNote} * ${enabledGroupsCount - 1} + 0.5rem))`,
            };
          }

          return <Note key={idx} style={style} index={idx} instrument={instrument} group={group} />;
        });
      }
      return null;
    },
    [enabledGroups, measure.notes]
  );

  return (
    <div
      className={classes.root}
      style={{ gridTemplateColumns: `repeat(${measure.length}, auto)` }}
      {...delegated}
    >
      {highlightIndex !== undefined && (
        <div
          className={classes.highlight}
          style={{
            transform: `translateX(calc(${highlightIndex} * (${theme.sizeNote} + ${theme.spacingNote})))`,
          }}
        />
      )}
      {renderNotesByGroup('cy')}
      {renderNotesByGroup('hh')}
      {renderNotesByGroup('t1')}
      {renderNotesByGroup('sn')}
      {renderNotesByGroup('t2')}
      {renderNotesByGroup('t3')}
      {renderNotesByGroup('ki')}
    </div>
  );
}
