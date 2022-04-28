import { createUseStyles, theme } from '../../styles';

export const useStyles = createUseStyles('Editor', {
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    overflow: 'auto',
    paddingRight: theme.sizeHorizontalPadding,
    paddingTop: theme.spacingXSmall,
    paddingBottom: theme.spacingBarBottom,
    backgroundColor: theme.colorSurface2,
  },

  groups: {
    position: 'sticky',
    left: 0,
    zIndex: 1,
    flex: 'none',
    marginRight: theme.spacingSmall,
    paddingLeft: theme.sizeHorizontalPadding,
    paddingRight: theme.spacingSmall,
    paddingBottom: 0,

    '&::before': {
      content: '""',
      zIndex: -1,
      position: 'absolute',
      top: `calc(-1 * ${theme.spacingXSmall})`,
      bottom: `calc(-1 * ${theme.spacingBarBottom})`,
      left: 0,
      width: '100%',
      backgroundColor: theme.colorHighlight,
      backdropFilter: 'blur(20px)',
      boxShadow: theme.shadowSmall,
    },
  },

  highlight: {
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    width: theme.sizeNote,
    height: '100%',
    backgroundColor: theme.colorHighlight,
  },

  pickerWrapper: {
    position: 'fixed',
    bottom: theme.spacingLarge,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    transition: `transform ${theme.transitionSlow} ${theme.easeSquish5}`,
  },

  pickerHidden: {
    transform: `translateY(calc(100% + ${theme.spacingLarge}))`,
  },

  picker: {
    maxWidth: `calc(100% - 2 * ${theme.sizeHorizontalPadding})`,
  },
});
