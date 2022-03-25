import { makeSyles, theme } from '../../styles';

export const useStyles = makeSyles('ButtonIcon', {
  root: {
    '--size': '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    padding: 0,
    inlineSize: 'var(--size)',
    blockSize: 'var(--size)',
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
