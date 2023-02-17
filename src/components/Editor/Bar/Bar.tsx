import type { MouseEventHandler } from 'react';
import { Fragment, memo, useMemo } from 'react';

import { sizeIconDefault } from '../../../constants';
import type {
  Bar as BarType,
  InstrumentGroupEnabled,
  TimeSignature as TimeSignatureType,
  TimeDivision,
} from '../../../types';
import { convertBarInstrumentsByGroups } from '../../../utils/groove';
import { safeKeys } from '../../../utils/safe-keys';
import { getIconName } from '../Note/Note.utils';

import classes from './Bar.module.css';

export interface BarProps {
  bar: BarType;
  barIndex: number;
  className?: string;
  enabledGroups: InstrumentGroupEnabled;
  sizeNote: number;
  onAddBar: (barIndex: number) => void;
  onClearBar: (barIndex: number) => void;
  onClick?: MouseEventHandler<SVGSVGElement>;
  onRemoveBar: (barIndex: number) => void;
  onChangeSignature: (
    signature: TimeSignatureType & {
      barIndex: number;
      timeDivision: TimeDivision;
    },
  ) => void;
}

const Bar = ({
  bar,
  barIndex,
  className,
  enabledGroups,
  sizeNote,
  onAddBar,
  onChangeSignature,
  onClearBar,
  onClick,
  onRemoveBar,
}: BarProps) => {
  // const [actions, setActions] = useState(false);
  // const actionsRef = useRef(null);

  const instrumentsByGroups = useMemo(() => {
    return convertBarInstrumentsByGroups(bar, enabledGroups);
  }, [bar, enabledGroups]);

  // const hhFootOffsetGroups = useMemo(() => {
  //   return Object.values(enabledGroups).filter(Boolean).length - Number(enabledGroups.cy);
  // }, [enabledGroups]);

  // const toggleActions = () => setActions((prev) => !prev);

  // const closeActions = () => setActions(false);

  // const addBar = () => {
  //   onAddBar(barIndex);
  //   closeActions();
  // };

  // const removeBar = () => {
  //   onRemoveBar(barIndex);
  //   closeActions();
  // };

  // const clearBar = () => {
  //   onClearBar(barIndex);
  //   closeActions();
  // };

  // useClickOutside(actionsRef, closeActions);

  const colsCount = bar.length;
  const rowsCount = Object.keys(instrumentsByGroups).length;

  const barWidth = colsCount * sizeNote;
  const barHeight = rowsCount * sizeNote;
  const viewBox = `0 0 ${colsCount * sizeIconDefault} ${rowsCount * sizeIconDefault}`;

  return (
    <svg
      className={classes.root}
      height={barHeight}
      viewBox={viewBox}
      width={barWidth}
      onClick={onClick}
    >
      {safeKeys(instrumentsByGroups).map((group, row) => {
        return instrumentsByGroups[group].map((instrument, col) => (
          <Fragment key={`${row}-${col}-${instrument}`}>
            <rect
              data-bar={barIndex}
              data-group={group}
              data-index={col}
              data-instrument={instrument}
              fill="transparent"
              height={sizeIconDefault}
              width={sizeIconDefault}
              x={sizeIconDefault * col}
              y={sizeIconDefault * row}
            />
            <use
              href={`#${getIconName(instrument, group)}`}
              opacity={instrument !== null ? 1 : 0.15}
              x={sizeIconDefault * col}
              y={sizeIconDefault * row}
            />
          </Fragment>
        ));
      })}
    </svg>
  );

  // return (
  //   <div
  //     className={clsx(className, classes.root)}
  //     data-index={barIndex}
  //     style={{ gridTemplateColumns: `repeat(${bar.length}, auto)` }}
  //     onClick={onClick}
  //   >
  //     {enabledGroups.cy && <BarLine group="cy" line={instrumentsByGroups.cy} />}
  //     {enabledGroups.hh && (
  //       <BarLine group="hh" hhFootOffsetGroups={hhFootOffsetGroups} line={instrumentsByGroups.hh} />
  //     )}
  //     {enabledGroups.t1 && <BarLine group="t1" line={instrumentsByGroups.t1} />}
  //     {enabledGroups.sn && <BarLine group="sn" line={instrumentsByGroups.sn} />}
  //     {enabledGroups.t2 && <BarLine group="t2" line={instrumentsByGroups.t2} />}
  //     {enabledGroups.t3 && <BarLine group="t3" line={instrumentsByGroups.t3} />}
  //     {enabledGroups.ki && <BarLine group="ki" line={instrumentsByGroups.ki} />}
  //
  //     {/*<div ref={actionsRef} className={classes.actions}>*/}
  //     {/*  <ButtonIcon*/}
  //     {/*    aria-label={`${actions ? 'open' : 'close'} bar actions`}*/}
  //     {/*    className={classes.actionButton}*/}
  //     {/*    onClick={toggleActions}*/}
  //     {/*  >*/}
  //     {/*    <Icon name="icon.more" />*/}
  //     {/*  </ButtonIcon>*/}
  //
  //     {/*  <Pill className={clsx(classes.actionBar, { [classes.actionsBarHidden]: !actions })}>*/}
  //     {/*    <ButtonIcon aria-label="remove bar" onClick={removeBar}>*/}
  //     {/*      <Icon name="icon.delete" />*/}
  //     {/*    </ButtonIcon>*/}
  //     {/*    <ButtonIcon aria-label="clear bar" onClick={clearBar}>*/}
  //     {/*      <Icon name="icon.clear" />*/}
  //     {/*    </ButtonIcon>*/}
  //     {/*    <ButtonIcon aria-label="add bar" onClick={addBar}>*/}
  //     {/*      <Icon name="icon.add" />*/}
  //     {/*    </ButtonIcon>*/}
  //
  //     {/*    <TimeSignature*/}
  //     {/*      barIndex={barIndex}*/}
  //     {/*      beatsPerBar={bar.beatsPerBar}*/}
  //     {/*      className={classes.timeSignature}*/}
  //     {/*      noteValue={bar.noteValue}*/}
  //     {/*      timeDivision={bar.timeDivision}*/}
  //     {/*      onChangeSignature={onChangeSignature}*/}
  //     {/*    />*/}
  //     {/*  </Pill>*/}
  //     {/*</div>*/}
  //   </div>
  // );
};

export default memo(Bar);
