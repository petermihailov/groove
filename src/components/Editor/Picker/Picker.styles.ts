import { createUseStyles, theme } from '../../../styles';

export const useStyles = createUseStyles('Picker', {
  root: {
    overflow: 'auto',
    display: 'flex',
    gap: theme.spacingXSmall,
    padding: [theme.spacingXSmall, theme.spacingMedium],
    backgroundColor: theme.colorSurface2,
    borderRadius: theme.radiusPill,
    boxShadow: theme.shadowMedium,
  },

  content: {
    display: 'flex',
    padding: [theme.spacingXSmall, theme.spacingMedium],
  },

  iconCenter: {
    '& svg': {
      transform: `translateY(-0.3rem)`,
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
