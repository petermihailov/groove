import { memo, useEffect, useRef } from 'react';

import { grooveDefault } from '../../constants';
import { Kit } from '../../lib/Kit';
import { Player } from '../../lib/Player';
import { createGrooveFromString } from '../../utils';
import { Measure } from './Measure/Measure';

import { useStyles } from './Editor.styles';

type EditorProps = {
  playing: boolean;
  tempo: number;
};

const groove1 = createGrooveFromString(grooveDefault);

export const Editor = memo(function Editor({ playing, tempo }: EditorProps) {
  const classes = useStyles();

  const player = useRef<Player>(null);

  const handleBeat = (measureIndex: number, rhythmIndex: number) => {
    console.log(measureIndex, rhythmIndex);
  };

  /* createPlayer */
  useEffect(() => {
    if (!player.current) {
      const audioCtx = new AudioContext();
      const kit = new Kit(audioCtx);
      player.current = new Player(audioCtx, kit, groove1, handleBeat);
    }
  }, []);

  /* handle playing */
  useEffect(() => {
    if (player.current) {
      if (playing) {
        player.current.play();
      } else {
        player.current.stop();
      }
    }
  }, [playing]);

  /* handle tempo */
  useEffect(() => {
    player.current.setTempo(tempo);
  }, [tempo]);

  return (
    <>
      <div className={classes.root}>{/*<Measure measure={defaultBeat[0]} />*/}</div>
    </>
  );
});
