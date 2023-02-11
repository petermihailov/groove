import { memo, useCallback, useEffect, useState } from 'react';

import {
  addBarAction,
  clearBarAction,
  removeBarAction,
  setNoteAction,
  setSignatureAction,
  setTempoAction,
  useGrooveContext,
} from '../../context/GrooveContext';
import { usePlayer, useQuerySync } from '../../hooks';
import type { InstrumentGroupEnabled, Note, TimeSignature, TimeDivision } from '../../types';
import { Controls } from '../Controls';
import { Drawer } from '../Drawer';
import { Editor } from '../Editor';
import { Settings } from '../Settings';

import classes from './App.css';

const App = () => {
  const { groove, dispatch } = useGrooveContext();
  const { beat, play, playing, stop } = usePlayer(groove);

  const [metronome, setMetronome] = useState(false);
  const [settings, setSettings] = useState(false);
  const [enabledGroups, setEnabledGroups] = useState<InstrumentGroupEnabled>({});

  const togglePlaying = () => (playing ? stop() : play());
  const toggleMetronome = () => setMetronome((prev) => !prev);
  const openSettings = () => setSettings(true);
  const closeSettings = () => setSettings(false);

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

  useQuerySync();

  useEffect(() => {
    setEnabledGroups(groove.groups);
  }, [groove.groups]);

  return (
    <>
      <Editor
        bars={groove.bars}
        beat={beat}
        enabledGroups={enabledGroups}
        playing={playing}
        onAddBar={addBar}
        onChangeSignature={setSignature}
        onClearBar={clearBar}
        onRemoveBar={removeBar}
        onSetNote={setNote}
      />

      <div className={classes.controlsWrapper}>
        <Controls
          className={classes.controls}
          groove={groove}
          metronomeEnabled={metronome}
          playing={playing}
          settingsOpened={settings}
          onOpenSettings={openSettings}
          onSetTempo={setTempo}
          onToggleMetronome={toggleMetronome}
          onTogglePlaying={togglePlaying}
        />
      </div>

      <Drawer open={settings} onClose={closeSettings}>
        <Settings enabledGroups={enabledGroups} setEnabledGroups={setEnabledGroups} />
      </Drawer>
    </>
  );
};

export default memo(App);
