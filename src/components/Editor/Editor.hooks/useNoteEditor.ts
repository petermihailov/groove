import { useCallback, useState } from 'react';

import type { Note, MouseEventHandler } from '../../../types';
import { defaultGroupNoteMap, isInstrument, isInstrumentGroup } from '../../../utils';
import { getDataFromNoteElement } from '../Note/Note.utils';

export function useNoteEditor(setNote: (note: Note) => void) {
  const [defaults, setDefaults] = useState(defaultGroupNoteMap);
  const [focusedNote, setFocusedNote] = useState<Note | null>(null);

  const blurNote = useCallback(() => {
    setFocusedNote(null);
  }, []);

  const toggleNote: MouseEventHandler<HTMLDivElement> = useCallback(
    ({ currentTarget, target }) => {
      const barIndex = Number(currentTarget.dataset.index);
      const noteElement = target.closest('button');

      if (noteElement) {
        const { rhythmIndex, group, instrument } = getDataFromNoteElement(noteElement);

        if (isInstrumentGroup(group)) {
          const value = !instrument;
          const instrumentOrDefaults = isInstrument(instrument) ? instrument : defaults[group];

          const note: Note = {
            group,
            instrument: instrumentOrDefaults,
            barIndex,
            rhythmIndex,
            value,
          };

          setNote(note);

          if (value) {
            setFocusedNote(note);
          } else {
            setFocusedNote(null);
          }
        }
      }
    },
    [defaults, setNote],
  );

  const changeNote = useCallback(
    (note: Note) => {
      setNote(note);
      setDefaults((prev) => ({ ...prev, [note.group]: note.instrument }));
      setFocusedNote(null);
    },
    [setNote],
  );

  return {
    blurNote,
    changeNote,
    focusedNote,
    toggleNote,
  };
}
