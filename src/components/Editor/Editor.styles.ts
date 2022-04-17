import { createUseStyles, theme } from '../../styles';

export const useStyles = createUseStyles('Editor', {
  root: {
    display: 'flex',
    overflow: 'auto',
    backgroundColor: theme.colorSurface2,
    boxShadow: theme.shadowXSmall,
    padding: [0, theme.sizeHorizontalPadding],
  },

  picker: {
    position: 'fixed',
    bottom: 0,
  },
});
