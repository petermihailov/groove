import clsx from 'clsx';
import type { MouseEventHandler } from 'react';
import { memo, useMemo } from 'react';

import type { Bar as BarType, InstrumentGroupEnabled } from '../../../types';
import { convertBarInstrumentsByGroups } from '../../../utils';
import { BarLine } from '../BarLine';

import { useStyles } from './Bar.styles';

type BarProps = {
  className?: string;
  bar: BarType;
  enabledGroups: InstrumentGroupEnabled;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export const Bar = memo(function Bar({ className, bar, enabledGroups, ...delegated }: BarProps) {
  const classes = useStyles();

  const instrumentsByGroups = useMemo(() => {
    return convertBarInstrumentsByGroups(bar);
  }, [bar]);

  const hhFootOffsetGroups = useMemo(() => {
    return Object.values(enabledGroups).filter(Boolean).length - Number(enabledGroups.cy);
  }, [enabledGroups]);

  return (
    <div
      className={clsx(className, classes.root)}
      style={{ gridTemplateColumns: `repeat(${bar.length}, auto)` }}
      {...delegated}
    >
      {enabledGroups.cy && <BarLine group="cy" line={instrumentsByGroups.cy} />}
      {enabledGroups.hh && (
        <BarLine group="hh" hhFootOffsetGroups={hhFootOffsetGroups} line={instrumentsByGroups.hh} />
      )}
      {enabledGroups.t1 && <BarLine group="t1" line={instrumentsByGroups.t1} />}
      {enabledGroups.sn && <BarLine group="sn" line={instrumentsByGroups.sn} />}
      {enabledGroups.t2 && <BarLine group="t2" line={instrumentsByGroups.t2} />}
      {enabledGroups.t3 && <BarLine group="t3" line={instrumentsByGroups.t3} />}
      {enabledGroups.ki && <BarLine group="ki" line={instrumentsByGroups.ki} />}
    </div>
  );
});
