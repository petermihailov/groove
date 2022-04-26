import { memo } from 'react';

import type { InstrumentGroup, BarLine as BarLineType } from '../../../types';
import { Note } from '../Note';

type BarLineProps = {
  line: BarLineType;
  group: InstrumentGroup;
};

export const BarLine = memo(function BarLine({ line, group }: BarLineProps) {
  // Object.values(enabledGroups).filter(Boolean).length - Number(enabledGroups.cy);
  // transform: `translateY(calc(${sizes.sizeNote} * ${offsetGroups} + ${spacing.spacingNote} * ${offsetGroups})) rotate(180deg)`,

  return (
    <>
      {line.map((instrument, idx) => (
        <Note key={idx} group={group} index={idx} instrument={instrument} />
      ))}
    </>
  );
});
