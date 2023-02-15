import { memo } from 'react';

import type { MetronomeFrequency as MetronomeFrequencyType } from '../../../types';
import { ButtonIcon } from '../../ButtonIcon';
import { Icon } from '../../Icon';

import classes from './MetronomeFrequency.css';

export interface MetronomeFrequencyProps {
  metronomeFrequency?: MetronomeFrequencyType;
  setMetronomeFrequency?: (frequency: MetronomeFrequencyType) => void;
}

const MetronomeFrequency = ({
  metronomeFrequency,
  setMetronomeFrequency,
}: MetronomeFrequencyProps) => {
  const handleSetFrequency = (frequency: MetronomeFrequencyType) => () => {
    setMetronomeFrequency?.(frequency);
  };

  return (
    <div className={classes.root}>
      Metronome
      <div className={classes.list}>
        <ButtonIcon
          disabled
          active={metronomeFrequency === 4}
          aria-label="4th notes"
          onClick={handleSetFrequency(4)}
        >
          <Icon name="icon.note.duration.4" />
        </ButtonIcon>
        <ButtonIcon
          disabled
          active={metronomeFrequency === 8}
          aria-label="8th notes"
          onClick={handleSetFrequency(8)}
        >
          <Icon name="icon.note.duration.8" />
        </ButtonIcon>
        <ButtonIcon
          disabled
          active={metronomeFrequency === 16}
          aria-label="16th notes"
          onClick={handleSetFrequency(16)}
        >
          <Icon name="icon.note.duration.16" />
        </ButtonIcon>
        <ButtonIcon
          disabled
          active={metronomeFrequency === 32}
          aria-label="32th notes"
          onClick={handleSetFrequency(32)}
        >
          <Icon name="icon.note.duration.32" />
        </ButtonIcon>
      </div>
    </div>
  );
};

export default memo(MetronomeFrequency);
