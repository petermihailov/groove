import type { IconName } from '../../types/icons';
import type { Group, Note } from '../../types/instrument';
import { isInstrument, isGroup } from '../../utils/guards';
import { iconNamesMap } from '../../utils/maps';

export const createNoteDataset = (note: Note) => ({
  'data-bar-index': note.barIndex,
  'data-rhythm-index': note.rhythmIndex,
  'data-group': note.group,
  'data-instrument': note.instrument,
  'data-value': String(note.value),
});

export const getNoteFromDataset = (element: SVGElement | HTMLElement): Note | null => {
  const { barIndex, rhythmIndex, group, instrument, value } = element.dataset;

  if (isGroup(group) && isInstrument(instrument) && barIndex && rhythmIndex && value) {
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

export const getEmptyIconName = (group: Group): IconName => {
  const defaultName = 'icon.note.empty';

  const special = {
    cy: iconNamesMap.hhOpenRegular,
    hh: iconNamesMap.hhCloseRegular,
  };

  return (special as Record<Group, IconName>)[group] ?? defaultName;
};
