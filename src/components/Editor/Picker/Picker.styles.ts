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
    backgroundColor: theme.colorHighlight,
  },
});
