import { memo } from 'react';

import type { InstrumentGroup, BarLine as BarLineType, Instrument } from '../../../types';
import { Note } from '../Note';

export interface BarLineProps {
  group: InstrumentGroup;
  hhFootOffsetGroups?: number;
  line: BarLineType;
}

const BarLine = ({ group, hhFootOffsetGroups, line }: BarLineProps) => {
  const getStyles = (instrument: Instrument | null) =>
    hhFootOffsetGroups != null && instrument === 'hhFootRegular'
      ? {
          transform: `translateY(calc(var(--size-note) * ${hhFootOffsetGroups} + var(--spacing-note) * ${hhFootOffsetGroups})) rotate(180deg)`,
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
};

export default memo(BarLine);
