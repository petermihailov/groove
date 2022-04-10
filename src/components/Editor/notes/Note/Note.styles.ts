import { buttonResetMixin } from '../../../../mixins';
import { createUseStyles, theme } from '../../../../styles';

const cssLine = {
  position: 'absolute',
  width: theme.editorNoteThickness,
  height: '1rem',
  backgroundColor: 'currentcolor',
  borderRadius: theme.radiusSmall,
};

export const useStyles = createUseStyles('Note', {
  root: {
    ...buttonResetMixin,
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
    border: `${theme.editorNoteThickness} solid currentColor`,
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
});
