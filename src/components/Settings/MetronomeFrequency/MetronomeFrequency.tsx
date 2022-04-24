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
          <Icon name="note-duration-4" />
        </ButtonIcon>
        <ButtonIcon aria-label="8th notes">
          <Icon name="note-duration-8" />
        </ButtonIcon>
        <ButtonIcon aria-label="16th notes">
          <Icon name="note-duration-16" />
        </ButtonIcon>
        <ButtonIcon aria-label="32th notes">
          <Icon name="note-duration-32" />
        </ButtonIcon>
      </div>
    </div>
  );
}
