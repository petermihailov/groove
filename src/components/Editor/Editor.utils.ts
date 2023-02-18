import type { Note } from '../../types/instrument';
import { isInstrument, isInstrumentGroup } from '../../utils/guards';

export const getNoteFromDataset = (element: SVGElement | HTMLElement): Note | null => {
  const { barIndex, rhythmIndex, group, instrument, value } = element.dataset;

  if (isInstrumentGroup(group) && isInstrument(instrument) && barIndex && rhythmIndex && value) {
    return {
      barIndex: Number(barIndex),
      rhythmIndex: Number(rhythmIndex),
      group,
      instrument,
      value: value === 'true',
    };
  }

  return null;
};

export const createNoteDataset = (note: Note) => ({
  'data-bar-index': note.barIndex,
  'data-rhythm-index': note.rhythmIndex,
  'data-group': note.group,
  'data-instrument': note.instrument,
  'data-value': String(note.value),
});
