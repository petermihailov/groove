import clsx from 'clsx';
import type { HTMLAttributes } from 'react';
import { memo } from 'react';

import type { IconName, Instrument, InstrumentGroup } from '../../../types';
import { ButtonIcon } from '../../ButtonIcon';
import { Icon } from '../../Icon';
import { getIconName, getNoteLabel } from './Note.utils';

import { useStyles } from './Note.styles';

interface NoteProps extends HTMLAttributes<HTMLButtonElement> {
  group: InstrumentGroup;
  icon?: IconName;
  index: number;
  instrument: Instrument | null;
}

export const Note = memo(function Note({
  className,
  group,
  icon,
  index,
  instrument,
  ...delegated
}: NoteProps) {
  const classes = useStyles();

  const isEmpty = !instrument;
  const iconName = icon || getIconName(instrument, group);
  const label = getNoteLabel(instrument, group);

  return (
    <ButtonIcon
      aria-label={label}
      className={clsx(className, classes.root, { [classes.empty]: isEmpty })}
      data-group={group}
      data-index={index}
      data-instrument={instrument}
      {...delegated}
    >
      <Icon
        className={clsx({ [classes.emptyCymbal]: isEmpty && group === 'cy' })}
        name={iconName}
      />
    </ButtonIcon>
  );
});
