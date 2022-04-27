import { memo, useCallback, useEffect, useState } from 'react';

import {
  addBarAction,
  setNoteAction,
  setTempoAction,
  useGrooveContext,
} from '../../context/GrooveContext';
import { usePlayer, useQuerySync } from '../../hooks';
import type { InstrumentGroupEnabled, Note } from '../../types';
import { Controls } from '../Controls';
import { Drawer } from '../Drawer';
import { Editor } from '../Editor';
import { Settings } from '../Settings';

import { useStyles } from './App.styles';

export const App = memo(function App() {
  const classes = useStyles();

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
    [dispatch]
  );

  const addBar = useCallback(
    (barIndex: number) => {
      dispatch(addBarAction(barIndex));
    },
    [dispatch]
  );

  const setNote = useCallback(
    (note: Note) => {
      dispatch(setNoteAction(note));
    },
    [dispatch]
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
});
