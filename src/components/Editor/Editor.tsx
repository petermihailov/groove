import clsx from 'clsx';
import type { CSSProperties } from 'react';
import { memo, useRef, useState } from 'react';

import { Bar } from './Bar';
import { BarActions } from './BarActions';
import { Controls } from './Controls';
import { useNoteEditor } from './Editor.hooks';
import { Groups } from './Groups';
import { Picker } from './Picker';
import { sizeIconDefault } from '../../constants';
import { useClickOutside } from '../../hooks';
import type {
  Bar as BarType,
  Beat,
  Group,
  Note,
  TimeDivision,
  TimeSignature,
} from '../../types/instrument';

import classes from './Editor.module.css';

export interface EditorProps {
  className?: string;
  bars: BarType[];
  beat: Beat;
  muted: Group[];
  muteGroup: (group: Group) => void;
  unmuteGroup: (group: Group) => void;
  canUndo: boolean;
  canRedo: boolean;
  enabledGroups: Group[];
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
  onUndo: () => void;
  onRedo: () => void;
  playing: boolean;
}

export const Editor = ({
  bars,
  beat,
  canRedo,
  canUndo,
  className,
  enabledGroups,
  playing,
  muted,
  muteGroup,
  unmuteGroup,
  onAddBar,
  onChangeSignature,
  onClearBar,
  onRedo,
  onRemoveBar,
  onSetNote,
  onUndo,
}: EditorProps) => {
  const [uiScaleValue, setUiScaleValue] = useState(1);
  const sizeNote = Math.round(uiScaleValue * sizeIconDefault);

  const rootRef = useRef<HTMLDivElement>(null);
  const { blurNote, changeNote, focusedNote, toggleNote } = useNoteEditor(onSetNote);

  useClickOutside(rootRef, blurNote);

  return (
    <div ref={rootRef} className={clsx(className, classes.root)}>
      <Controls
        canRedo={canRedo}
        canUndo={canUndo}
        setEditorScaleValue={setUiScaleValue}
        onRedo={onRedo}
        onUndo={onUndo}
      />

      <div className={classes.editor} style={{ '--size-note': `${sizeNote}px` } as CSSProperties}>
        <div className={classes.stickyWrapper}>
          <div className={classes.outOfTheFlowWrapper}>
            <div className={classes.groups}>
              {bars.map((_, idx) => (
                <Groups
                  key={idx}
                  enabledGroups={enabledGroups}
                  muteGroup={muteGroup}
                  muted={muted}
                  sizeNote={sizeNote}
                  unmuteGroup={unmuteGroup}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={classes.bars}>
          {bars.map((bar, idx) => (
            <div key={idx} className={classes.bar} data-bar={idx}>
              <Bar
                key={idx}
                bar={bar}
                barIndex={idx}
                enabledGroups={enabledGroups}
                focusedNote={focusedNote}
                muted={muted}
                playing={playing && beat.barIndex === idx}
                sizeNote={sizeNote}
                tracking={
                  beat.instruments.length > 0 && beat.barIndex === idx ? beat.rhythmIndex : null
                }
                onClick={toggleNote}
              />
              <BarActions
                bar={bar}
                barIndex={idx}
                onAddBar={onAddBar}
                onChangeSignature={onChangeSignature}
                onClearBar={onClearBar}
                onRemoveBar={onRemoveBar}
              />
            </div>
          ))}
        </div>
      </div>

      <Picker note={focusedNote} onChange={changeNote} />
    </div>
  );
};

export default memo(Editor);
