import { MetronomeFrequency } from './MetronomeFrequency';
import { TimeSignature } from './TimeSignature';

import { useStyles } from './Settings.styles';

export function Settings() {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ height: 300 }}>
      <MetronomeFrequency />
      <TimeSignature />
    </div>
  );
}
