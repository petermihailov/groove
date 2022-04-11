import { memo, useEffect, useMemo, useRef } from 'react';

import type { Measure as MeasureType } from '../../../lib/Measure';

import { useStyles } from './Measure.styles';

type MeasureProps = {
  measure: MeasureType;
};

export const Measure = memo(function Measure({ measure }: MeasureProps) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <div className={classes.stroke}></div>
      </div>
    </>
  );
});
