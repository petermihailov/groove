import { useState, useCallback, useEffect } from 'react';

type ThemeValue = 'dark' | 'light';

const storageKey = 'theme-preference';

const getColorPreference = (): ThemeValue => {
  if (localStorage.getItem(storageKey)) {
    return localStorage.getItem(storageKey) as ThemeValue;
  } else {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
};

export function useThemeSwitch() {
  const [theme, setTheme] = useState<ThemeValue>(getColorPreference);

  const toggleTheme = useCallback(() => setTheme(prev => prev === 'dark' ? 'light' : 'dark'), []);

  useEffect(() => {
    localStorage.setItem(storageKey, theme);
    document.firstElementChild.setAttribute('data-theme', theme);
  }, [theme]);

  // sync with system changes
  useEffect(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', ({ matches: isDark }) => {
        setTheme(isDark ? 'dark' : 'light');
      });
  }, []);

  return {
    theme,
    toggleTheme,
  };
}
