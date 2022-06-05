import { createUseStyles, theme } from '../../styles';

export const useStyles = createUseStyles('Controls', {
  root: {
    display: 'grid',
    gridTemplateColumns: `${theme.sizeIcon} ${theme.sizeIcon} auto ${theme.sizeIcon} ${theme.sizeIcon}`,
    alignItems: 'center',
    gridGap: theme.spacingXSmall,
    padding: [theme.spacingMedium, theme.sizeHorizontalPadding],
  },

  bpm: {
    flex: 1,
  },
});
