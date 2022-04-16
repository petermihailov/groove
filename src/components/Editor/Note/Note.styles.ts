import { createUseStyles, theme } from '../../../styles';

export const useStyles = createUseStyles('Note', {
  root: {
    width: theme.sizeNote,
    height: theme.sizeNote,
    transition: `opacity ${theme.transitionXFast} ${theme.easeOut1}`,
  },

  empty: {
    'opacity': 0.15,

    '&:hover': {
      opacity: 0.5,
    },
  },
});
