import clsx from 'clsx';
import type { HTMLAttributes } from 'react';
import { memo } from 'react';

import { Icon } from '../../../icons/Icon';
import type { Instrument, InstrumentGroup } from '../../../types';
import { ButtonIcon } from '../../ButtonIcon';
import { getIconName, getNoteLabel } from './Note.utils';

import { useStyles } from './Note.styles';

interface NoteProps extends HTMLAttributes<HTMLButtonElement> {
  group: InstrumentGroup;
  index: number;
  instrument: Instrument | null;
}

export const Note = memo(function Note({
  className,
  group,
  index,
  instrument,
  ...delegated
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
      {...delegated}
    >
      <Icon
        name={iconName}
        className={clsx({ [classes.emptyCymbal]: isEmpty && group === 'cy' })}
      />
    </ButtonIcon>
  );
});
