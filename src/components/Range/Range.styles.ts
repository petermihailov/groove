import { createUseStyles, theme, Media } from '../../styles';

const trackStyles = {
  appearance: 'none',
  blockSize: 'var(--track-height)',
  borderRadius: '5ex',
  background: `linear-gradient(to right, transparent var(--track-fill), ${theme.colorBorder} 0%), linear-gradient( to bottom, ${theme.colorAccent}, transparent ) fixed`,
};

const thumbStyles = {
  appearance: 'none',
  cursor: 'ew-resize',
  border: `3px solid ${theme.colorSurface1}`,
  blockSize: 'var(--thumb-size)',
  inlineSize: 'var(--thumb-size)',
  marginBlockStart: 'var(--thumb-offset)',
  borderRadius: theme.radiusCircle,
  backgroundColor: theme.colorAccent,
  boxShadow: `0 0 0 var(--thumb-highlight-size) ${theme.colorThumbHighlight}`,
  transition: 'box-shadow .1s ease',
};

export const useStyles = createUseStyles('Range', {
  inputStack: {
    display: 'grid',
    gap: theme.spacingSmall,
    gridTemplateColumns: 'auto 1fr',
    fontWeight: theme.fontWeightBold,
    cursor: 'pointer',
  },

  input: {
    '--track-height': '0.5ex',
    '--track-fill': '0%',
    '--thumb-size': '3ex',
    '--thumb-offset': '-1.25ex',
    '--thumb-highlight-size': '0px',
    display: 'block',
    width: '100%',
    appearance: 'none',
    background: '0 0',
    outlineOffset: 5,

    '&::-webkit-slider-runnable-track': trackStyles,
    '&::-moz-range-track': trackStyles,

    '&::-webkit-slider-thumb': thumbStyles,
    '&::-moz-range-thumb': thumbStyles,

    '&:is(:hover,:active)': {
      '--thumb-highlight-size': '10px',
    },
  },

  inputDecimal: {
    appearance: 'none',
    background: '0 0',
    outlineOffset: 5,
    border: 'none',
    padding: 0,
    width: '3ch',
    textAlign: 'center',
  },

  label: {
    userSelect: 'none',
    display: 'grid',
    gap: theme.spacingSmall,
    gridTemplateColumns: 'auto auto',
  },

  [Media.WithoutHover]: {
    input: {
      '--thumb-size': '30px',
      '--thumb-offset': '-14px',
    },
  },
});
