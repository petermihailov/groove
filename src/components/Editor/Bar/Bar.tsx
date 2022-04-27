import clsx from 'clsx';
import type { MouseEventHandler } from 'react';
import { memo, useMemo } from 'react';

import { Icon } from '../../../icons/Icon';
import type { Bar as BarType, InstrumentGroupEnabled } from '../../../types';
import { convertBarInstrumentsByGroups } from '../../../utils';
import { ButtonIcon } from '../../ButtonIcon';
import { BarLine } from '../BarLine';

import { useStyles } from './Bar.styles';

type BarProps = {
  className?: string;
  bar: BarType;
  barIndex: number;
  enabledGroups: InstrumentGroupEnabled;
  onAddBar: (barIndex: number) => void;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export const Bar = memo(function Bar({
  className,
  bar,
  barIndex,
  enabledGroups,
  onAddBar,
  onClick,
}: BarProps) {
  const classes = useStyles();

  const instrumentsByGroups = useMemo(() => {
    return convertBarInstrumentsByGroups(bar);
  }, [bar]);

  const hhFootOffsetGroups = useMemo(() => {
    return Object.values(enabledGroups).filter(Boolean).length - Number(enabledGroups.cy);
  }, [enabledGroups]);

  const addBar = () => {
    onAddBar(barIndex);
  };

  return (
    <div
      className={clsx(className, classes.root)}
      data-index={barIndex}
      style={{ gridTemplateColumns: `repeat(${bar.length}, auto)` }}
      onClick={onClick}
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

      <ButtonIcon aria-label="add bar" className={classes.addButton} onClick={addBar}>
        <Icon name="ui-add" />
      </ButtonIcon>
    </div>
  );
});
