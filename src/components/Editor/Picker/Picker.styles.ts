import { createUseStyles, theme } from '../../../styles';

export const useStyles = createUseStyles('Picker', {
  root: {
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    padding: [0, theme.sizeHorizontalPadding, theme.spacingLarge],
  },

  content: {
    display: 'flex',
    gap: theme.spacingXSmall,
    padding: [theme.spacingXSmall, theme.spacingMedium],
    backgroundColor: theme.colorSurface2,
    borderRadius: theme.radiusPill,
    boxShadow: theme.shadowMedium,
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
