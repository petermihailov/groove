import { createUseStyles, rootVars, rootVarsDark, theme } from '../../styles';

export const useStyles = createUseStyles('App', {
  '@global': {
    ':root': rootVars,
    ':root[data-theme="dark"]': rootVarsDark,

    html: {
      fontSize: 20,
    },

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

  controlsWrapper: {
    position: 'sticky',
    bottom: 0,
    backgroundColor: theme.colorSurface1,
    boxShadow: theme.shadowSmallInvert,
  },

  controls: {
    maxWidth: '50rem',
  },
});
