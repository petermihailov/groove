import clsx from 'clsx';

import type { CymbalState, Note as INote } from '../../../../types';
import type { NoteProps } from '../Note';
import { Note } from '../Note';

import { useStyles } from './NoteCymbal.styles';

interface NoteCymbalProps extends NoteProps, INote {
  note: CymbalState;
}

export function NoteCymbal({ className, note, dynamic }: NoteCymbalProps) {
  const classes = useStyles();

  return (
    <Note aria-label={`cymbal ${note}`} />
  );
}
