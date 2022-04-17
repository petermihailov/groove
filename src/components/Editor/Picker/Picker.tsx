import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';

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

export const Picker = memo(function Picker({
  className,
  instrument,
  measureIndex,
  rhythmIndex,
  onChange,
}: PickerProps) {
  const classes = useStyles();
  const [cachedGroup, cacheGroup] = useState<InstrumentGroup>(null);

  const handleChange: MouseEventHandler<HTMLButtonElement> = (e) => {
    const { group, instrument } = getDataFromNoteElement(e.currentTarget);
    if (isInstrumentGroup(group) && isInstrument(instrument)) {
      onChange(measureIndex, rhythmIndex, group, instrument);
    }
  };

  useEffect(() => {
    if (instrument) {
      cacheGroup(getGroupByInstrument(instrument));
    }
  }, [instrument]);

  return (
    <div className={clsx(className, classes.root)}>
      <div className={classes.content}>
        {Boolean(cachedGroup) &&
          instruments
            .filter((instrument) => instrument.startsWith(cachedGroup))
            .map((ins) => (
              <Note
                key={ins}
                className={clsx({ [classes.selected]: ins === instrument })}
                group={cachedGroup}
                index={rhythmIndex}
                instrument={ins}
                onClick={handleChange}
              />
            ))}
      </div>
    </div>
  );
});
