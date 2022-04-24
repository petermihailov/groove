import { createUseStyles, theme } from '../../../styles';

export const useStyles = createUseStyles('Groups', {
  root: {
    display: 'grid',
    alignItems: 'center',
    gridGap: theme.spacingNote,
    paddingTop: theme.spacingMedium,
    paddingBottom: theme.spacingXxxLarge,
    color: theme.colorAccent,
  },

  toBottom: {
    alignSelf: 'end',
  },
});
