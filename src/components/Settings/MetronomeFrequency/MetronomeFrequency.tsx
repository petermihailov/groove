import { Icon } from '../../../icons/Icon';
import type { MetronomeFrequency as MetronomeFrequencyType } from '../../../types';
import { ButtonIcon } from '../../ButtonIcon';

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
          aria-label="4th notes"
          active={metronomeFrequency === 4}
          onClick={handleSetFrequency(4)}
        >
          <Icon name="note-duration-4" />
        </ButtonIcon>
        <ButtonIcon
          aria-label="8th notes"
          active={metronomeFrequency === 8}
          onClick={handleSetFrequency(8)}
        >
          <Icon name="note-duration-8" />
        </ButtonIcon>
        <ButtonIcon
          aria-label="16th notes"
          active={metronomeFrequency === 16}
          onClick={handleSetFrequency(16)}
        >
          <Icon name="note-duration-16" />
        </ButtonIcon>
        <ButtonIcon
          aria-label="32th notes"
          active={metronomeFrequency === 32}
          onClick={handleSetFrequency(32)}
        >
          <Icon name="note-duration-32" />
        </ButtonIcon>
      </div>
    </div>
  );
}
