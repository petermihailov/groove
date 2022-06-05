import { memo } from 'react';

import type { InstrumentGroupsProps } from './InstrumentGroups';
import { InstrumentGroups } from './InstrumentGroups';
import type { MetronomeFrequencyProps } from './MetronomeFrequency';
import { MetronomeFrequency } from './MetronomeFrequency';

import { useStyles } from './Settings.styles';

interface SettingsProps extends InstrumentGroupsProps, MetronomeFrequencyProps {}

export const Settings = memo(function Settings({
  metronomeFrequency,
  setMetronomeFrequency,
  enabledGroups,
  setEnabledGroups,
}: SettingsProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MetronomeFrequency
        metronomeFrequency={metronomeFrequency}
        setMetronomeFrequency={setMetronomeFrequency}
      />
      <InstrumentGroups enabledGroups={enabledGroups} setEnabledGroups={setEnabledGroups} />
    </div>
  );
});
