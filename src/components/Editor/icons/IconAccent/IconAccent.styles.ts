import { noteLineMixin } from '../../../../mixins/note';
import { createUseStyles } from '../../../../styles';

export const useStyles = createUseStyles('IconAccent', {
  accent: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '&::before': {
      content: '""',
      ...noteLineMixin,
      transform: 'translate(45%, 17%) rotate(67.5deg)',
    },

    '&::after': {
      content: '""',
      ...noteLineMixin,
      transform: 'translate(45%, -17%) rotate(-67.5deg)',
    },

    '$hhClose &, $hhOpen &': {
      top: '-30%',
    }
  },
});
