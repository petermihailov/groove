import { memo, useCallback, useEffect, useState } from 'react';

import { setNoteAction, setTempoAction, useGrooveContext } from '../../context/GrooveContext';
import { usePlayer, useQuerySync } from '../../hooks';
import { Icon } from '../../icons/Icon';
import type { InstrumentGroupEnabled, Note } from '../../types';
import { ButtonIcon } from '../ButtonIcon';
import { ButtonPlay } from '../ButtonPlay';
import { Drawer } from '../Drawer';
import { Editor } from '../Editor';
import { Range } from '../Range';
import { Settings } from '../Settings';
import { ThemeSwitcher } from '../ThemeSwitcher';

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
        setNote={setNote}
      />

      <div className={classes.controls}>
        <ButtonPlay active playing={playing} onClick={togglePlaying} />
        <ButtonIcon
          active={metronome}
          aria-label={`metronome ${metronome ? 'enabled' : 'disabled'}`}
          onClick={toggleMetronome}
        >
          <Icon name="ui-metronome" />
        </ButtonIcon>

        <Range
          className={classes.bpm}
          label="BPM"
          max={240}
          min={20}
          value={groove.tempo}
          onChange={setTempo}
        />

        <ButtonIcon active={settings} aria-label="open settings" onClick={openSettings}>
          <Icon name="ui-settings" />
        </ButtonIcon>
        <ThemeSwitcher />
      </div>

      <Drawer open={settings} onClose={closeSettings}>
        <Settings enabledGroups={enabledGroups} setEnabledGroups={setEnabledGroups} />
      </Drawer>
    </>
  );
});
