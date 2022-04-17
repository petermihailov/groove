import { memo } from 'react';

import { MetronomeFrequency } from './MetronomeFrequency';
import { TimeSignature } from './TimeSignature';

import { useStyles } from './Settings.styles';

export const Settings = memo(function Settings() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MetronomeFrequency />
      <TimeSignature />
    </div>
  );
});
