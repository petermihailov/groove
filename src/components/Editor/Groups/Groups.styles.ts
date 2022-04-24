import { createUseStyles, theme } from '../../../styles';

export const useStyles = createUseStyles('Groups', {
  root: {
    display: 'grid',
    alignItems: 'center',
    gridGap: theme.spacingNote,
    color: theme.colorAccent,
  },

  toBottom: {
    alignSelf: 'end',
  },

  foot: {
    userSelect: 'none',
    position: 'absolute',
    bottom: theme.spacingXxSmall,
    left: theme.sizeHorizontalPadding,
    width: theme.sizeIcon,
    height: theme.sizeIcon,
    fontSize: theme.fontSizeXxSmall,
    fontWeight: 'bold',
    lineHeight: theme.sizeIcon,
    textAlign: 'center',
  },
});
