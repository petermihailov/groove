import { createUseStyles, theme } from '../../styles';

export const useStyles = createUseStyles('Editor', {
  root: {
    display: 'flex',
    overflow: 'auto',
    backgroundColor: theme.colorSurface2,
    boxShadow: theme.shadowSmall,
    padding: [0, theme.sizeHorizontalPadding],
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
