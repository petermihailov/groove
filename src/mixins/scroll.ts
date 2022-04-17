export const disableScrollbarMixin = {
  scrollbarWidth: 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
};

export const scrollingMixin = {
  overflow: 'auto',
  WebkitOverflowScrolling: 'touch',
};
