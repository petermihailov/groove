import clsx from 'clsx';
import { memo } from 'react';

import { Icon } from '../../../icons/Icon';
import type { TimeDivision, TimeSignature as TimeSignatureType } from '../../../types';
import { Select } from '../../Select';

import { useStyles } from './TimeSignature.styles';

type TimeSignatureProps = TimeSignatureType & {
  className?: string;
  division: TimeDivision;
};

const divisionOptions: TimeDivision[] = [4, 8, 16, 32];
const beatsPerBarOptions: TimeSignatureType['beatsPerBar'][] = Array.from({ length: 14 }).map(
  (_, idx) => idx + 2
); // top 2..14
const noteValueOptions: TimeSignatureType['noteValue'][] = [4, 8, 16]; // bottom 4 , 8, 16

export const TimeSignature = memo(function TimeSignature({
  className,
  beatsPerBar,
  division,
  noteValue,
}: TimeSignatureProps) {
  const classes = useStyles();

  return (
    <div className={clsx(className, classes.root)}>
      <Select
        options={divisionOptions.map((option) => ({
          value: option,
          label: `${option}th`,
          customLabel: <Icon name={`note-duration-${option}`} />,
        }))}
        value={division}
      />

      <Select
        options={beatsPerBarOptions.map((option) => ({
          value: option,
          label: option,
        }))}
        value={beatsPerBar}
      />

      <span>/</span>

      <Select
        options={noteValueOptions.map((option) => ({
          value: option,
          label: option,
        }))}
        value={noteValue}
      />
    </div>
  );
});
