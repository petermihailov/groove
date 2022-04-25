import { memo, useCallback, useEffect, useState } from 'react';

import { useGrooveContext } from '../../context/GrooveContext';
import { usePlayer, useQuerySync } from '../../hooks';
import { Icon } from '../../icons/Icon';
import type { Groove, InstrumentGroupEnabled, Note } from '../../types';
import { getGrooveGroups } from '../../utils';
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

  // const {groove, dispatch} = useGrooveContext()

  const [metronome, setMetronome] = useState(false);
  const [settings, setSettings] = useState(false);
  const [enabledGroups, setEnabledGroups] = useState<InstrumentGroupEnabled>({});
  const [groove, setGroove] = useState<Groove>({
    tempo: 80,
    bars: [],
  });

  const getGrooveFromQuery = useQuerySync(groove);
  const { beat, play, playing, stop } = usePlayer(groove);

  const togglePlaying = () => (playing ? stop() : play());
  const toggleMetronome = () => setMetronome((prev) => !prev);
  const openSettings = () => setSettings(true);
  const closeSettings = () => setSettings(false);

  const setTempo = useCallback((tempo: number) => {
    setGroove((prev) => ({ ...prev, tempo }));
  }, []);

  const setNote = useCallback((note: Note) => {
    setGroove((prev) => {
      const { value, instrument, barIndex, rhythmIndex } = note;
      const notes = prev.bars[barIndex].instruments[instrument] || [];

      console.log(note, notes[rhythmIndex]);

      if (Boolean(notes[rhythmIndex]) !== value) {
        const bars = [...prev.bars];
        bars[barIndex].instruments[instrument] = [...notes];
        (bars[barIndex].instruments[instrument] || [])[rhythmIndex] = value;

        return { ...prev, bars };
      }

      return prev;
    });
  }, []);

  // initialize
  useEffect(() => {
    const grooveFromQuery = getGrooveFromQuery();
    setEnabledGroups(getGrooveGroups(grooveFromQuery));
    setGroove(grooveFromQuery);
  }, [getGrooveFromQuery]);

  return (
    <>
      <Editor
        playing={playing}
        beat={beat}
        bars={groove.bars}
        setNote={setNote}
        enabledGroups={enabledGroups}
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
          min={20}
          max={240}
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
