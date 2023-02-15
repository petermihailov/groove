import clsx from 'clsx';
import { memo } from 'react';

import type { InstrumentGroupEnabled } from '../../../types';
import { Icon } from '../../Icon';

import classes from './Groups.css';

export interface GroupsProps {
  className?: string;
  enabledGroups: InstrumentGroupEnabled;
}

const Groups = ({ className, enabledGroups }: GroupsProps) => {
  return (
    <div className={clsx(className, classes.root)}>
      {enabledGroups.cy && <Icon className={classes.toBottom} name="icon.group.cy" />}
      {enabledGroups.hh && <Icon className={classes.toBottom} name="icon.group.hh" />}
      {enabledGroups.t1 && <Icon name="icon.group.t1" />}
      {enabledGroups.sn && <Icon name="icon.group.sn" />}
      {enabledGroups.t2 && <Icon name="icon.group.t2" />}
      {enabledGroups.t3 && <Icon name="icon.group.t3" />}
      {enabledGroups.ki && <Icon name="icon.group.ki" />}
      {enabledGroups.hh && <Icon name="icon.group.hh-foot" />}
    </div>
  );
};

export default memo(Groups);
