import { IconNote16, IconNote32, IconNote4, IconNote8 } from '../../../icons';
import { ButtonIcon } from '../../ButtonIcon';

import { useStyles } from './MetronomeFrequency.styles';

export function MetronomeFrequency() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      Metronome
      <div className={classes.list}>
        <ButtonIcon aria-label="4th notes" active>
          <IconNote4 />
        </ButtonIcon>
        <ButtonIcon aria-label="8th notes">
          <IconNote8 />
        </ButtonIcon>
        <ButtonIcon aria-label="16th notes">
          <IconNote16 />
        </ButtonIcon>
        <ButtonIcon aria-label="32th notes">
          <IconNote32 />
        </ButtonIcon>
      </div>
    </div>
  );
}
