import { createUseStyles, theme } from '../../styles';

export const useStyles = createUseStyles('ButtonIcon', {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    padding: 0,
    inlineSize: theme.sizeControl,
    blockSize: theme.sizeControl,
    borderRadius: theme.radiusCircle,
    outlineOffset: 5,
    color: theme.colorIcon,
    cursor: 'pointer',
    userSelect: 'none',

    '& > svg': {
      blockSize: '100%',
      inlineSize: '100%',
    },

    '&[disabled]': {
      opacity: 0.48,
    },
  },

  active: {
    color: theme.colorAccent,
  },
});
