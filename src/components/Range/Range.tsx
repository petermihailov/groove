import clsx from 'clsx';
import type {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLAttributes,
  KeyboardEventHandler,
  ReactNode,
} from 'react';
import { useEffect, useRef } from 'react';

import classes from './Range.css';

const rangeToPercent = (value: number, min: number, max: number) => {
  const percent = value / (max - min) - min / (max - min);
  return `${percent * 100}%`;
};

export interface RangeProps extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: ReactNode;
  min?: number;
  max?: number;
  value: number;
  onChange: (value: number) => void;
}

const Range = ({ className, label, min = 0, max = 100, value, onChange, ...restInputProps }: RangeProps) => {
  const decimalRef = useRef<HTMLInputElement>(null);
  const rangeRef = useRef<HTMLInputElement>(null);

  const handleTrackChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const val = Math.min(Number(e.target.value), max);
    if (!Number.isNaN(val)) {
      onChange(Math.max(min, val));
    }
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    e.target.setSelectionRange(0, 3);
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value === '') {
      e.target.value = String(value);
      return;
    }

    const val = Math.min(max, Math.max(min, Number(e.target.value)));
    if (!Number.isNaN(val)) {
      onChange(val);
    }
  };

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
  };

  useEffect(() => {
    rangeRef.current?.style.setProperty('--track-fill', rangeToPercent(value, min, max));
    if (decimalRef.current?.value) {
      decimalRef.current.value = String(value);
    }
  }, [value, min, max]);

  return (
    <label className={clsx(className, classes.root)}>
      {label && (
        <div className={classes.label}>
          {label}
          <input
            ref={decimalRef}
            className={classes.inputDecimal}
            defaultValue={value}
            inputMode="decimal"
            max={max}
            min={0}
            type="text"
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyDown={handleKeyPress}
          />
        </div>
      )}
      <input
        ref={rangeRef}
        className={classes.input}
        max={max}
        min={min}
        type="range"
        value={String(value)}
        onChange={handleTrackChange}
        {...restInputProps}
      />
    </label>
  );
};

export default Range;
