import { memo } from 'react';

import { ButtonIcon } from '../../ButtonIcon';
import { Icon } from '../../Icon';

import classes from './MetronomeDivision.module.css';

export interface MetronomeDivisionProps {
  metronomeSubdivision: number | null;
  setMetronomeSubdivision: (subdivision: number) => void;
}

const MetronomeDivision = ({
  metronomeSubdivision,
  setMetronomeSubdivision,
}: MetronomeDivisionProps) => {
  return (
    <div className={classes.root}>
      Metronome
      <div className={classes.list}>
        <ButtonIcon
          active={metronomeSubdivision === 4}
          aria-label="4th notes"
          onClick={() => setMetronomeSubdivision(4)}
        >
          <Icon name="icon.note.duration.4" />
        </ButtonIcon>
        <ButtonIcon
          active={metronomeSubdivision === 8}
          aria-label="8th notes"
          onClick={() => setMetronomeSubdivision(8)}
        >
          <Icon name="icon.note.duration.8" />
        </ButtonIcon>
        <ButtonIcon
          active={metronomeSubdivision === 16}
          aria-label="16th notes"
          onClick={() => setMetronomeSubdivision(16)}
        >
          <Icon name="icon.note.duration.16" />
        </ButtonIcon>
      </div>
    </div>
  );
};

export default memo(MetronomeDivision);
