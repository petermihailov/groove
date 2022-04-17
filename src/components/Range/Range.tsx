import clsx from 'clsx';
import type {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLAttributes,
  KeyboardEventHandler,
  ReactNode,
} from 'react';
import { memo, useEffect, useRef } from 'react';

import { useStyles } from './Range.styles';

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

export const Range = memo(function Range({
  className,
  label,
  min = 0,
  max = 100,
  value,
  onChange,
  ...props
}: RangeProps) {
  const classes = useStyles();
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
    <label className={clsx(className, classes.inputStack)}>
      {label && (
        <div className={classes.label}>
          {label}
          <input
            ref={decimalRef}
            className={classes.inputDecimal}
            type="text"
            inputMode="decimal"
            min={0}
            max={max}
            defaultValue={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyPress}
          />
        </div>
      )}
      <input
        ref={rangeRef}
        className={classes.input}
        type="range"
        min={min}
        max={max}
        value={String(value)}
        onChange={handleTrackChange}
        {...props}
      />
    </label>
  );
});
