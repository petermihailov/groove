import clsx from 'clsx';
import { memo } from 'react';

import { Icon } from '../../../icons/Icon';
import type { InstrumentGroupEnabled } from '../../../types';

import { useStyles } from './Groups.styles';

type GroupsProps = {
  className?: string;
  enabledGroups: InstrumentGroupEnabled;
};

export const Groups = memo(function Groups({ className, enabledGroups }: GroupsProps) {
  const classes = useStyles();

  return (
    <div className={clsx(className, classes.root)}>
      {enabledGroups.cy && <Icon name="group-cy" className={classes.toBottom} />}
      {enabledGroups.hh && <Icon name="group-hh" className={classes.toBottom} />}
      {enabledGroups.t1 && <Icon name="group-t1" />}
      {enabledGroups.sn && <Icon name="group-sn" />}
      {enabledGroups.t2 && <Icon name="group-t2" />}
      {enabledGroups.t3 && <Icon name="group-t3" />}
      {enabledGroups.ki && <Icon name="group-ki" />}
    </div>
  );
});
