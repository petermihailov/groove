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

  controls: {
    position: 'sticky',
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacingXSmall,
    padding: [theme.spacingMedium, theme.sizeHorizontalPadding],
    backgroundColor: theme.colorSurface1,
    boxShadow: theme.shadowSmallInvert,
  },

  bpm: {
    flex: 1,
  },
});
