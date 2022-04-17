import clsx from 'clsx';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { grooveDefault } from '../../constants';
import { useClickOutside, useForceUpdate } from '../../hooks';
import type { Groove } from '../../lib/Groove';
import { Kit } from '../../lib/Kit';
import { Player } from '../../lib/Player';
import type { Instrument, InstrumentGroup, MouseEventHandler } from '../../types';
import { createGrooveFromString, defaultGroupNoteMap, isInstrumentGroup } from '../../utils';
import { Measure } from './Measure';
import { getDataFromNoteElement } from './Note/Note.utils';
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

  const editorRef = useRef<HTMLDivElement>(null);
  const player = useRef<Player>(null);
  const groove = useRef<Groove>(groove1);

  const [playingBeat, setPlayingBeat] = useState({ measureIndex: null, rhythmIndex: null });
  const [focusedNote, setFocusedNote] = useState({
    measureIndex: null,
    rhythmIndex: null,
    group: null,
    instrument: null,
  });

  const handleBeat = (measureIndex: number, rhythmIndex: number) => {
    setPlayingBeat({
      measureIndex,
      rhythmIndex,
    });
  };

  const editNote = useCallback(
    (measureIndex: number, rhythmIndex: number, group: InstrumentGroup, instrument: Instrument) => {
      groove.current.editNote(measureIndex, rhythmIndex, group, instrument);
      setFocusedNote({ measureIndex, rhythmIndex, group, instrument });
      forceUpdate(); // update state
    },
    [forceUpdate]
  );

  const handleEdit: MouseEventHandler<HTMLDivElement> = useCallback(
    ({ currentTarget, target }) => {
      const measureIndex = Number(currentTarget.dataset.index);

      const noteElement = target.closest('button');
      const { rhythmIndex, group, instrument } = getDataFromNoteElement(noteElement);

      if (isInstrumentGroup(group)) {
        const newInstrument = !instrument ? defaultGroupNoteMap[group] : null;
        editNote(measureIndex, rhythmIndex, group, newInstrument);

        setFocusedNote({
          measureIndex,
          rhythmIndex,
          group,
          instrument: newInstrument,
        });
      }
    },
    [editNote]
  );

  const handlePickNote = useCallback(
    (measureIndex: number, rhythmIndex: number, group: InstrumentGroup, instrument: Instrument) => {
      editNote(measureIndex, rhythmIndex, group, instrument);
    },
    [editNote]
  );

  useClickOutside(editorRef, () => {
    setFocusedNote({
      measureIndex: null,
      rhythmIndex: null,
      group: null,
      instrument: null,
    });
  });

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
      <div ref={editorRef} className={classes.root}>
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
      <Picker
        className={clsx(classes.picker, { [classes.pickerHidden]: !focusedNote.instrument })}
        onChange={handlePickNote}
        {...focusedNote}
      />
    </>
  );
});
