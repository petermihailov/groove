import clsx from 'clsx';
import { memo } from 'react';

import { tempoMax, tempoMin } from '../../constants';
import type { Groove } from '../../types/instrument';
import { ButtonIcon } from '../ButtonIcon';
import { ButtonPlay } from '../ButtonPlay';
import { ButtonShare } from '../ButtonShare';
import { Icon } from '../Icon';
import { Range } from '../Range';
import { ThemeSwitcher } from '../ThemeSwitcher';

import classes from './Controls.module.css';

export interface ControlsProps {
  className?: string;
  groove: Groove;
  metronomeEnabled: boolean;
  onOpenSettings: () => void;
  onSetTempo: (tempo: number) => void;
  onToggleMetronome: () => void;
  onTogglePlaying: () => void;
  playing: boolean;
}

const Controls = ({
  className,
  groove,
  metronomeEnabled,
  onOpenSettings,
  onSetTempo,
  onToggleMetronome,
  onTogglePlaying,
  playing,
}: ControlsProps) => {
  return (
    <div className={clsx(className, classes.root)}>
      <div className={classes.row}>
        <ButtonPlay active playing={playing} onClick={onTogglePlaying} />

        <ButtonIcon
          active={metronomeEnabled}
          aria-label={`metronome ${metronomeEnabled ? 'enabled' : 'disabled'}`}
          onClick={onToggleMetronome}
        >
          <Icon name="icon.metronome" />
        </ButtonIcon>

        <Range
          className={classes.bpm}
          label="BPM"
          max={tempoMax}
          min={tempoMin}
          value={groove.tempo}
          onChange={onSetTempo}
        />
      </div>

      <div className={clsx(classes.row, classes.other)}>
        <ButtonIcon aria-label="open settings" onClick={onOpenSettings}>
          <Icon name="icon.settings" />
        </ButtonIcon>

        <ButtonShare />

        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default memo(Controls);
