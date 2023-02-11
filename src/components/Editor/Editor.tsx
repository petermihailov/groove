import clsx from 'clsx';
import { memo, useRef } from 'react';

import { Bar } from './Bar';
import { useHighlightStyles, useNoteEditor } from './Editor.hooks';
import { Groups } from './Groups';
import { Picker } from './Picker';
import { useClickOutside } from '../../hooks';
import type {
  Bar as BarType,
  Beat,
  InstrumentGroupEnabled,
  Note,
  TimeDivision,
  TimeSignature,
} from '../../types';

import classes from './Editor.css';

export interface EditorProps {
  bars: BarType[];
  beat: Beat;
  enabledGroups: InstrumentGroupEnabled;
  onAddBar: (barIndex: number) => void;
  onClearBar: (barIndex: number) => void;
  onRemoveBar: (barIndex: number) => void;
  onSetNote: (note: Note) => void;
  onChangeSignature: (
    signature: TimeSignature & {
      barIndex: number;
      timeDivision: TimeDivision;
    },
  ) => void;
  playing: boolean;
}

export const Editor = ({
  beat,
  bars,
  enabledGroups,
  onAddBar,
  onClearBar,
  onRemoveBar,
  onSetNote,
  onChangeSignature,
}: EditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const highlightBeatStyles = useHighlightStyles(beat, bars);
  const { blurNote, changeNote, focusedNote, toggleNote } = useNoteEditor(onSetNote);

  useClickOutside(editorRef, blurNote);

  return (
    <div ref={editorRef} className={classes.editor}>
      <div className={classes.groups}>
        <Groups enabledGroups={enabledGroups} />
      </div>

      {bars.map((bar, idx) => (
        <Bar
          key={idx}
          bar={bar}
          barIndex={idx}
          enabledGroups={enabledGroups}
          onAddBar={onAddBar}
          onChangeSignature={onChangeSignature}
          onClearBar={onClearBar}
          onClick={toggleNote}
          onRemoveBar={onRemoveBar}
        />
      ))}

      <div className={classes.highlight} style={highlightBeatStyles} />

      <div
        className={clsx(classes.pickerWrapper, {
          [classes.pickerHidden]: !focusedNote?.instrument,
        })}
      >
        <Picker className={classes.picker} note={focusedNote} onChange={changeNote} />
      </div>
    </div>
  );
};

export default memo(Editor);
