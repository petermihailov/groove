import clsx from 'clsx';
import { memo } from 'react';

import type { TimeDivision, TimeSignature as TimeSignatureType } from '../../../types';
import { Icon } from '../../Icon';
import { Select } from '../../Select';

import classes from './TimeSignature.module.css';

export interface TimeSignatureProps extends TimeSignatureType {
  className?: string;
  barIndex: number;
  timeDivision: TimeDivision;
  onChangeSignature: (
    signature: TimeSignatureType & {
      barIndex: number;
      timeDivision: TimeDivision;
    },
  ) => void;
}

const timeDivisionOptions: TimeDivision[] = [4, 8, 16, 32];
const beatsPerBarOptions: TimeSignatureType['beatsPerBar'][] = Array.from({ length: 14 }).map(
  (_, idx) => idx + 2,
); // top 2..14
const noteValueOptions: TimeSignatureType['noteValue'][] = [4, 8, 16]; // bottom 4 , 8, 16

const TimeSignature = ({
  className,
  barIndex,
  beatsPerBar,
  noteValue,
  onChangeSignature,
  timeDivision,
}: TimeSignatureProps) => {
  const changeSignature = (
    patch: Partial<TimeSignatureType & { barIndex: number; timeDivision: TimeDivision }>,
  ) => {
    onChangeSignature({
      barIndex,
      beatsPerBar,
      timeDivision,
      noteValue,
      ...patch,
    });
  };

  const changeTimeDivision = (timeDivision: TimeDivision) => {
    changeSignature({ timeDivision });
  };

  const changeBeatsPerBar = (beatsPerBar: TimeSignatureType['beatsPerBar']) => {
    changeSignature({ beatsPerBar });
  };

  const changeNoteValue = (noteValue: TimeSignatureType['noteValue']) => {
    changeSignature({ noteValue });
  };

  return (
    <div className={clsx(className, classes.root)}>
      <Select
        options={timeDivisionOptions.map((option) => ({
          value: option,
          label: `${option}th`,
          customLabel: <Icon name={`icon.note.duration.${option}`} />,
        }))}
        value={timeDivision}
        onChange={changeTimeDivision}
      />

      <Select
        options={beatsPerBarOptions.map((option) => ({
          value: option,
          label: option,
        }))}
        value={beatsPerBar}
        onChange={changeBeatsPerBar}
      />

      <span>/</span>

      <Select
        options={noteValueOptions.map((option) => ({
          value: option,
          label: option,
        }))}
        value={noteValue}
        onChange={changeNoteValue}
      />
    </div>
  );
};

export default memo(TimeSignature);
