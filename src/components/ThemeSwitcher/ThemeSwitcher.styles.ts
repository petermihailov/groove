import { createUseStyles, theme } from '../../styles';

export const useStyles = createUseStyles('ThemeSwitcher', {
  '@global': {
    html: {
      'colorScheme': 'light',

      '&[data-theme="dark"]': {
        colorScheme: 'dark',
      },
    },
  },

  'sunAndMoon': {
    strokeLinecap: 'round',
  },

  'moon': {
    'fill': 'currentcolor',

    '& circle': {
      transformOrigin: 'center center',
      transition: `transform ${theme.transitionMedium} ${theme.easeOut5}`,
    },
  },

  'sun': {
    fill: 'currentcolor',
    transformOrigin: 'center center',
    transition: `transform ${theme.transitionSlow} ${theme.easeElastic3}`,
  },

  'sunBeams': {
    stroke: 'currentcolor',
    strokeWidth: 2,
    transformOrigin: 'center center',
    transition: `transform ${theme.transitionSlow} ${theme.easeElastic4}, opacity ${theme.transitionSlow} ${theme.ease3}`,
  },

  'isDark': {
    '& $sun': {
      transform: 'scale(1.75)',
      transitionTimingFunction: theme.ease3,
      transitionDuration: theme.transitionMedium,
    },

    '& $sunBeams': {
      opacity: 0,
      transform: 'rotateZ(-25deg)',
      transitionDuration: theme.transitionFast,
    },

    '& $moon circle': {
      transform: 'translateX(-7px)',
      transitionDelay: theme.transitionMedium,
      transitionDuration: theme.transitionSlow,
    },
  },
});
