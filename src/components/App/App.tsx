import clsx from 'clsx';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

import {
  addBarAction,
  clearBarAction,
  redoAction,
  removeBarAction,
  setNoteAction,
  setSignatureAction,
  setEnabledGroupAction,
  setTempoAction,
  undoAction,
  useGrooveContext,
} from '../../context/GrooveContext';
import { useLoadingDelay, usePlayer, useQuerySync } from '../../hooks';
import type { Note, TimeSignature, TimeDivision, Group } from '../../types/instrument';
import checkBrowser from '../../utils/checkBrowser';
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

  const {
    loading,
    beat,
    play,
    playing,
    stop,
    metronome,
    muted,
    muteGroup,
    unmuteGroup,
    playMetronome,
    playingMetronome,
    stopMetronome,
    setMetronome,
  } = usePlayer(groove);

  const showLoader = useLoadingDelay(loading);

  const settings = useRef<DialogHandlers>(null);

  const [isBadBrowser, setIsBadBrowser] = useState(false);

  const togglePlaying = () => (playing ? stop() : play());
  const toggleMetronome = () => {
    if (playingMetronome) {
      stopMetronome();
    } else {
      playMetronome();
    }
  };

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

  const setEnabledGroup = useCallback(
    (group: Group, enabled: boolean) => {
      dispatch(setEnabledGroupAction({ group, enabled }));
    },
    [dispatch],
  );

  const undo = useCallback(() => {
    dispatch(undoAction());
  }, [dispatch]);

  const redo = useCallback(() => {
    dispatch(redoAction());
  }, [dispatch]);

  // Initialize

  useEffect(() => {
    setIsBadBrowser(!checkBrowser.test(navigator.userAgent));
  }, []);

  useQuerySync();

  // Render

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
        enabledGroups={groove.groups}
        muteGroup={muteGroup}
        muted={muted}
        playing={playing}
        unmuteGroup={unmuteGroup}
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
        metronomeEnabled={playingMetronome}
        playing={playing}
        onOpenSettings={openSettings}
        onSetTempo={setTempo}
        onToggleMetronome={toggleMetronome}
        onTogglePlaying={togglePlaying}
      />

      <Dialog ref={settings} mode="mega" onClose={closeSettings}>
        <Settings
          grooveGroups={groove.groups}
          metronomeDivision={metronome}
          setGrooveGroup={setEnabledGroup}
          setMetronomeDivision={setMetronome}
        />
      </Dialog>
    </div>
  );
};

export default memo(App);
