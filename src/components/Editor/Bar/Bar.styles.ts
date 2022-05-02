import { createUseStyles, theme } from '../../../styles';

export const useStyles = createUseStyles('Bar', {
  root: {
    position: 'relative',
    display: 'grid',
    gridGap: theme.spacingNote,

    '& + &': {
      marginLeft: theme.spacingBars,

      '&::before': {
        content: '""',
        position: 'absolute',
        left: `calc(-1 * ${theme.spacingBars} / 2)`,
        width: 2,
        top: theme.spacingMedium,
        bottom: theme.spacingMedium,
        borderRadius: theme.radiusPill,
        backgroundColor: theme.colorBorder,
      },
    },
  },

  actions: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    transform: `translateY(calc(100% + ${theme.spacingBarBottom}))`,
  },

  actionButton: {
    width: '100%',
    backgroundColor: theme.colorTint,
    borderRadius: theme.radiusSmall,

    '&:active': {
      color: theme.colorAccent,
    },
  },

  actionBar: {
    position: 'absolute',
    left: '50%',
    bottom: `calc(100% + ${theme.spacingSmall})`,
    transform: 'translateX(-50%) scale(0.8)',
    fontSize: theme.fontSizeLarge,
    fontWeight: theme.fontWeightBold,
    color: theme.colorAccent,
    transitionProperty: 'transform, opacity',
    transitionDuration: theme.transitionFast,
    transitionTimingFunction: theme.easeElastic2,
  },

  actionsBarHidden: {
    pointerEvents: 'none',
    opacity: 0,
    transform: `translateX(-50%) scale(0.8) translateY(50%)`,
  },

  timeSignature: {
    position: 'relative',
    marginLeft: theme.spacingXSmall,
    paddingLeft: theme.spacingXSmall,
    color: theme.colorText,

    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      width: 2,
      height: '50%',
      borderRadius: theme.radiusPill,
      backgroundColor: theme.colorBorder,
    },
  },
});
