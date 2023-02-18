import clsx from 'clsx';
import { memo, useEffect, useState } from 'react';

import type { MouseEventHandler } from '../../../types/helpers';
import type { Note as NoteType } from '../../../types/instrument';
import { getInstrumentsByGroup } from '../../../utils/groove';
import { getNoteFromDataset } from '../Editor.utils';
import { Note } from '../Note';

import classes from './Picker.module.css';

export interface PickerProps {
  className?: string;
  note: NoteType | null;
  onChange: (note: NoteType) => void;
}

const Picker = ({ className, note: noteProp, onChange }: PickerProps) => {
  const [note, setNote] = useState<NoteType | null>(null);
  const instruments = note ? getInstrumentsByGroup(note.group) : [];
  const isOpen = noteProp && instruments.length > 1;

  const handleChange: MouseEventHandler<SVGSVGElement> = (e) => {
    const noteFromDataset = getNoteFromDataset(e.currentTarget);
    if (note && noteFromDataset) {
      const { group, instrument } = noteFromDataset;
      onChange({ ...note, group, instrument });
    }
  };

  useEffect(() => {
    if (noteProp) setNote(noteProp);
  }, [noteProp]);

  return (
    <div className={clsx(className, classes.root, { [classes.open]: isOpen })}>
      <div className={classes.picker}>
        {note &&
          instruments.map((instrument) => (
            <Note
              key={instrument}
              // className={clsx({
              //   [classes.selected]: instrument === note.instrument,
              //   [classes.iconCenter]: note.group === 'cy' || note.group === 'hh',
              //   [classes.iconHhFoot]: instrument === 'hhFootRegular',
              // })}
              group={note.group}
              icon={instrument === 'hhFootRegular' ? 'icon.group.hh-foot' : undefined}
              index={note.rhythmIndex}
              instrument={instrument}
              // onClick={handleChange}
            />
          ))}
      </div>

      {/*{cachedNote &&*/}
      {/*  getInstrumentsByGroup(cachedNote.group).map((instrument) => (*/}
      {/*    <Note*/}
      {/*      key={instrument}*/}
      {/*      className={clsx({*/}
      {/*        [classes.selected]: instrument === cachedNote.instrument,*/}
      {/*        [classes.iconCenter]: cachedNote.group === 'cy' || cachedNote.group === 'hh',*/}
      {/*        [classes.iconHhFoot]: instrument === 'hhFootRegular',*/}
      {/*      })}*/}
      {/*      group={cachedNote.group}*/}
      {/*      icon={instrument === 'hhFootRegular' ? 'icon.group.hh-foot' : undefined}*/}
      {/*      index={cachedNote.rhythmIndex}*/}
      {/*      instrument={instrument}*/}
      {/*      // onClick={handleChange}*/}
      {/*    />*/}
      {/*  ))}*/}
    </div>
  );
};

export default memo(Picker);
