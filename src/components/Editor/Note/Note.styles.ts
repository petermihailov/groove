import { createUseStyles, theme } from '../../../styles';

export const useStyles = createUseStyles('Note', {
  root: {
    width: theme.sizeNote,
    height: theme.sizeNote,
    transition: `opacity ${theme.transitionXFast} ${theme.easeOut1}`,
  },

  empty: {
    opacity: 0.15,

    '&:active': {
      opacity: 0.5,
    },
  },

  emptyCymbal: {
    transform: 'scale(0.5)',
    transformOrigin: 'bottom',
  },
});
