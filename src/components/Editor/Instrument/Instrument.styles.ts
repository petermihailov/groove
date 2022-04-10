import { createUseStyles, theme } from '../../../styles';

const cssLine = {
  position: 'absolute',
  width: '3px',
  height: '1rem',
  backgroundColor: 'currentcolor',
  borderRadius: theme.radiusSmall,
};

export const useStyles = createUseStyles('Instrument', {
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2rem',
    height: '2rem',
  },

  note: {
    position: 'absolute',
    width: '1.8rem',
    height: '1.8rem',
    border: '3px solid currentColor',
    borderRadius: theme.radiusCircle,
  },

  regular: {
    backgroundColor: 'currentColor',
  },

  accent: {
    'position': 'absolute',
    'display': 'flex',
    'alignItems': 'center',
    'justifyContent': 'center',

    '&::before': {
      content: '""',
      ...cssLine,
      transform: 'translate(45%, 17%) rotate(67.5deg)',
    },

    '&::after': {
      content: '""',
      ...cssLine,
      transform: 'translate(45%, -17%) rotate(-67.5deg)',
    },

    '$hhClose &, $hhOpen &': {
      top: '-30%',
    },
  },

  /* hats */

  hhClose: {
    '&::before': {
      content: '""',
      ...cssLine,
      transform: 'rotate(45deg)',
    },

    '&::after': {
      content: '""',
      ...cssLine,
      transform: 'rotate(-45deg)',
    },
  },

  hhOpen: {
    '& $note': {
      width: '1rem',
      height: '1rem',
    },
  },

  /* snare */
});
