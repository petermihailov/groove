import type { MetronomeFrequency as MetronomeFrequencyType } from '../../../types';
import { ButtonIcon } from '../../ButtonIcon';
import { Icon } from '../../Icon';

import { useStyles } from './MetronomeFrequency.styles';

export type MetronomeFrequencyProps = {
  metronomeFrequency?: MetronomeFrequencyType;
  setMetronomeFrequency?: (frequency: MetronomeFrequencyType) => void;
};

export function MetronomeFrequency({
  metronomeFrequency,
  setMetronomeFrequency,
}: MetronomeFrequencyProps) {
  const classes = useStyles();

  const handleSetFrequency = (frequency: MetronomeFrequencyType) => () => {
    setMetronomeFrequency?.(frequency);
  };

  return (
    <div className={classes.root}>
      Metronome
      <div className={classes.list}>
        <ButtonIcon
          active={metronomeFrequency === 4}
          aria-label="4th notes"
          onClick={handleSetFrequency(4)}
        >
          <Icon name="note-duration-4" />
        </ButtonIcon>
        <ButtonIcon
          active={metronomeFrequency === 8}
          aria-label="8th notes"
          onClick={handleSetFrequency(8)}
        >
          <Icon name="note-duration-8" />
        </ButtonIcon>
        <ButtonIcon
          active={metronomeFrequency === 16}
          aria-label="16th notes"
          onClick={handleSetFrequency(16)}
        >
          <Icon name="note-duration-16" />
        </ButtonIcon>
        <ButtonIcon
          active={metronomeFrequency === 32}
          aria-label="32th notes"
          onClick={handleSetFrequency(32)}
        >
          <Icon name="note-duration-32" />
        </ButtonIcon>
      </div>
    </div>
  );
}
