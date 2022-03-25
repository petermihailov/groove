import { useState } from 'react';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { Range } from '../Range';

import { useStyles } from './App.styles';
import { Drawer } from '../Drawer';
import { ButtonIcon } from '../ButtonIcon';
import { IconMetronome, IconSettings } from '../../icons';
import { Settings } from '../Settings';

export function App() {
  const classes = useStyles();
  
  const [metronome, setMetronome] = useState(false);

  const [bpm, setBpm] = useState(80);

  const [settings, setSettings] = useState(false);

  const toggleMetronome = () => setMetronome(prev => !prev);
  const openSettings = () => setSettings(true);
  const closeSettings = () => setSettings(false);

  return (
    <div>
      <ThemeSwitcher />
      
      <ButtonIcon active={metronome} aria-label={`metronome ${metronome ? 'enabled' : 'disabled'}`} onClick={toggleMetronome}>
        <IconMetronome />
      </ButtonIcon>

      <ButtonIcon active={settings} aria-label='open settings' onClick={openSettings}>
        <IconSettings />
      </ButtonIcon>

      <Range label="BPM" min={20} max={240} value={bpm} onChange={setBpm} />
 
      <Drawer open={settings} onClose={closeSettings}>
        <Settings />
      </Drawer>
      
      <pre>
        {`bpm: ${bpm}\n`}
        {`metronome: ${String(metronome)}`}
      </pre>
    </div>
  );
}
