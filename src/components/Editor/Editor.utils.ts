import type { IconName } from '../../types/icons';
import type { InstrumentGroup, Note } from '../../types/instrument';
import { isInstrument, isInstrumentGroup } from '../../utils/guards';
import { iconNamesMap } from '../../utils/maps';

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

export const getEmptyIconName = (group: InstrumentGroup): IconName => {
  const defaultName = 'icon.note.empty';

  const special = {
    cy: iconNamesMap.hhOpenRegular,
    hh: iconNamesMap.hhCloseRegular,
  };

  return (special as Record<InstrumentGroup, IconName>)[group] ?? defaultName;
};
