import clsx from 'clsx';
import { memo } from 'react';

import { Icon } from '../../../icons/Icon';
import type { Instrument, InstrumentGroup, MouseEventHandler } from '../../../types';
import { ButtonIcon } from '../../ButtonIcon';
import { getIconName, getNoteLabel } from './Note.utils';

import { useStyles } from './Note.styles';

type NoteProps = {
  className?: string;
  group: InstrumentGroup;
  index: number;
  instrument: Instrument;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const Note = memo(function Note({
  className,
  group,
  index,
  instrument,
  onClick,
}: NoteProps) {
  const classes = useStyles();

  const isEmpty = !instrument;
  const iconName = getIconName(instrument, group);
  const label = getNoteLabel(instrument, group);

  return (
    <ButtonIcon
      className={clsx(className, classes.root, { [classes.empty]: isEmpty })}
      aria-label={label}
      data-group={group}
      data-instrument={instrument}
      data-index={index}
      onClick={onClick}
    >
      <Icon name={iconName} />
    </ButtonIcon>
  );
});
