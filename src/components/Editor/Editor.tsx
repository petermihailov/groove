import clsx from 'clsx';
import { memo, useRef } from 'react';

import { useClickOutside } from '../../hooks';
import type { Bar as BarType, Beat, InstrumentGroupEnabled, Note } from '../../types';
import { Bar } from './Bar';
import { useHighlightStyles, useNoteEditor } from './Editor.hooks';
import { Groups } from './Groups';
import { Picker } from './Picker';

import { useStyles } from './Editor.styles';

type EditorProps = {
  bars: BarType[];
  beat: Beat;
  enabledGroups: InstrumentGroupEnabled;
  onAddBar: (barIndex: number) => void;
  onSetNote: (note: Note) => void;
  playing: boolean;
};

export const Editor = memo(function Editor({
  beat,
  bars,
  enabledGroups,
  onAddBar,
  onSetNote,
}: EditorProps) {
  const classes = useStyles();

  const editorRef = useRef<HTMLDivElement>(null);
  const highlightBeatStyles = useHighlightStyles(beat);
  const { blurNote, changeNote, focusedNote, toggleNote } = useNoteEditor(onSetNote);

  useClickOutside(editorRef, blurNote);

  return (
    <div ref={editorRef} className={classes.root}>
      <Groups className={clsx(classes.item, classes.groups)} enabledGroups={enabledGroups} />

      {bars.map((bar, idx) => (
        <Bar
          key={idx}
          bar={bar}
          barIndex={idx}
          className={classes.item}
          enabledGroups={enabledGroups}
          onAddBar={onAddBar}
          onClick={toggleNote}
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
});
