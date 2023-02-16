import clsx from 'clsx';
import { memo } from 'react';

import { useThemeSwitch } from './useThemeSwitch';
import type { ButtonIconProps } from '../ButtonIcon';
import { ButtonIcon } from '../ButtonIcon';

import classes from './ThemeSwitcher.module.css';

export type ThemeSwitcherProps = Omit<ButtonIconProps, 'aria-label'>;

const ThemeSwitcher = ({ className, ...restProps }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useThemeSwitch();

  return (
    <ButtonIcon
      aria-label={`switch to ${theme === 'dark' ? 'light' : 'dark'}`}
      className={clsx(className, { [classes.isDark]: theme === 'dark' })}
      onClick={toggleTheme}
      {...restProps}
    >
      <svg
        aria-hidden="true"
        className={classes.sunAndMoon}
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <mask className={classes.moon} id="moon-mask">
          <rect fill="white" height="100%" width="100%" x="0" y="0" />
          <circle cx="24" cy="10" fill="black" r="6" />
        </mask>
        <circle
          className={classes.sun}
          cx="12"
          cy="12"
          fill="currentColor"
          mask="url(#moon-mask)"
          r="6"
        />
        <g className={classes.sunBeams} stroke="currentColor">
          <line x1="12" x2="12" y1="1" y2="3" />
          <line x1="12" x2="12" y1="21" y2="23" />
          <line x1="4.22" x2="5.64" y1="4.22" y2="5.64" />
          <line x1="18.36" x2="19.78" y1="18.36" y2="19.78" />
          <line x1="1" x2="3" y1="12" y2="12" />
          <line x1="21" x2="23" y1="12" y2="12" />
          <line x1="4.22" x2="5.64" y1="19.78" y2="18.36" />
          <line x1="18.36" x2="19.78" y1="5.64" y2="4.22" />
        </g>
      </svg>
    </ButtonIcon>
  );
};

export default memo(ThemeSwitcher);
