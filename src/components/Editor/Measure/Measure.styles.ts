import { createUseStyles, theme } from '../../../styles';

export const useStyles = createUseStyles('Measure', {
  root: {
    position: 'relative',
    display: 'grid',
    gridGap: theme.spacingNote,
    paddingTop: theme.spacingMedium,
    paddingBottom: theme.spacingMedium,
  },

  highlight: {
    pointerEvents: 'none',
    opacity: 0.25,
    position: 'absolute',
    width: theme.sizeNote,
    height: '100%',
    backgroundColor: theme.colorHighlight,
  },
});
