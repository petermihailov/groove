import { useCallback, useEffect, useState } from 'react';

import type { MouseEventHandler } from '../../../types/helpers';
import type { Note } from '../../../types/instrument';
// import { isInstrument, isInstrumentGroup } from '../../../utils/guards';
// import { defaultGroupNoteMap } from '../../../utils/maps';
import { getNoteFromDataset } from '../Editor.utils';

const dismissTimeout = 5000;

export function useNoteEditor(setNote: (note: Note) => void) {
  // const [defaults, setDefaults] = useState(defaultGroupNoteMap);
  const [focusedNote, setFocusedNote] = useState<Note | null>(null);

  const blurNote = useCallback(() => {
    setFocusedNote(null);
  }, []);

  const toggleNote: MouseEventHandler<SVGSVGElement> = useCallback(
    ({ target }) => {
      const noteElement = target.closest('rect');

      if (noteElement) {
        const note = getNoteFromDataset(noteElement);

        if (note) {
          note.value = !note.value;

          // const { barIndex, rhythmIndex, group, instrument, value } = note;
          // const instrumentOrDefaults = isInstrument(instrument) ? instrument : defaults[group];
          //
          // const note: Note = {
          //   group,
          //   instrument: instrumentOrDefaults,
          //   barIndex,
          //   rhythmIndex,
          //   value,
          // };

          setNote(note);

          if (note.value) {
            setFocusedNote(note);
          } else {
            setFocusedNote(null);
          }
        }
      }
    },
    [setNote],
  );

  const changeNote = useCallback(
    (note: Note) => {
      setNote(note);
      // setDefaults((prev) => ({ ...prev, [note.group]: note.instrument }));
      setFocusedNote(null);
    },
    [setNote],
  );

  useEffect(() => {
    let timer: number;

    if (focusedNote) {
      timer = window.setTimeout(blurNote, dismissTimeout);
    }

    return () => {
      window.clearTimeout(timer);
    };
  }, [blurNote, focusedNote]);

  return {
    blurNote,
    changeNote,
    focusedNote,
    toggleNote,
  };
}
