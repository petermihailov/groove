import { memo } from 'react';

import { Groups } from './Groups';
import { NotesIcons } from './Notes';
import { NotesDuration } from './NotesDuration';
import { UI } from './UI';

export const Sprite = memo(function Sprite() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ display: 'none' }}>
      <NotesIcons />
      <UI />
      <NotesDuration />
      <Groups />
    </svg>
  );
});
