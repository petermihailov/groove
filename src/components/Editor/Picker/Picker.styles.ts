import { createUseStyles, theme } from '../../../styles';

export const useStyles = createUseStyles('Picker', {
  iconCenter: {
    '& svg': {
      transform: `translateY(-0.4rem)`,
    },
  },

  iconHhFoot: {
    '& svg': {
      transform: `translateY(0)`,
    },
  },

  selected: {
    position: 'relative',

    '&::before': {
      content: '""',
      position: 'absolute',
      left: 4,
      right: 4,
      bottom: -4,
      height: 4,
      backgroundColor: theme.colorAccent,
      borderRadius: theme.radiusPill,
    },
  },
});
