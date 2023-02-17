import { useCallback, useState } from 'react';

import type { MouseEventHandler } from '../../../types/helpers';
import type { Note } from '../../../types/instrument';
import { isInstrument, isInstrumentGroup } from '../../../utils/guards';
import { defaultGroupNoteMap } from '../../../utils/maps';
import { getDataFromNoteElement } from '../Note/Note.utils';

export function useNoteEditor(setNote: (note: Note) => void) {
  const [defaults, setDefaults] = useState(defaultGroupNoteMap);
  const [focusedNote, setFocusedNote] = useState<Note | null>(null);

  const blurNote = useCallback(() => {
    setFocusedNote(null);
  }, []);

  const toggleNote: MouseEventHandler<SVGSVGElement> = useCallback(
    ({ target }) => {
      const noteElement = target.closest('rect');

      if (noteElement) {
        const { barIndex, rhythmIndex, group, instrument } = getDataFromNoteElement(noteElement);

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
