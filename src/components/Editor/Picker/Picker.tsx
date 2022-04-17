import clsx from 'clsx';

import { instruments } from '../../../constants';
import type { Instrument, InstrumentGroup, MouseEventHandler } from '../../../types';
import { getGroupByInstrument, isInstrument, isInstrumentGroup } from '../../../utils';
import { Note } from '../Note';
import { getDataFromNoteElement } from '../Note/Note.utils';

import { useStyles } from './Picker.styles';

type PickerProps = {
  className?: string;
  instrument: Instrument;
  measureIndex: number | null;
  rhythmIndex: number | null;
  onChange: (
    measureIndex: number,
    rhythmIndex: number,
    group: InstrumentGroup,
    instrument: Instrument
  ) => void;
};

export const Picker = function Picker({
  className,
  instrument,
  measureIndex,
  rhythmIndex,
  onChange,
}: PickerProps) {
  const classes = useStyles();

  let group: InstrumentGroup;
  if (instrument) {
    group = getGroupByInstrument(instrument);
  }

  const handleChange: MouseEventHandler<HTMLButtonElement> = (e) => {
    const { group, instrument } = getDataFromNoteElement(e.currentTarget);
    if (isInstrumentGroup(group) && isInstrument(instrument)) {
      onChange(measureIndex, rhythmIndex, group, instrument);
    }
  };

  return (
    <div className={clsx(className, classes.root)}>
      <div className={classes.content}>
        {Boolean(instrument) &&
          instruments
            .filter((instrument) => instrument.startsWith(group))
            .map((ins) => (
              <Note
                key={ins}
                className={clsx({ [classes.selected]: ins === instrument })}
                group={group}
                index={rhythmIndex}
                instrument={ins}
                onClick={handleChange}
              />
            ))}
      </div>
    </div>
  );
};
