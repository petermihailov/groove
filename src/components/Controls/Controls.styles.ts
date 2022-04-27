import { createUseStyles, theme } from '../../styles';

export const useStyles = createUseStyles('Controls', {
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacingXSmall,
    padding: [theme.spacingMedium, theme.sizeHorizontalPadding],
  },

  bpm: {
    flex: 1,
  },
});
