import { memo } from 'react';

import type { InstrumentGroupsProps } from './InstrumentGroups';
import { InstrumentGroups } from './InstrumentGroups';
import type { MetronomeFrequencyProps } from './MetronomeFrequency';
import { MetronomeFrequency } from './MetronomeFrequency';

import classes from './Settings.module.css';

export interface SettingsProps extends InstrumentGroupsProps, MetronomeFrequencyProps {}

const Settings = ({
  metronomeFrequency,
  setMetronomeFrequency,
  enabledGroups,
  setEnabledGroups,
}: SettingsProps) => {
  return (
    <div className={classes.root}>
      <MetronomeFrequency
        metronomeFrequency={metronomeFrequency}
        setMetronomeFrequency={setMetronomeFrequency}
      />
      <InstrumentGroups enabledGroups={enabledGroups} setEnabledGroups={setEnabledGroups} />
    </div>
  );
};

export default memo(Settings);
