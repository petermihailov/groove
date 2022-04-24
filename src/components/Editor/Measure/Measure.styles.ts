import { createUseStyles, theme } from '../../../styles';

export const useStyles = createUseStyles('Measure', {
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
