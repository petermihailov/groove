import { useState } from 'react';

import { Icon } from '../../icons/Icon';
import { ButtonIcon } from '../ButtonIcon';
import { ButtonPlay } from '../ButtonPlay';
import { Drawer } from '../Drawer';
import { Editor } from '../Editor';
import { Range } from '../Range';
import { Settings } from '../Settings';
import { ThemeSwitcher } from '../ThemeSwitcher';

import { useStyles } from './App.styles';

export function App() {
  const classes = useStyles();

  const [playing, setPlaying] = useState(false);
  const [metronome, setMetronome] = useState(false);
  const [tempo, setTempo] = useState(80);
  const [settings, setSettings] = useState(false);

  const togglePlaying = () => setPlaying((prev) => !prev);
  const toggleMetronome = () => setMetronome((prev) => !prev);
  const openSettings = () => setSettings(true);
  const closeSettings = () => setSettings(false);

  return (
    <>
      <Editor playing={playing} tempo={tempo} />

      <div className={classes.controls}>
        <ButtonPlay active playing={playing} onClick={togglePlaying} />
        <ButtonIcon
          active={metronome}
          aria-label={`metronome ${metronome ? 'enabled' : 'disabled'}`}
          onClick={toggleMetronome}
        >
          <Icon name="metronome" />
        </ButtonIcon>

        <Range
          className={classes.bpm}
          label="BPM"
          min={20}
          max={240}
          value={tempo}
          onChange={setTempo}
        />

        <ButtonIcon active={settings} aria-label="open settings" onClick={openSettings}>
          <Icon name="settings" />
        </ButtonIcon>
        <ThemeSwitcher />
      </div>

      <Drawer open={settings} onClose={closeSettings}>
        <Settings />
      </Drawer>

      {/*<pre>*/}
      {/*  {`tempo: ${tempo}\n`}*/}
      {/*  {`metronome: ${String(metronome)}`}*/}
      {/*</pre>*/}
    </>
  );
}
