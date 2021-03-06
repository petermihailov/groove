import clsx from 'clsx';
import type { MouseEventHandler } from 'react';
import { memo, useMemo, useRef, useState } from 'react';

import { useClickOutside } from '../../../hooks';
import type {
  Bar as BarType,
  InstrumentGroupEnabled,
  TimeSignature as TimeSignatureType,
  TimeDivision,
} from '../../../types';
import { convertBarInstrumentsByGroups } from '../../../utils';
import { ButtonIcon } from '../../ButtonIcon';
import { Icon } from '../../Icon';
import { BarLine } from '../BarLine';
import { Pill } from '../Pill';
import { TimeSignature } from '../TimeSignature';

import { useStyles } from './Bar.styles';

type BarProps = {
  className?: string;
  bar: BarType;
  barIndex: number;
  enabledGroups: InstrumentGroupEnabled;
  onAddBar: (barIndex: number) => void;
  onClearBar: (barIndex: number) => void;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onRemoveBar: (barIndex: number) => void;
  onChangeSignature: (
    signature: TimeSignatureType & {
      barIndex: number;
      timeDivision: TimeDivision;
    }
  ) => void;
};

export const Bar = memo(function Bar({
  className,
  bar,
  barIndex,
  enabledGroups,
  onAddBar,
  onClearBar,
  onClick,
  onRemoveBar,
  onChangeSignature,
}: BarProps) {
  const classes = useStyles();

  const [actions, setActions] = useState(false);
  const actionsRef = useRef(null);

  const instrumentsByGroups = useMemo(() => {
    return convertBarInstrumentsByGroups(bar);
  }, [bar]);

  const hhFootOffsetGroups = useMemo(() => {
    return Object.values(enabledGroups).filter(Boolean).length - Number(enabledGroups.cy);
  }, [enabledGroups]);

  const toggleActions = () => setActions((prev) => !prev);

  const closeActions = () => setActions(false);

  const addBar = () => {
    onAddBar(barIndex);
    closeActions();
  };

  const removeBar = () => {
    onRemoveBar(barIndex);
    closeActions();
  };

  const clearBar = () => {
    onClearBar(barIndex);
    closeActions();
  };

  useClickOutside(actionsRef, closeActions);

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

      <div ref={actionsRef} className={classes.actions}>
        <ButtonIcon
          aria-label={`${actions ? 'open' : 'close'} bar actions`}
          className={classes.actionButton}
          onClick={toggleActions}
        >
          <Icon name="ui-more" />
        </ButtonIcon>

        <Pill className={clsx(classes.actionBar, { [classes.actionsBarHidden]: !actions })}>
          <ButtonIcon aria-label="remove bar" onClick={removeBar}>
            <Icon name="ui-delete" />
          </ButtonIcon>
          <ButtonIcon aria-label="clear bar" onClick={clearBar}>
            <Icon name="ui-clear" />
          </ButtonIcon>
          <ButtonIcon aria-label="add bar" onClick={addBar}>
            <Icon name="ui-add" />
          </ButtonIcon>

          <TimeSignature
            barIndex={barIndex}
            beatsPerBar={bar.beatsPerBar}
            className={classes.timeSignature}
            noteValue={bar.noteValue}
            timeDivision={bar.timeDivision}
            onChangeSignature={onChangeSignature}
          />
        </Pill>
      </div>
    </div>
  );
});
