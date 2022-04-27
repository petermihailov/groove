export const colors = {
  colorAccent: '#05f',
  colorHighlight: 'rgba(0, 85, 255, 0.1)',
  colorBorder: '#d9d9e8',
  colorDrawer: '#f9fbff',
  colorIcon: '#171a1c',
  colorOverlay: 'rgba(0, 0, 0, 0.2)',
  colorSurface1: '#f9fbff',
  colorSurface2: '#fff',
  colorText: '#171a1c',
  colorThumbHighlight: 'rgba(0, 0, 0, 0.2)',
} as const;

export const typography = {
  fontFamilySans: 'system-ui, sans-serif',
  fontSizeXxSmall: '0.625rem',
  fontSizeXSmall: '0.75rem',
  fontSizeSmall: '0.875rem',
  fontSizeMedium: '1rem',
  fontSizeLarge: '1.25rem',
  fontSizeXLarge: '1.5rem',
  fontSizeXxLarge: '2.25rem',
  fontSizeXxxLarge: '3rem',
  fontSizeXxxxLarge: '4.5rem',
  fontWeightLight: '300',
  fontWeightNormal: '400',
  fontWeightSemibold: '500',
  fontWeightBold: '700',
  letterSpacingDense: '-0.015em',
  letterSpacingNormal: 'normal',
  letterSpacingLoose: '0.075em',
  lineHeightDense: '1.4',
  lineHeightNormal: '1.8',
  lineHeightLoose: '2.2',
} as const;

export const spacing = {
  spacingXxxSmall: '0.125rem',
  spacingXxSmall: '0.25rem',
  spacingXSmall: '0.5rem',
  spacingSmall: '0.75rem',
  spacingMedium: '1rem',
  spacingLarge: '1.25rem',
  spacingXLarge: '1.75rem',
  spacingXxLarge: '2.25rem',
  spacingXxxLarge: '3rem',
  spacingXxxxLarge: '4.5rem',
  spacingNote: '0.25rem',
  spacingBars: '3rem',
} as const;

export const sizes = {
  sizeHorizontalPadding: spacing.spacingMedium,
  sizeIcon: '2rem',
  sizeNote: '2rem',
};

export const shadow = {
  shadowSmall:
    '0.3px 0.5px 0.7px rgba(0, 0, 0, 0.1),' +
    '0.4px 0.8px 1px -1.2px rgba(0, 0, 0, 0.1),' +
    '1px 2px 2.5px -2.5px rgba(0, 0, 0, 0.1)',
  shadowMedium:
    '0.3px 0.5px 0.7px rgba(0, 0, 0, 0.11),' +
    '0.8px 1.6px 2px -0.8px rgba(0, 0, 0, 0.11),' +
    '2.1px 4.1px 5.2px -1.7px rgba(0, 0, 0, 0.11),' +
    '5px 10px 12.6px -2.5px rgba(0, 0, 0, 0.11)',
  shadowLarge:
    '0.3px 0.5px 0.7px rgba(0, 0, 0, 0.1),' +
    '1.5px 2.9px 3.7px -0.4px rgba(0, 0, 0, 0.1),' +
    '2.7px 5.4px 6.8px -0.7px rgba(0, 0, 0, 0.1),' +
    '4.5px 8.9px 11.2px -1.1px rgba(0, 0, 0, 0.1),' +
    '7.1px 14.3px 18px -1.4px rgba(0, 0, 0, 0.1),' +
    '11.2px 22.3px 28.1px -1.8px rgba(0, 0, 0, 0.1),' +
    '17px 33.9px 42.7px -2.1px rgba(0, 0, 0, 0.1),' +
    '25px 50px 62.9px -2.5px rgba(0, 0, 0, 0.1)',
  shadowSmallInvert:
    '-0.3px -0.5px 0.7px rgba(0, 0, 0, 0.1),' +
    '-0.4px -0.8px 1px -1.2px rgba(0, 0, 0, 0.1),' +
    '-1px -2px 2.5px -2.5px rgba(0, 0, 0, 0.1)',
  shadowMediumInvert:
    '0.3px 0.5px 0.7px rgba(0, 0, 0, 0.11),' +
    '0.8px 1.6px 2px -0.8px rgba(0, 0, 0, 0.11),' +
    '2.1px 4.1px 5.2px -1.7px rgba(0, 0, 0, 0.11),' +
    '5px 10px 12.6px -2.5px rgba(0, 0, 0, 0.11)',
  shadowLargeInvert:
    '0.3px 0.5px 0.7px rgba(0, 0, 0, 0.1),' +
    '1.5px 2.9px 3.7px -0.4px rgba(0, 0, 0, 0.1),' +
    '2.7px 5.4px 6.8px -0.7px rgba(0, 0, 0, 0.1),' +
    '4.5px 8.9px 11.2px -1.1px rgba(0, 0, 0, 0.1),' +
    '7.1px 14.3px 18px -1.4px rgba(0, 0, 0, 0.1),' +
    '11.2px 22.3px 28.1px -1.8px rgba(0, 0, 0, 0.1),' +
    '17px 33.9px 42.7px -2.1px rgba(0, 0, 0, 0.1),' +
    '25px 50px 62.9px -2.5px rgba(0, 0, 0, 0.1)',
} as const;

