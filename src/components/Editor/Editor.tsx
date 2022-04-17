import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { grooveDefault } from '../../constants';
import { useForceUpdate } from '../../hooks';
import type { Groove } from '../../lib/Groove';
import { Kit } from '../../lib/Kit';
import { Player } from '../../lib/Player';
import type { MouseEventHandler } from '../../types';
import { createGrooveFromString, defaultGroupNoteMap, isInstrumentGroup } from '../../utils';
import { Measure } from './Measure';
import { Picker } from './Picker';

import { useStyles } from './Editor.styles';

type EditorProps = {
  playing: boolean;
  tempo: number;
};

const groove1 = createGrooveFromString(grooveDefault);

export const Editor = memo(function Editor({ playing, tempo }: EditorProps) {
  const classes = useStyles();
  const { forceUpdate } = useForceUpdate();

  const player = useRef<Player>(null);
  const groove = useRef<Groove>(groove1);

  const [playingBeat, setPlayingBeat] = useState({ measureIndex: null, rhythmIndex: null });

  const handleBeat = (measureIndex: number, rhythmIndex: number) => {
    setPlayingBeat({
      measureIndex,
      rhythmIndex,
    });
  };

  const handleEdit: MouseEventHandler<HTMLDivElement> = useCallback(
    ({ currentTarget, target }) => {
      const noteElement = target.closest('button');
      const { index, instrument, group } = noteElement.dataset;

      const measureIndex = Number(currentTarget.dataset.index);
      const rhythmIndex = Number(index);

      if (isInstrumentGroup(group)) {
        const newInstrument = !instrument ? defaultGroupNoteMap[group] : null;
        groove.current.editNote(measureIndex, rhythmIndex, group, newInstrument);
        // update state
        forceUpdate();
      }
    },
    [forceUpdate]
  );

  /* createPlayer */
  useEffect(() => {
    if (!player.current) {
      const audioCtx = new AudioContext();
      const kit = new Kit(audioCtx);
      player.current = new Player(audioCtx, kit, groove.current, handleBeat);
    }
  }, []);

  /* handle playing */
  useEffect(() => {
    if (player.current) {
      if (playing) {
        player.current.play();
      } else {
        player.current.stop();
        setPlayingBeat({
          measureIndex: null,
          rhythmIndex: null,
        });
      }
    }
  }, [playing]);

  /* handle tempo */
  useEffect(() => {
    player.current.setTempo(tempo);
  }, [tempo]);

  return (
    <>
      <div className={classes.root}>
        {groove.current &&
          groove.current.measures.map((measure, idx) => (
            <Measure
              key={idx}
              onClick={handleEdit}
              measure={measure}
              data-index={idx}
              highlightIndex={
                playingBeat.measureIndex === idx ? playingBeat.rhythmIndex : undefined
              }
            />
          ))}
      </div>
      <Picker className={classes.picker} group={'hh'} />
    </>
  );
});
