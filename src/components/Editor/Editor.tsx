import clsx from 'clsx';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { useClickOutside, useMeasure } from '../../hooks';
import type {
  Beat,
  Instrument,
  Measure as MeasureType,
  InstrumentGroup,
  MouseEventHandler,
} from '../../types';
import { defaultGroupNoteMap, isInstrumentGroup } from '../../utils';
import { Measure } from './Measure';
import { getDataFromNoteElement } from './Note/Note.utils';
import { Picker } from './Picker';

import { useStyles } from './Editor.styles';

type EditorProps = {
  beat: Beat;
  measures: MeasureType[];
  playing: boolean;
  setMeasures: (measures: MeasureType[]) => void;
};

export const Editor = memo(function Editor({ beat, measures, playing, setMeasures }: EditorProps) {
  const classes = useStyles();

  const editorRef = useRef<HTMLDivElement>(null);
  const highlightBeat = useRef(beat);

  useEffect(() => {
    if (beat.playNote) {
      highlightBeat.current = beat;
    }
    if (!playing) {
      highlightBeat.current = { measureIndex: 0, rhythmIndex: 0, playNote: false };
    }
  }, [beat, playing]);

  // const {measure, updateMeasure} = useMeasure();

  // const [defaults, setDefaults] = useState(defaultGroupNoteMap);
  // const [focusedNote, setFocusedNote] = useState({
  //   measureIndex: null,
  //   rhythmIndex: null,
  //   group: null,
  //   instrument: null,
  // });

  // const editNote = useCallback(
  //   (measureIndex: number, rhythmIndex: number, group: InstrumentGroup, instrument: Instrument) => {
  //     groove.editNote(measureIndex, rhythmIndex, group, instrument);
  //     setFocusedNote({ measureIndex, rhythmIndex, group, instrument });
  //     onUpdate();
  //     forceUpdate(); // update state
  //   },
  //   [forceUpdate, groove, onUpdate]
  // );

  // const handleEdit: MouseEventHandler<HTMLDivElement> = useCallback(
  //   ({ currentTarget, target }) => {
  //     const measureIndex = Number(currentTarget.dataset.index);
  //     const noteElement = target.closest('button');
  //
  //     if (noteElement) {
  //       const { rhythmIndex, group, instrument } = getDataFromNoteElement(noteElement);
  //
  //       if (isInstrumentGroup(group)) {
  //         const newInstrument = !instrument ? defaults[group] : null;
  //         editNote(measureIndex, rhythmIndex, group, newInstrument);
  //
  //         setFocusedNote({
  //           measureIndex,
  //           rhythmIndex,
  //           group,
  //           instrument: newInstrument,
  //         });
  //       }
  //     }
  //   },
  //   [defaults, editNote]
  // );

  // const handlePickNote = useCallback(
  //   (measureIndex: number, rhythmIndex: number, group: InstrumentGroup, instrument: Instrument) => {
  //     editNote(measureIndex, rhythmIndex, group, instrument);
  //     setDefaults((prev) => ({ ...prev, [group]: instrument }));
  //   },
  //   [editNote]
  // );

  // useClickOutside(editorRef, () => {
  //   setFocusedNote({
  //     measureIndex: null,
  //     rhythmIndex: null,
  //     group: null,
  //     instrument: null,
  //   });
  // });

  return (
    <>
      <div ref={editorRef} className={classes.root}>
        {measures.map((measure, idx) => (
          <Measure
            key={idx}
            // onClick={handleEdit}
            measure={measure}
            data-index={idx}
            highlightIndex={
              playing && highlightBeat.current.measureIndex === idx
                ? highlightBeat.current.rhythmIndex
                : undefined
            }
          />
        ))}
      </div>
      {/*<Picker*/}
      {/*  className={clsx(classes.picker, { [classes.pickerHidden]: !focusedNote.instrument })}*/}
      {/*  onChange={handlePickNote}*/}
      {/*  {...focusedNote}*/}
      {/*/>*/}
    </>
  );
});
