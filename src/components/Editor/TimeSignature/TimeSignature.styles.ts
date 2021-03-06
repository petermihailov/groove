import { createUseStyles, theme } from '../../../styles';

export const useStyles = createUseStyles('TimeSignature', {
  root: {
    display: 'flex',
    alignItems: 'center',

    '& > *': {
      flex: 'none',
    },

    '& > * + *': {
      marginLeft: theme.spacingXSmall,
    },
  },
});
