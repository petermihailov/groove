import { memo } from 'react';

import type { Player } from '../../lib/Player';

import { useStyles } from './Editor.styles';

type EditorProps = {
  player: Player | null;
};

export const Editor = memo(function Editor({ player }: EditorProps) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>Editor</div>
    </>
  );
});
