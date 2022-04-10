import { useState } from 'react';

import { Icon } from '../../icons/Icon';
import { ButtonIcon } from '../ButtonIcon';
import { Drawer } from '../Drawer';
import { Editor } from '../Editor';
import { Range } from '../Range';
import { Settings } from '../Settings';
import { ThemeSwitcher } from '../ThemeSwitcher';

import { useStyles } from './App.styles';

export function App() {
  const classes = useStyles();

  const [metronome, setMetronome] = useState(false);

  const [bpm, setBpm] = useState(80);

  const [settings, setSettings] = useState(false);

  const toggleMetronome = () => setMetronome((prev) => !prev);
  const openSettings = () => setSettings(true);
  const closeSettings = () => setSettings(false);

  return (
    <>
      <ThemeSwitcher />

      <ButtonIcon
        active={metronome}
        aria-label={`metronome ${metronome ? 'enabled' : 'disabled'}`}
        onClick={toggleMetronome}
      >
        <Icon name="metronome" />
      </ButtonIcon>

      <ButtonIcon active={settings} aria-label="open settings" onClick={openSettings}>
        <Icon name="settings" />
      </ButtonIcon>

      <Range label="BPM" min={20} max={240} value={bpm} onChange={setBpm} />

      <Editor />

      <Drawer open={settings} onClose={closeSettings}>
        <Settings />
      </Drawer>

      <pre>
        {`bpm: ${bpm}\n`}
        {`metronome: ${String(metronome)}`}
      </pre>
    </>
  );
}
