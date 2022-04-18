import clsx from 'clsx';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { useClickOutside, useForceUpdate } from '../../hooks';
import type { Groove } from '../../lib/Groove';
import { Kit } from '../../lib/Kit';
import { Player } from '../../lib/Player';
import type {
  Instrument,
  InstrumentGroup,
  MouseEventHandler,
  InstrumentGroupEnabled,
} from '../../types';
import { defaultGroupNoteMap, isInstrumentGroup } from '../../utils';
import { Measure } from './Measure';
import { getDataFromNoteElement } from './Note/Note.utils';
import { Picker } from './Picker';

import { useStyles } from './Editor.styles';

type EditorProps = {
  enabledGroups: InstrumentGroupEnabled;
  groove: Groove | null;
  playing: boolean;
  tempo: number;
  onUpdate?: () => void;
};

export const Editor = memo(function Editor({
  enabledGroups,
  groove,
  playing,
  tempo,
  onUpdate,
}: EditorProps) {
  const classes = useStyles();
  const { forceUpdate } = useForceUpdate();

  const editorRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<Player>(null);

  const [playingBeat, setPlayingBeat] = useState({ measureIndex: null, rhythmIndex: null });
  const [defaults, setDefaults] = useState(defaultGroupNoteMap);
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
      groove.editNote(measureIndex, rhythmIndex, group, instrument);
      setFocusedNote({ measureIndex, rhythmIndex, group, instrument });
      onUpdate();
      forceUpdate(); // update state
    },
    [forceUpdate, groove, onUpdate]
  );

  const handleEdit: MouseEventHandler<HTMLDivElement> = useCallback(
    ({ currentTarget, target }) => {
      const measureIndex = Number(currentTarget.dataset.index);
      const noteElement = target.closest('button');

      if (noteElement) {
        const { rhythmIndex, group, instrument } = getDataFromNoteElement(noteElement);

        if (isInstrumentGroup(group)) {
          const newInstrument = !instrument ? defaults[group] : null;
          editNote(measureIndex, rhythmIndex, group, newInstrument);

          setFocusedNote({
            measureIndex,
            rhythmIndex,
            group,
            instrument: newInstrument,
          });
        }
      }
    },
    [defaults, editNote]
  );

  const handlePickNote = useCallback(
    (measureIndex: number, rhythmIndex: number, group: InstrumentGroup, instrument: Instrument) => {
      editNote(measureIndex, rhythmIndex, group, instrument);
      setDefaults((prev) => ({ ...prev, [group]: instrument }));
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
    if (!player && groove) {
      const audioCtx = new AudioContext();
      const kit = new Kit(audioCtx);
      setPlayer(new Player(audioCtx, kit, groove, handleBeat));
    }
  }, [groove, player]);

  /* handle playing */
  useEffect(() => {
    if (player) {
      if (playing) {
        player.play();
      } else {
        player.stop();
        setPlayingBeat({
          measureIndex: null,
          rhythmIndex: null,
        });
      }
    }
  }, [player, playing]);

  /* handle tempo */
  useEffect(() => {
    if (player) {
      player.setTempo(tempo);
      onUpdate();
    }
  }, [onUpdate, player, tempo]);

  return (
    <>
      <div ref={editorRef} className={classes.root}>
        {groove?.measures.map((measure, idx) => (
          <Measure
            key={idx}
            enabledGroups={enabledGroups}
            onClick={handleEdit}
            measure={measure}
            data-index={idx}
            highlightIndex={playingBeat.measureIndex === idx ? playingBeat.rhythmIndex : undefined}
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
