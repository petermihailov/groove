import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

import { useStyles } from './Select.styles';

export type SelectOption<T> = {
  value: T;
  label: string | number;
  customLabel?: ReactNode;
  disabled?: boolean;
};

export interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
  value?: string | number;
  onChange?: () => void;
  options: SelectOption<string | number>[];
}

export function Select({ className, value, onChange, options, ...props }: SelectProps) {
  const classes = useStyles();
  const selected = options.find((option) => option.value === value);

  return (
    <div className={clsx(className, classes.root)}>
      <select className={classes.selectNative} value={value} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div aria-hidden="true">{selected?.customLabel || selected?.label}</div>
    </div>
  );
}
