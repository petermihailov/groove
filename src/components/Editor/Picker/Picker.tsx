import clsx from 'clsx';
import { memo } from 'react';

import type { InstrumentGroup } from '../../../types';

import { useStyles } from './Picker.styles';

type PickerProps = {
  className?: string;
  group: InstrumentGroup;
};

export const Picker = memo(function Picker({ className }: PickerProps) {
  const classes = useStyles();

  return (
    <div className={clsx(className, classes.root)}>
      <div className={classes.content}>icon</div>
    </div>
  );
});
