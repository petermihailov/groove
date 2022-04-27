import { createUseStyles, theme } from '../../styles';

export const useStyles = createUseStyles('Editor', {
  root: {
    position: 'relative',
    display: 'flex',
    overflow: 'auto',
    backgroundColor: theme.colorSurface2,
    paddingRight: theme.sizeHorizontalPadding,
  },

  groups: {
    position: 'sticky',
    left: 0,
    zIndex: 1,
    flex: 'none',
    marginRight: theme.spacingSmall,
    paddingLeft: theme.sizeHorizontalPadding,
    paddingRight: theme.spacingSmall,
    backgroundColor: theme.colorHighlight,
    backdropFilter: 'blur(20px)',
    boxShadow: theme.shadowSmall,
  },

  item: {
    paddingTop: theme.spacingXSmall,
    paddingBottom: `calc(${theme.sizeNote} + ${theme.spacingNote})`,
  },

  highlight: {
    pointerEvents: 'none',
    position: 'absolute',
    width: theme.sizeNote,
    height: '100%',
    backgroundColor: theme.colorHighlight,
  },

  picker: {
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
});
