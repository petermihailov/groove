import { memo } from 'react';

import { theme } from '../../../styles';
import type { InstrumentGroup, BarLine as BarLineType, Instrument } from '../../../types';
import { Note } from '../Note';

type BarLineProps = {
  group: InstrumentGroup;
  hhFootOffsetGroups?: number;
  line: BarLineType;
};

export const BarLine = memo(function BarLine({ group, hhFootOffsetGroups, line }: BarLineProps) {
  const getStyles = (instrument: Instrument | null) =>
    hhFootOffsetGroups != null && instrument === 'hhFootRegular'
      ? {
          transform: `translateY(calc(${theme.sizeNote} * ${hhFootOffsetGroups} + ${theme.spacingNote} * ${hhFootOffsetGroups})) rotate(180deg)`,
        }
      : undefined;

  return (
    <>
      {line.map((instrument, idx) => (
        <Note
          key={idx}
          group={group}
          index={idx}
          instrument={instrument}
          style={getStyles(instrument)}
        />
      ))}
    </>
  );
});
