import { createUseStyles, theme } from '../../../styles';

export const useStyles = createUseStyles('Pill', {
  root: {
    overflow: 'auto',
    display: 'flex',
    padding: [theme.spacingXSmall, theme.spacingMedium],
    backgroundColor: theme.colorSurface2,
    borderRadius: theme.radiusPill,
    boxShadow: theme.shadowMedium,

    '& > *': {
      flex: 'none',
    },

    '& > * + *': {
      marginLeft: theme.spacingXSmall,
    },
  },
});
