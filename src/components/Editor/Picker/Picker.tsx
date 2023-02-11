import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';

import type { MouseEventHandler, Note as NoteType } from '../../../types';
import { getInstrumentsByGroup, isInstrument, isInstrumentGroup } from '../../../utils';
import { Note } from '../Note';
import { getDataFromNoteElement } from '../Note/Note.utils';
import { Pill } from '../Pill';

import classes from './Picker.css';

export interface PickerProps {
  className?: string;
  note: NoteType | null;
  onChange: (note: NoteType) => void;
}

const Picker = ({ className, note, onChange }: PickerProps) => {
  const [cachedNote, setCachedNote] = useState<NoteType | null>(note);

  const handleChange: MouseEventHandler<HTMLButtonElement> = (e) => {
    const { group, instrument } = getDataFromNoteElement(e.currentTarget);
    if (note && isInstrumentGroup(group) && isInstrument(instrument)) {
      onChange({ ...note, group, instrument });
    }
  };

  useEffect(() => {
    if (note) {
      setCachedNote(note);
    }
  }, [note]);

  return (
    <Pill className={className}>
      {cachedNote &&
        getInstrumentsByGroup(cachedNote.group).map((instrument) => (
          <Note
            key={instrument}
            className={clsx({
              [classes.selected]: instrument === cachedNote.instrument,
              [classes.iconCenter]: cachedNote.group === 'cy' || cachedNote.group === 'hh',
              [classes.iconHhFoot]: instrument === 'hhFootRegular',
            })}
            group={cachedNote.group}
            icon={instrument === 'hhFootRegular' ? 'group-hh-foot' : undefined}
            index={cachedNote.rhythmIndex}
            instrument={instrument}
            onClick={handleChange}
          />
        ))}
    </Pill>
  );
};

export default memo(Picker);
