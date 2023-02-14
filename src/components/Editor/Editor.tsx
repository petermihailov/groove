import clsx from 'clsx';
import type { CSSProperties} from "react";
import { memo, useRef, useState } from "react";

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
import { Controls } from "./Controls";

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
  const [uiScaleValue, setUiScaleValue] = useState(1);

  const rootRef = useRef<HTMLDivElement>(null);
  // const highlightBeatStyles = useHighlightStyles(beat, bars);
  const { blurNote, changeNote, focusedNote, toggleNote } = useNoteEditor(onSetNote);

  useClickOutside(rootRef, blurNote);

  return (
    <div ref={rootRef} className={classes.root}>
      <Controls setEditorScaleValue={setUiScaleValue} />

      <div
        className={classes.editor}
        style={{'--size-note': `calc(${uiScaleValue} * 2rem)`} as CSSProperties}
      >
        {/*<div className={classes.groups}>*/}
        {/*  <Groups enabledGroups={enabledGroups} />*/}
        {/*</div>*/}

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

        {/*<div className={classes.highlight} style={highlightBeatStyles} />*/}
      </div>

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
