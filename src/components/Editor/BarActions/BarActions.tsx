import clsx from 'clsx';
import { memo, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';

import { useClickOutside } from '../../../hooks';
import type { Bar, TimeDivision, TimeSignature } from '../../../types/instrument';
import { Icon } from '../../Icon';
import { Select } from '../../Select';

import classes from './BarActions.module.css';

const timeDivisionOptions: TimeDivision[] = [4, 8, 16, 32];
const beatsPerBarOptions: TimeSignature['beatsPerBar'][] = Array.from(Array(14)).map(
  (_, idx) => idx + 2,
); // top sign 2..14
const noteValueOptions: TimeSignature['noteValue'][] = [4, 8, 16]; // bottom sign 4 , 8, 16

export interface BarActionsProps {
  className?: string;
  bar: Bar;
  barIndex: number;
  onAddBar: (barIndex: number) => void;
  onClearBar: (barIndex: number) => void;
  onRemoveBar: (barIndex: number) => void;
  onChangeSignature: (
    signature: TimeSignature & {
      barIndex: number;
      timeDivision: TimeDivision;
    },
  ) => void;
}

const BarActions = ({
  className,
  bar,
  barIndex,
  onAddBar,
  onChangeSignature,
  onClearBar,
  onRemoveBar,
}: BarActionsProps) => {
  const refActions = useRef<HTMLDivElement>(null);
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    strategy: 'fixed',
    placement: 'left-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 4],
        },
      },
    ],
  });

  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => {
    setIsOpen(false);
  };

  const toggleDialog = () => {
    setIsOpen((prev) => !prev);
  };

  /* Bar options */

  const addBar = () => {
    onAddBar?.(barIndex);
    closeDialog();
  };

  const removeBar = () => {
    onRemoveBar?.(barIndex);
    closeDialog();
  };

  const clearBar = () => {
    onClearBar?.(barIndex);
    closeDialog();
  };

  /* Time signature */

  const changeSignature = (
    patch: Partial<TimeSignature & { barIndex: number; timeDivision: TimeDivision }>,
  ) => {
    const { beatsPerBar, timeDivision, noteValue } = bar;

    onChangeSignature({
      barIndex,
      beatsPerBar,
      timeDivision,
      noteValue,
      ...patch,
    });
  };

  const changeTimeDivision = (timeDivision: TimeDivision) => {
    changeSignature({ timeDivision });
  };

  const changeBeatsPerBar = (beatsPerBar: TimeSignature['beatsPerBar']) => {
    changeSignature({ beatsPerBar });
  };

  const changeNoteValue = (noteValue: TimeSignature['noteValue']) => {
    changeSignature({ noteValue });
  };

  useClickOutside(refActions, closeDialog);

  useEffect(() => {
    referenceElement?.closest('[data-bar]')?.classList.toggle(classes.barHighlight, isOpen);
  }, [referenceElement, isOpen]);

  return (
    <div ref={refActions} className={clsx(className, classes.root)}>
      <button ref={setReferenceElement} className={classes.actionButton} onClick={toggleDialog}>
        <Icon className={classes.moreIcon} name="icon.more" />
      </button>

      {createPortal(
        <div
          ref={setPopperElement}
          className={clsx(classes.popper, { [classes.open]: isOpen })}
          style={styles.popper}
          {...attributes.popper}
        >
          <div className={classes.actions}>
            <button className={classes.option} onClick={addBar}>
              <Icon name="icon.add" />
              <span>add new</span>
            </button>

            <button className={classes.option} onClick={clearBar}>
              <Icon name="icon.clear" />
              <span>clear</span>
            </button>

            <button className={clsx(classes.option, classes.error)} onClick={removeBar}>
              <Icon name="icon.delete" />
              <span>remove</span>
            </button>

            <Select
              options={timeDivisionOptions.map((option) => ({
                value: option,
                label: `${option}th`,
                customLabel: (
                  <div className={classes.option}>
                    <Icon name={`icon.note.duration.${option}`} />
                    <span>note duration</span>
                  </div>
                ),
              }))}
              value={bar.timeDivision}
              onChange={changeTimeDivision}
            />

            <div className={clsx(classes.option, classes.timeSignature)}>
              <Select
                options={beatsPerBarOptions.map((option) => ({
                  value: option,
                  label: option,
                }))}
                value={bar.beatsPerBar}
                onChange={changeBeatsPerBar}
              />

              <span>/</span>

              <Select
                options={noteValueOptions.map((option) => ({
                  value: option,
                  label: option,
                }))}
                value={bar.noteValue}
                onChange={changeNoteValue}
              />
            </div>
          </div>
        </div>,
        document.querySelector('[data-popups]')!,
      )}
    </div>
  );
};

export default memo(BarActions);
