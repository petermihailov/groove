export const commonResetMixin = {
  appearance: 'none',
  background: 'none',
  border: 'none',
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  userSelect: 'none',
};

export const buttonResetMixin = {
  ...commonResetMixin,
  cursor: 'pointer',
};
