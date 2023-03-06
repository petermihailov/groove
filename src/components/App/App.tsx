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
import { useLoadingDelay, usePlayer, useQuerySync } from '../../hooks';
import type {
  InstrumentGroupEnabled,
  Note,
  TimeSignature,
  TimeDivision,
} from '../../types/instrument';
import checkBrowser from '../../utils/checkBrowser';
import { enabledGroupsDefault } from '../../utils/groove';
import { BadBrowser } from '../BadBrowser';
import { Controls } from '../Controls';
import type { DialogHandlers } from '../Dialog';
import { Dialog } from '../Dialog';
import { Editor } from '../Editor';
import { Logo } from '../Logo';
import { Settings } from '../Settings';

import classes from './App.module.css';

const App = () => {
  const { groove, dispatch } = useGrooveContext();
  const { loading, beat, play, playing, stop } = usePlayer(groove);

  const showLoader = useLoadingDelay(loading);

  const settings = useRef<DialogHandlers>(null);

  const [isBadBrowser, setIsBadBrowser] = useState(false);
  const [metronome, setMetronome] = useState(false);
  const [enabledGroups, setEnabledGroups] = useState<InstrumentGroupEnabled>({
    ...enabledGroupsDefault,
  });

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

  useEffect(() => {
    setEnabledGroups(groove.groups);
  }, [groove.groups]);

  useEffect(() => {
    setIsBadBrowser(!checkBrowser.test(navigator.userAgent));
  }, []);

  useQuerySync();

  if (isBadBrowser) {
    return <BadBrowser />;
  }

  return (
    <div
      className={clsx(classes.root, classes.withOverlay, {
        [classes.loading]: showLoader,
      })}
    >
      <Logo className={classes.logo} />
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
