import { createUseStyles, theme } from '../../../styles';

export const useStyles = createUseStyles('TimeSignature', {
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacingXSmall,

    '& > *': {
      flex: 'none',
    },
  },
});
