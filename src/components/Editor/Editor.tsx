import clsx from 'clsx';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { useClickOutside } from '../../hooks';
import type {
  Beat,
  Bar as BarType,
  MouseEventHandler,
  InstrumentGroupEnabled,
  Note,
} from '../../types';
import { defaultGroupNoteMap, isInstrument, isInstrumentGroup } from '../../utils';
import { Bar } from './Bar';
import { Groups } from './Groups';
import { getDataFromNoteElement } from './Note/Note.utils';
import { Picker } from './Picker';

import { useStyles } from './Editor.styles';

type EditorProps = {
  beat: Beat;
  enabledGroups: InstrumentGroupEnabled;
  bars: BarType[];
  playing: boolean;
  setNote: (note: Note) => void;
};

export const Editor = memo(function Editor({
  beat,
  bars,
  playing,
  enabledGroups,
  setNote,
}: EditorProps) {
  const classes = useStyles();

  const editorRef = useRef<HTMLDivElement>(null);
  const highlightBeat = useRef(beat);

  useEffect(() => {
    if (beat.playNote) {
      highlightBeat.current = beat;
    }
    if (!playing) {
      highlightBeat.current = { barIndex: 0, rhythmIndex: 0, playNote: false };
    }
  }, [beat, playing]);

  const [defaults, setDefaults] = useState(defaultGroupNoteMap);
  const [focusedNote, setFocusedNote] = useState<Note | null>(null);

  // const editNote = useCallback(
  //   (barIndex: number, rhythmIndex: number, group: InstrumentGroup, instrument: Instrument) => {
  //     groove.editNote(barIndex, rhythmIndex, group, instrument);
  //     setFocusedNote({ barIndex, rhythmIndex, group, instrument });
  //     onUpdate();
  //     forceUpdate(); // update state
  //   },
  //   [forceUpdate, groove, onUpdate]
  // );

  const toggleNote: MouseEventHandler<HTMLDivElement> = useCallback(
    ({ currentTarget, target }) => {
      const barIndex = Number(currentTarget.dataset.index);
      const noteElement = target.closest('button');

      if (noteElement) {
        const { rhythmIndex, group, instrument } = getDataFromNoteElement(noteElement);

        if (isInstrumentGroup(group)) {
          const instrumentOrDefaults = isInstrument(instrument) ? instrument : defaults[group];
          const value = !instrument;

          const note: Note = {
            group,
            instrument: instrumentOrDefaults,
            barIndex,
            rhythmIndex,
            value,
          };

          setNote(note);
          // setFocusedNote(note);
        }
      }
    },
    [defaults, setNote]
  );

  const handlePickNote = useCallback((note: Note) => {
    console.log(note);
    // editNote(barIndex, rhythmIndex, group, instrument);
    // setDefaults((prev) => ({ ...prev, [group]: instrument }));
  }, []);

  useClickOutside(editorRef, () => {
    setFocusedNote(null);
  });

  return (
    <div ref={editorRef} className={classes.root}>
      <Groups className={clsx(classes.item, classes.groups)} enabledGroups={enabledGroups} />

      {bars.map((bar, idx) => (
        <Bar
          key={idx}
          bar={bar}
          className={classes.item}
          data-index={idx}
          enabledGroups={enabledGroups}
          highlightIndex={
            playing && highlightBeat.current.barIndex === idx
              ? highlightBeat.current.rhythmIndex
              : undefined
          }
          onClick={toggleNote}
        />
      ))}

      <Picker
        className={clsx(classes.picker, { [classes.pickerHidden]: !focusedNote?.instrument })}
        note={focusedNote}
        onChange={handlePickNote}
      />
    </div>
  );
});
