import clsx from 'clsx';

import type { HatState, Note as INote } from '../../../../types';
import type { NoteProps } from '../Note';
import { Note } from '../Note';

import { useStyles } from './NoteHat.styles';

interface NoteHatProps extends NoteProps, INote {
  note: HatState;
}

export function NoteHat({ className, note, dynamic }: NoteHatProps) {
  const classes = useStyles();

  return (
    <Note aria-label={`hi-hat ${note}`} />
  );
}
