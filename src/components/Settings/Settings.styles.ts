import { createUseStyles, theme } from '../../styles';

export const useStyles = createUseStyles('Settings', {
  root: {
    padding: [theme.spacingMedium, theme.sizeHorizontalPadding, theme.spacingXxLarge],
    textTransform: 'uppercase',
  },

  logo: {
    width: 50,
    position: 'absolute',
    left: theme.spacingMedium,
    bottom: theme.spacingMedium,
  },
});
