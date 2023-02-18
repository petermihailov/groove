import clsx from 'clsx';
import type { MouseEventHandler } from 'react';
import { Fragment, memo, useEffect, useMemo, useRef } from 'react';

import { sizeIconDefault } from '../../../constants';
import type { IconName } from '../../../types/icons';
import type {
  Bar as BarType,
  InstrumentGroupEnabled,
  TimeSignature as TimeSignatureType,
  TimeDivision,
  InstrumentGroup,
  Note,
} from '../../../types/instrument';
import { convertBarInstrumentsByGroups } from '../../../utils/groove';
import { defaultGroupNoteMap, iconNamesMap } from '../../../utils/maps';
import { safeKeys } from '../../../utils/safe-keys';
import { createNoteDataset, getEmptyIconName } from '../Editor.utils';
import { getIconName } from '../Picker/Note/Note.utils';

import classes from './Bar.module.css';

export interface BarProps {
  bar: BarType;
  barIndex: number;
  className?: string;
  enabledGroups: InstrumentGroupEnabled;
  focusedNote: Note | null;
  playing: boolean;
  sizeNote: number;
  tracking: null | number;
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
  focusedNote,
  playing,
  sizeNote,
  tracking,
  onAddBar,
  onChangeSignature,
  onClearBar,
  onClick,
  onRemoveBar,
}: BarProps) => {
  // const [actions, setActions] = useState(false);
  // const actionsRef = useRef(null);

  const refTracker = useRef<SVGRectElement>(null);

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

  const svgWidth = colsCount * sizeNote;
  const svgHeight = rowsCount * sizeNote;
  const vbWidth = colsCount * sizeIconDefault;
  const vbHeight = rowsCount * sizeIconDefault;
  const viewBox = `0 0 ${vbWidth} ${vbHeight}`;

  useEffect(() => {
    const tracker = refTracker.current;
    const index = tracking ?? -1;

    if (tracker) {
      if (playing) {
        if (tracking !== null) {
          tracker.setAttribute('x', String(index * sizeIconDefault));
          tracker.setAttribute('fill', 'var(--color-highlight)');
        }
      } else {
        tracker.setAttribute('fill', 'transparent');
      }
    }
  }, [playing, tracking]);

  return (
    <svg
      className={clsx(className, classes.root)}
      height={svgHeight}
      viewBox={viewBox}
      width={svgWidth}
      onClick={onClick}
    >
      <rect
        ref={refTracker}
        className={classes.tracker}
        fill="transparent"
        height={vbHeight}
        width={sizeIconDefault}
      />

      {safeKeys(instrumentsByGroups).map((group, row) => {
        return instrumentsByGroups[group].map((instrumentOrNull, col) => {
          const instrument = instrumentOrNull ?? defaultGroupNoteMap[group];
          const value = Boolean(instrumentOrNull);
          const isFocused =
            focusedNote?.instrument === instrument &&
            focusedNote.rhythmIndex === col &&
            focusedNote.barIndex === barIndex;

          return (
            <Fragment key={`${row}-${col}-${instrument}`}>
              <rect
                {...createNoteDataset({
                  barIndex,
                  group,
                  instrument,
                  rhythmIndex: col,
                  value,
                })}
                fill="transparent"
                height={sizeIconDefault}
                width={sizeIconDefault}
                x={sizeIconDefault * col}
                y={sizeIconDefault * row}
              />
              <use
                fill={isFocused ? 'var(--color-accent)' : undefined}
                href={`#${value ? getIconName(instrument) : getEmptyIconName(group)}`}
                opacity={value ? 1 : 0.15}
                x={sizeIconDefault * col}
                y={sizeIconDefault * row}
              />
            </Fragment>
          );
        });
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
