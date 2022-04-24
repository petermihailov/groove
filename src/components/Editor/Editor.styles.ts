import { createUseStyles, theme } from '../../styles';

export const useStyles = createUseStyles('Editor', {
  root: {
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

  picker: {
    position: 'fixed',
    bottom: 0,
    transition: `transform ${theme.transitionSlow} ${theme.easeSquish5}`,
  },

  pickerHidden: {
    transform: 'translateY(100%)',
  },
});
