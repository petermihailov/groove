import { useState } from 'react';

import { Icon } from '../../icons/Icon';
import { Kit } from '../../lib/Kit';
import { Player } from '../../lib/Player';
import { ButtonIcon } from '../ButtonIcon';
import { ButtonPlay } from '../ButtonPlay';
import { Drawer } from '../Drawer';
import { Editor } from '../Editor';
import { Range } from '../Range';
import { Settings } from '../Settings';
import { ThemeSwitcher } from '../ThemeSwitcher';

import { useStyles } from './App.styles';

export function App() {
  useStyles();

  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [metronome, setMetronome] = useState(false);
  const [bpm, setBpm] = useState(80);
  const [settings, setSettings] = useState(false);
  const [player, setPlayer] = useState<Player | null>(null);

  const handleBeat = (measureIndex: number, rhythmIndex: number) => {
    console.log(measureIndex, rhythmIndex);
  };

  const handlePlay = () => {
    const value = !playing;

    if (value) {
      if (!player) {
        const audioCtx = new AudioContext();
        const kit = new Kit(audioCtx);
        kit.load().then(() => {
          setLoaded(true);
          const playerInstance = new Player(audioCtx, kit, handleBeat);
          setPlayer(playerInstance);
          playerInstance.play();
        });
      } else {
        player.play();
      }
    } else {
      player.stop();
    }

    setPlaying(value);
  };

  const toggleMetronome = () => setMetronome((prev) => !prev);
  const openSettings = () => setSettings(true);
  const closeSettings = () => setSettings(false);

  return (
    <>
      <ThemeSwitcher />

      <ButtonPlay active playing={playing} onClick={handlePlay} />

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

      <Editor player={player} />

      <Drawer open={settings} onClose={closeSettings}>
        <Settings />
      </Drawer>

      <pre>
        {`bpm: ${bpm}\n`}
        {`metronome: ${String(metronome)}`}
        {`loaded: ${String(loaded)}`}
      </pre>
    </>
  );
}
