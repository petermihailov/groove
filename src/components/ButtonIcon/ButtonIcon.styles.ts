import { createUseStyles, theme } from '../../styles';

export const useStyles = createUseStyles('ButtonIcon', {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    padding: 0,
    inlineSize: theme.sizeIcon,
    blockSize: theme.sizeIcon,
    aspectRatio: 1,
    borderRadius: theme.radiusCircle,
    outlineOffset: 5,
    color: theme.colorIcon,
    cursor: 'pointer',
    userSelect: 'none',

    '& > svg': {
      blockSize: '100%',
      inlineSize: '100%',
    },
  },

  active: {
    color: theme.colorAccent,
  },
});
