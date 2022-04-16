import clsx from 'clsx';
import { memo } from 'react';

import { Icon } from '../../../icons/Icon';
import type { Instrument, InstrumentGroup } from '../../../types';
import { ButtonIcon } from '../../ButtonIcon';
import { getIconName } from './Note.utils';

import { useStyles } from './Note.styles';

type NoteProps = {
  className?: string;
  instrument: Instrument;
  group: InstrumentGroup;
};

export const Note = memo(function Note({ className, instrument, group }: NoteProps) {
  const classes = useStyles();
  const isEmpty = !instrument;
  const iconName = getIconName(instrument, group);

  return (
    <ButtonIcon
      className={clsx(className, classes.root, { [classes.empty]: isEmpty })}
      aria-label={`note-${instrument}`}
    >
      <Icon name={iconName} />
    </ButtonIcon>
  );
});
