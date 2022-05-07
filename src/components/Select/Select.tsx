import clsx from 'clsx';
import type { ChangeEventHandler, HTMLAttributes, ReactNode } from 'react';

import { useStyles } from './Select.styles';

export type SelectOption<T> = {
  value: T;
  label: string | number;
  customLabel?: ReactNode;
  disabled?: boolean;
};

export interface SelectProps<T> extends Omit<HTMLAttributes<HTMLSelectElement>, 'onChange'> {
  value?: T;
  options: SelectOption<T>[];
  onChange?: (value: T) => void;
}

export function Select<T>({ className, value, options, onChange, ...props }: SelectProps<T>) {
  const classes = useStyles();
  const selectedIndex = options.findIndex((option) => option.value === value);

  const changeHandler: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const option = options[Number(e.target.value)];
    onChange?.(option.value);
  };

  return (
    <div className={clsx(className, classes.root)}>
      <select
        className={classes.selectNative}
        value={selectedIndex}
        onChange={changeHandler}
        {...props}
      >
        {options.map((option, idx) => (
          <option key={idx} value={idx}>
            {option.label}
          </option>
        ))}
      </select>

      <div aria-hidden="true">
        {options[selectedIndex]?.customLabel || options[selectedIndex]?.label}
      </div>
    </div>
  );
}
