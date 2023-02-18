import clsx from 'clsx';
import type { HTMLAttributes } from 'react';
import { memo } from 'react';

import { getIconName, getNoteLabel } from './Note.utils';
import type { IconName } from '../../../types/icons';
import type { Instrument, InstrumentGroup } from '../../../types/instrument';
import { ButtonIcon } from '../../ButtonIcon';
import { Icon } from '../../Icon';

import classes from './Note.module.css';

export interface NoteProps extends HTMLAttributes<HTMLButtonElement> {
  group: InstrumentGroup;
  icon?: IconName;
  index: number;
  instrument: Instrument;
}

const Note = ({ className, group, icon, index, instrument, ...delegated }: NoteProps) => {
  const isEmpty = !instrument;
  const iconName = icon || getIconName(instrument);
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
};

export default memo(Note);