export const radius = {
  radiusSmall: '0.125rem',
  radiusMedium: '0.25rem',
  radiusLarge: '0.5rem',
  radiusXLarge: '1rem',
  radiusCircle: '50%',
  radiusPill: '9999px',
} as const;

export const easing = {
  ease1: 'cubic-bezier(.25,0,.5,1)',
  ease2: 'cubic-bezier(.25,0,.4,1)',
  ease3: 'cubic-bezier(.25,0,.3,1)',
  ease4: 'cubic-bezier(.25,0,.2,1)',
  ease5: 'cubic-bezier(.25,0,.1,1)',
  easeIn1: 'cubic-bezier(.25,0,1,1)',
  easeIn2: 'cubic-bezier(.50,0,1,1)',
  easeIn3: 'cubic-bezier(.70,0,1,1)',
  easeIn4: 'cubic-bezier(.90,0,1,1)',
  easeIn5: 'cubic-bezier(1,0,1,1)',
  easeOut1: 'cubic-bezier(0,0,.75,1)',
  easeOut2: 'cubic-bezier(0,0,.50,1)',
  easeOut3: 'cubic-bezier(0,0,.3,1)',
  easeOut4: 'cubic-bezier(0,0,.1,1)',
  easeOut5: 'cubic-bezier(0,0,0,1)',
  easeInOut1: 'cubic-bezier(.1,0,.9,1)',
  easeInOut2: 'cubic-bezier(.3,0,.7,1)',
  easeInOut3: 'cubic-bezier(.5,0,.5,1)',
  easeInOut4: 'cubic-bezier(.7,0,.3,1)',
  easeInOut5: 'cubic-bezier(.9,0,.1,1)',
  easeElastic1: 'cubic-bezier(.5,.75,.75,1.25)',
  easeElastic2: 'cubic-bezier(.5,1,.75,1.25)',
  easeElastic3: 'cubic-bezier(.5,1.25,.75,1.25)',
  easeElastic4: 'cubic-bezier(.5,1.5,.75,1.25)',
  easeElastic5: 'cubic-bezier(.5,1.75,.75,1.25)',
  easeSquish1: 'cubic-bezier(.5,-.1,.1,1.5)',
  easeSquish2: 'cubic-bezier(.5,-.3,.1,1.5)',
  easeSquish3: 'cubic-bezier(.5,-.5,.1,1.5)',
  easeSquish4: 'cubic-bezier(.5,-.7,.1,1.5)',
  easeSquish5: 'cubic-bezier(.5,-.9,.1,1.5)',
  easeStep1: 'steps(2)',
  easeStep2: 'steps(3)',
  easeStep3: 'steps(4)',
  easeStep4: 'steps(7)',
  easeStep5: 'steps(10)',
} as const;

export const transition = {
  transitionXSlow: '1000ms',
  transitionSlow: '500ms',
  transitionMedium: '250ms',
  transitionFast: '150ms',
  transitionXFast: '50ms',
} as const;

export const zIndex = {
  zIndexDrawer: 700,
  zIndexDialog: 800,
  zIndexDropdown: 900,
  zIndexTooltip: 1000,
} as const;
