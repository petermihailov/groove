import { memo, useMemo } from 'react';

import type { Measure as MeasureType } from '../../../lib/Measure';
import { theme } from '../../../styles';
import type { InstrumentGroup } from '../../../types';
import { Note } from '../Note';

import { useStyles } from './Measure.styles';

type MeasureProps = {
  measure: MeasureType;
  highlightIndex?: number;
};

export const Measure = memo(function Measure({ measure, highlightIndex }: MeasureProps) {
  const classes = useStyles();

  const renderNotesByGroup = useMemo(
    () => (group: InstrumentGroup) => {
      return measure.notes[group].map((instrument, idx) => (
        <Note key={idx} instrument={instrument} group={group} />
      ));
    },
    [measure.notes]
  );

  return (
    <div
      className={classes.root}
      style={{ gridTemplateColumns: `repeat(${measure.length}, auto)` }}
    >
      {highlightIndex !== undefined && (
        <div
          className={classes.highlight}
          style={{
            transform: `translateX(calc(${highlightIndex} * (${theme.sizeNote} + ${theme.spacingNote})))`,
          }}
        />
      )}
      {/*{renderNotesByGroup("cy")}*/}
      {renderNotesByGroup('hh')}
      {/*{renderNotesByGroup("t1")}*/}
      {renderNotesByGroup('sn')}
      {/*{renderNotesByGroup("t3")}*/}
      {renderNotesByGroup('ki')}
    </div>
  );
});
