import clsx from 'clsx';
import type { HTMLAttributes } from 'react';
import { memo } from 'react';

import { getIconName, getNoteLabel } from './Note.utils';
import type { IconName } from '../../../../types/icons';
import type { Instrument, Group } from '../../../../types/instrument';
import { ButtonIcon } from '../../../ButtonIcon';
import { Icon } from '../../../Icon';

import classes from './Note.module.css';

export interface NoteProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> {
  group: Group;
  icon?: IconName;
  instrument: Instrument;
  onClick?: (instrument: Instrument) => void;
}

const Note = ({ className, group, icon, instrument, onClick, ...delegated }: NoteProps) => {
  const iconName = icon || getIconName(instrument);
  const label = getNoteLabel(instrument, group);

  const handleClick = () => {
    onClick?.(instrument);
  };

  return (
    <ButtonIcon
      aria-label={label}
      className={clsx(className, classes.root)}
      onClick={handleClick}
      {...delegated}
    >
      <Icon name={iconName} />
    </ButtonIcon>
  );
};

export default memo(Note);
