import { memo } from 'react';

import type { InstrumentGroupsProps } from './InstrumentGroups';
import { InstrumentGroups } from './InstrumentGroups';
import { MetronomeDivision } from './MetronomeDivision';
import type { MetronomeDivisionProps } from './MetronomeDivision';

import classes from './Settings.module.css';

export interface SettingsProps extends InstrumentGroupsProps, MetronomeDivisionProps {}

const Settings = ({
  metronomeDivision,
  setMetronomeDivision,
  grooveGroups,
  setGrooveGroup,
}: SettingsProps) => {
  return (
    <div className={classes.root}>
      <MetronomeDivision
        metronomeDivision={metronomeDivision}
        setMetronomeDivision={setMetronomeDivision}
      />
      <InstrumentGroups grooveGroups={grooveGroups} setGrooveGroup={setGrooveGroup} />
    </div>
  );
};

export default memo(Settings);
