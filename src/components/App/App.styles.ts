import { createUseStyles, rootVars, rootVarsDark, theme } from '../../styles';

export const useStyles = createUseStyles('App', {
  '@global': {
    ':root': rootVars,
    ':root[data-theme="dark"]': rootVarsDark,

    body: {
      userSelect: 'none',
      fontFamily: theme.fontFamilySans,
      fontSize: theme.fontSizeMedium,
      color: theme.colorText,
      backgroundColor: theme.colorSurface1,
      transitionProperty: 'color',
      transitionTimingFunction: theme.easeOut3,
      transitionDuration: theme.transitionFast,
    },
  },
});
