import { Icon } from '../../../icons/Icon';
import { ButtonIcon } from '../../ButtonIcon';

import { useStyles } from './MetronomeFrequency.styles';

export function MetronomeFrequency() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      Metronome
      <div className={classes.list}>
        <ButtonIcon aria-label="4th notes" active>
          <Icon name="note4" />
        </ButtonIcon>
        <ButtonIcon aria-label="8th notes">
          <Icon name="note8" />
        </ButtonIcon>
        <ButtonIcon aria-label="16th notes">
          <Icon name="note16" />
        </ButtonIcon>
        <ButtonIcon aria-label="32th notes">
          <Icon name="note32" />
        </ButtonIcon>
      </div>
    </div>
  );
}
