import { createUseStyles, theme } from '../../../styles';

export const useStyles = createUseStyles('TimeSignature', {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacingXSmall,
  },

  list: {
    display: 'flex',
    gap: theme.spacingXSmall,
  },
});
