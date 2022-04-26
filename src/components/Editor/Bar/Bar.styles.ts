import { createUseStyles, theme } from '../../../styles';

export const useStyles = createUseStyles('Bar', {
  root: {
    position: 'relative',
    display: 'grid',
    gridGap: theme.spacingNote,
  },
});
