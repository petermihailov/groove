import { createUseStyles, theme } from '../../../styles';

export const useStyles = createUseStyles('Bar', {
  root: {
    position: 'relative',
    display: 'grid',
    gridGap: theme.spacingNote,
  },

  highlight: {
    pointerEvents: 'none',
    position: 'absolute',
    width: theme.sizeNote,
    height: '100%',
    backgroundColor: theme.colorHighlight,
  },
});
