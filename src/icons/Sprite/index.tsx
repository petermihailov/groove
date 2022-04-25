import { memo } from 'react';

import { Groups } from './Groups';
import { NotesIcons } from './Notes';
import { NotesDuration } from './NotesDuration';
import { UI } from './UI';

export const Sprite = memo(function Sprite() {
  return (
    <svg fill="none" height="24" style={{ display: 'none' }} viewBox="0 0 24 24" width="24">
      <NotesIcons />
      <UI />
      <NotesDuration />
      <Groups />
    </svg>
  );
});
