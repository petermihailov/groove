import { createUseStyles } from '../../styles';

export const useStyles = createUseStyles('Select', {
  root: {
    position: 'relative',
    overflow: 'hidden',
  },

  selectNative: {
    opacity: 0,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
