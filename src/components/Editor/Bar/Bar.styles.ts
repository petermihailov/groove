import { createUseStyles, theme } from '../../../styles';

export const useStyles = createUseStyles('Bar', {
  root: {
    position: 'relative',
    display: 'grid',
    gridGap: theme.spacingNote,
    paddingRight: theme.spacingBars,
  },

  addButton: {
    position: 'absolute',
    top: `calc(50% - ${theme.sizeNote})`,
    right: theme.spacingXSmall,
    color: theme.colorAccent,
  },
});
