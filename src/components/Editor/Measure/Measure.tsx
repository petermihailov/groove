import type { MouseEventHandler } from 'react';
import { memo, useCallback, useMemo } from 'react';

import { theme } from '../../../styles';
import { sizes } from '../../../styles/tokens';
import type { Instrument, Measure as MeasureType, InstrumentGroup } from '../../../types';
import { getGroupByInstrument, safeKeys } from '../../../utils';
import { Note } from '../Note';

import { useStyles } from './Measure.styles';

type MeasureProps = {
  measure: MeasureType;
  highlightIndex?: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export const Measure = memo(function Measure({
  measure,
  highlightIndex,
  ...delegated
}: MeasureProps) {
  const classes = useStyles();

  const concertedByGroups = useMemo(() => {
    return safeKeys(measure.instruments).reduce<
      Partial<Record<InstrumentGroup, (Instrument | undefined)[]>>
    >((res, key) => {
      const groupName = getGroupByInstrument(key);
      const group = res[groupName] || [];
      const notes = (measure.instruments[key] || []).map((hasNote) => (hasNote ? key : undefined));

      notes.forEach((instrument, rhythmIndex) => {
        group[rhythmIndex] = instrument;
      });

      res[groupName] = group;
      return res;
    }, {});
  }, [measure]);

  const renderNotesByGroup = useCallback(
    (group: InstrumentGroup) => {
      const renderGroup = [];

      for (let idx = 0; idx < measure.length; idx++) {
        const instruments = concertedByGroups[group] || [];
        renderGroup.push(
          <Note key={idx} index={idx} instrument={instruments[idx] || null} group={group} />
        );
      }

      return renderGroup;

      // // if (enabledGroups[group]) {
      // return groups[group]?.map((instrument, idx) => {
      //   // let style;
      //
      //   // if (instrument === 'hhFootRegular') {
      //   //   const enabledGroupsCount = Object.values(enabledGroups).filter(Boolean).length;
      //   //   style = {
      //   //     transform: `translateY(calc(${sizes.sizeNote} * ${enabledGroupsCount} + 0.5rem))`,
      //   //   };
      //   // }
      //
      //   return <Note key={idx} index={idx} instrument={instrument} group={group} />;
      // });
      // // }
      // // return null;
    },
    [concertedByGroups, measure.length]
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
});
