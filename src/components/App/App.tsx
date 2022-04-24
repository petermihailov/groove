import { memo, useCallback, useEffect, useState } from 'react';

import { usePlayer, useQuerySync } from '../../hooks';
import { Icon } from '../../icons/Icon';
import type { Groove, Measure } from '../../types';
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

  const [metronome, setMetronome] = useState(false);
  const [settings, setSettings] = useState(false);
  const [groove, setGroove] = useState<Groove>({
    tempo: 80,
    measures: [],
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

  const setMeasures = useCallback((measures: Measure[]) => {
    setGroove((prev) => ({ ...prev, measures }));
  }, []);

  // initialize
  useEffect(() => {
    setGroove(getGrooveFromQuery());
  }, [getGrooveFromQuery]);

  return (
    <>
      <Editor playing={playing} beat={beat} measures={groove.measures} setMeasures={setMeasures} />

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
        <Settings />
      </Drawer>

      <pre>
        {`tempo: ${groove.tempo}\n`}
        {`metronome: ${String(metronome)}\n`}
      </pre>
    </>
  );
});
