import { theme } from '../styles';

export const noteLineMixin = {
  position: 'absolute',
  width: theme.editorNoteThickness,
  height: '1rem',
  backgroundColor: 'currentcolor',
  borderRadius: theme.radiusSmall,
};
