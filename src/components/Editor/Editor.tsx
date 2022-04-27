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
  beat: Beat;
  enabledGroups: InstrumentGroupEnabled;
  bars: BarType[];
  playing: boolean;
  setNote: (note: Note) => void;
};

export const Editor = memo(function Editor({ beat, bars, enabledGroups, setNote }: EditorProps) {
  const classes = useStyles();

  const editorRef = useRef<HTMLDivElement>(null);
  const highlightBeatStyles = useHighlightStyles(beat);
  const { blurNote, changeNote, focusedNote, toggleNote } = useNoteEditor(setNote);

  useClickOutside(editorRef, blurNote);

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
          onClick={toggleNote}
        />
      ))}

      <div className={classes.highlight} style={highlightBeatStyles} />

      <div className={clsx(classes.picker, { [classes.pickerHidden]: !focusedNote?.instrument })}>
        <Picker note={focusedNote} onChange={changeNote} />
      </div>
    </div>
  );
});
