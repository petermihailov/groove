import { createUseStyles, theme } from '../../../styles';

export const useStyles = createUseStyles('Groups', {
  root: {
    display: 'grid',
    alignItems: 'center',
    gridGap: theme.spacingNote,
    color: theme.colorAccent,
  },

  toBottom: {
    alignSelf: 'end',
  },
});
