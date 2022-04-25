import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';

import type { InstrumentGroup, MouseEventHandler, Note as NoteType } from '../../../types';
import {
  getGroupByInstrument,
  getInstrumentsByGroup,
  isInstrument,
  isInstrumentGroup,
} from '../../../utils';
import { Note } from '../Note';
import { getDataFromNoteElement } from '../Note/Note.utils';

import { useStyles } from './Picker.styles';

type PickerProps = {
  className?: string;
  note: NoteType | null;
  onChange: (note: NoteType) => void;
};

export const Picker = memo(function Picker({ className, note, onChange }: PickerProps) {
  const classes = useStyles();
  const [cachedGroup, cacheGroup] = useState<InstrumentGroup | null>(null);

  const handleChange: MouseEventHandler<HTMLButtonElement> = (e) => {
    const { group, instrument } = getDataFromNoteElement(e.currentTarget);
    if (note && isInstrumentGroup(group) && isInstrument(instrument)) {
      onChange({ ...note, group, instrument });
    }
  };

  useEffect(() => {
    if (note?.instrument) {
      cacheGroup(getGroupByInstrument(note.instrument));
    }
  }, [note?.instrument]);

  return (
    <div className={clsx(className, classes.root)}>
      <div className={classes.content}>
        {note &&
          cachedGroup !== null &&
          getInstrumentsByGroup(cachedGroup).map((instrument) => (
            <Note
              key={instrument}
              className={clsx({ [classes.selected]: instrument === note.instrument })}
              group={cachedGroup}
              index={note.rhythmIndex}
              instrument={instrument}
              onClick={handleChange}
            />
          ))}
      </div>
    </div>
  );
});
