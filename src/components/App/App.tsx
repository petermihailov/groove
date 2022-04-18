import { memo, useCallback, useEffect, useState } from 'react';

import { grooveDefault } from '../../constants';
import { Icon } from '../../icons/Icon';
import type { Groove } from '../../lib/Groove';
import type { InstrumentGroupEnabled } from '../../types';
import {
  createGrooveFromString,
  createStringGroove,
  getGrooveGroups,
  getQuery,
  modifyQuery,
  updateQuery,
} from '../../utils';
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

  const [groove, setGroove] = useState<Groove>(null);
  const [playing, setPlaying] = useState(false);
  const [metronome, setMetronome] = useState(false);
  const [tempo, setTempo] = useState(80);
  const [groups, setGroups] = useState<InstrumentGroupEnabled>({});
  const [settings, setSettings] = useState(false);

  const togglePlaying = () => setPlaying((prev) => !prev);
  const toggleMetronome = () => setMetronome((prev) => !prev);
  const openSettings = () => setSettings(true);
  const closeSettings = () => setSettings(false);

  const updateGroove = useCallback(() => {
    const grooveStr = createStringGroove(groove);
    const qs = modifyQuery({ g: grooveStr });
    updateQuery(qs);
  }, [groove]);

  // set/read query
  useEffect(() => {
    const queryParams = getQuery();

    let grooveStr = queryParams.g || grooveDefault;
    let grooveFromStr: Groove;

    try {
      grooveFromStr = createGrooveFromString(grooveStr);
    } catch (err) {
      alert('Groove damaged');
      grooveStr = grooveDefault;
      grooveFromStr = createGrooveFromString(grooveStr);
    }

    const qs = modifyQuery({ g: grooveStr });
    updateQuery(qs);

    setGroove(grooveFromStr);
    setTempo(grooveFromStr.tempo);
    setGroups(getGrooveGroups(grooveFromStr));
  }, []);

  return (
    <>
      <Editor
        playing={playing}
        tempo={tempo}
        groove={groove}
        enabledGroups={groups}
        onUpdate={updateGroove}
      />

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

      <pre>
        {`tempo: ${tempo}\n`}
        {`metronome: ${String(metronome)}\n`}
      </pre>
    </>
  );
});
