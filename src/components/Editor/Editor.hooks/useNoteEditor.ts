import { useCallback, useEffect, useRef, useState } from 'react';

import { groupsWithPicker } from '../../../constants';
import type { MouseEventHandler } from '../../../types/helpers';
import type { Note } from '../../../types/instrument';
import { defaultGroupNoteMap } from '../../../utils/maps';
import { getNoteFromDataset } from '../Editor.utils';

const dismissTimeout = 10_000;

export function useNoteEditor(setNote: (note: Note) => void) {
  const defaults = useRef(defaultGroupNoteMap);
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
          if (!note.value) {
            note.instrument = defaults.current[note.group];
          }

          note.value = !note.value;

          setNote(note);

          if (note.value && groupsWithPicker.includes(note.group)) {
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
      defaults.current[note.group] = note.instrument;
      setNote(note);
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
