import { Icon } from '../../../icons/Icon';
import { ButtonIcon } from '../../ButtonIcon';

import { useStyles } from './MetronomeFrequency.styles';

type Frequency = 4 | 8 | 16 | 32;

export type MetronomeFrequencyProps = {
  metronomeFrequency?: Frequency;
  setMetronomeFrequency?: (frequency: Frequency) => void;
};

export function MetronomeFrequency({
  metronomeFrequency,
  setMetronomeFrequency,
}: MetronomeFrequencyProps) {
  const classes = useStyles();

  const handleSetFrequency = (frequency: Frequency) => () => {
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
