import * as React from 'react';

import { useStyles } from './TimeSignature.styles';

export function TimeSignature() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      Time Signature
      <div className={classes.list}>
        4 / 4
      </div>
    </div>
  );
}