import { memo } from 'react';

import type { TimeDivision } from '../../../types/instrument';
import { ButtonIcon } from '../../ButtonIcon';
import { Icon } from '../../Icon';

import classes from './MetronomeDivision.module.css';

export interface MetronomeDivisionProps {
  metronomeDivision: TimeDivision;
  setMetronomeDivision: (division: TimeDivision) => void;
}

const MetronomeDivision = ({ metronomeDivision, setMetronomeDivision }: MetronomeDivisionProps) => {
  return (
    <div className={classes.root}>
      Metronome
      <div className={classes.list}>
        <ButtonIcon
          active={metronomeDivision === 4}
          aria-label="4th notes"
          onClick={() => setMetronomeDivision(4)}
        >
          <Icon name="icon.note.duration.4" />
        </ButtonIcon>
        <ButtonIcon
          active={metronomeDivision === 8}
          aria-label="8th notes"
          onClick={() => setMetronomeDivision(8)}
        >
          <Icon name="icon.note.duration.8" />
        </ButtonIcon>
        <ButtonIcon
          active={metronomeDivision === 16}
          aria-label="16th notes"
          onClick={() => setMetronomeDivision(16)}
        >
          <Icon name="icon.note.duration.16" />
        </ButtonIcon>
      </div>
    </div>
  );
};

export default memo(MetronomeDivision);
