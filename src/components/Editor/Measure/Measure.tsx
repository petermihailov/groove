import clsx from 'clsx';
import type { MouseEventHandler } from 'react';
import { memo, useCallback, useMemo } from 'react';

import { theme } from '../../../styles';
import { sizes, spacing } from '../../../styles/tokens';
import type {
  Instrument,
  Measure as MeasureType,
  InstrumentGroup,
  InstrumentGroupEnabled,
} from '../../../types';
import { getGroupByInstrument, safeKeys } from '../../../utils';
import { Note } from '../Note';

import { useStyles } from './Measure.styles';

type MeasureProps = {
  className?: string;
  enabledGroups: InstrumentGroupEnabled;
  measure: MeasureType;
  highlightIndex?: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export const Measure = memo(function Measure({
  className,
  enabledGroups,
  measure,
  highlightIndex,
  ...delegated
}: MeasureProps) {
  const classes = useStyles();

  const convertedByGroups = useMemo(() => {
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
      if (!enabledGroups[group]) {
        return null;
      }

      const renderGroup = [];

      for (let idx = 0; idx < measure.length; idx++) {
        const instruments = convertedByGroups[group] || [];
        const instrument = instruments[idx] || null;
        let footStyle;

        if (instrument === 'hhFootRegular') {
          const offsetGroups =
            Object.values(enabledGroups).filter(Boolean).length - Number(enabledGroups.cy);

          footStyle = {
            transform: `translateY(calc(${sizes.sizeNote} * ${offsetGroups} + ${spacing.spacingNote} * ${offsetGroups})) rotate(180deg)`,
          };
        }

        renderGroup.push(
          <Note key={idx} style={footStyle} index={idx} instrument={instrument} group={group} />
        );
      }

      return renderGroup;
    },
    [convertedByGroups, measure.length, enabledGroups]
  );

  return (
    <div
      className={clsx(className, classes.root)}
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
