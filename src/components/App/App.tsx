import clsx from 'clsx';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

import {
  addBarAction,
  clearBarAction,
  redoAction,
  removeBarAction,
  setNoteAction,
  setSignatureAction,
  setTempoAction,
  undoAction,
  useGrooveContext,
} from '../../context/GrooveContext';
import { usePlayer, useQuerySync } from '../../hooks';
import type {
  InstrumentGroupEnabled,
  Note,
  TimeSignature,
  TimeDivision,
} from '../../types/instrument';
import { enabledGroupsDefault } from '../../utils/groove';
import { Controls } from '../Controls';
import type { DialogHandlers } from '../Dialog';
import { Dialog } from '../Dialog';
import { Editor } from '../Editor';
import { Settings } from '../Settings';

import classes from './App.module.css';

const App = () => {
  const { groove, dispatch } = useGrooveContext();
  const { beat, play, playing, stop } = usePlayer(groove);

  const settings = useRef<DialogHandlers>(null);

  const [metronome, setMetronome] = useState(false);
  const [enabledGroups, setEnabledGroups] = useState<InstrumentGroupEnabled>(enabledGroupsDefault);

  const togglePlaying = () => (playing ? stop() : play());
  const toggleMetronome = () => setMetronome((prev) => !prev);
  const openSettings = () => settings.current?.showModal();
  const closeSettings = () => settings.current?.close();

  const setTempo = useCallback(
    (tempo: number) => {
      dispatch(setTempoAction(tempo));
    },
    [dispatch],
  );

  const addBar = useCallback(
    (barIndex: number) => {
      dispatch(addBarAction(barIndex));
    },
    [dispatch],
  );

  const clearBar = useCallback(
    (barIndex: number) => {
      dispatch(clearBarAction(barIndex));
    },
    [dispatch],
  );

  const removeBar = useCallback(
    (barIndex: number) => {
      dispatch(removeBarAction(barIndex));
      stop();
    },
    [dispatch, stop],
  );

  const setNote = useCallback(
    (note: Note) => {
      dispatch(setNoteAction(note));
    },
    [dispatch],
  );

  const setSignature = useCallback(
    (
      signature: TimeSignature & {
        barIndex: number;
        timeDivision: TimeDivision;
      },
    ) => {
      dispatch(setSignatureAction(signature));
      stop();
    },
    [dispatch, stop],
  );

  const undo = useCallback(() => {
    dispatch(undoAction());
  }, [dispatch]);

  const redo = useCallback(() => {
    dispatch(redoAction());
  }, [dispatch]);

  useQuerySync();

  useEffect(() => {
    setEnabledGroups(groove.groups);
  }, [groove.groups]);

  return (
    <div className={classes.root}>
      <Editor
        bars={groove.bars}
        beat={beat}
        canRedo={groove.canRedo}
        canUndo={groove.canUndo}
        enabledGroups={enabledGroups}
        playing={playing}
        onAddBar={addBar}
        onChangeSignature={setSignature}
        onClearBar={clearBar}
        onRedo={redo}
        onRemoveBar={removeBar}
        onSetNote={setNote}
        onUndo={undo}
      />

      <h1 className={clsx(classes.title, 'disableScroll')}>
        <span>{groove.title}</span>
      </h1>

      <Controls
        groove={groove}
        metronomeEnabled={metronome}
        playing={playing}
        onOpenSettings={openSettings}
        onSetTempo={setTempo}
        onToggleMetronome={toggleMetronome}
        onTogglePlaying={togglePlaying}
      />

      <Dialog ref={settings} mode="mega" onClose={closeSettings}>
        <Settings enabledGroups={enabledGroups} setEnabledGroups={setEnabledGroups} />
      </Dialog>
    </div>
  );
};

export default memo(App);
