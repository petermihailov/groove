import { memo } from 'react';

import type { InstrumentGroupsProps } from './InstrumentGroups';
import { InstrumentGroups } from './InstrumentGroups';
import type { MetronomeDivisionProps } from './MetronomeDivision';

import classes from './Settings.module.css';

export interface SettingsProps extends InstrumentGroupsProps, MetronomeDivisionProps {}

const Settings = ({ grooveGroups, setGrooveGroup }: SettingsProps) => {
  return (
    <div className={classes.root}>
      {/*<MetronomeDivision*/}
      {/*  metronomeSubdivision={metronomeSubdivision}*/}
      {/*  setMetronomeSubdivision={setMetronomeSubdivision}*/}
      {/*/>*/}
      <InstrumentGroups grooveGroups={grooveGroups} setGrooveGroup={setGrooveGroup} />
    </div>
  );
};

export default memo(Settings);
