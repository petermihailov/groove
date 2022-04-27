import clsx from 'clsx';

import { tempoMax, tempoMin } from '../../constants';
import { Icon } from '../../icons/Icon';
import type { Groove } from '../../types';
import { ButtonIcon } from '../ButtonIcon';
import { ButtonPlay } from '../ButtonPlay';
import { Range } from '../Range';
import { ThemeSwitcher } from '../ThemeSwitcher';

import { useStyles } from './Controls.styles';

type ControlsProps = {
  className?: string;
  groove: Groove;
  metronomeEnabled: boolean;
  onOpenSettings: () => void;
  onSetTempo: (tempo: number) => void;
  onToggleMetronome: () => void;
  onTogglePlaying: () => void;
  playing: boolean;
  settingsOpened: boolean;
};

export function Controls({
  className,
  groove,
  metronomeEnabled,
  onOpenSettings,
  onSetTempo,
  onToggleMetronome,
  onTogglePlaying,
  playing,
  settingsOpened,
}: ControlsProps) {
  const classes = useStyles();

  return (
    <div className={clsx(className, classes.root)}>
      <ButtonPlay active playing={playing} onClick={onTogglePlaying} />
      <ButtonIcon
        active={metronomeEnabled}
        aria-label={`metronome ${metronomeEnabled ? 'enabled' : 'disabled'}`}
        onClick={onToggleMetronome}
      >
        <Icon name="ui-metronome" />
      </ButtonIcon>

      <Range
        className={classes.bpm}
        label="BPM"
        max={tempoMax}
        min={tempoMin}
        value={groove.tempo}
        onChange={onSetTempo}
      />

      <ButtonIcon active={settingsOpened} aria-label="open settings" onClick={onOpenSettings}>
        <Icon name="ui-settings" />
      </ButtonIcon>
      <ThemeSwitcher />
    </div>
  );
}
