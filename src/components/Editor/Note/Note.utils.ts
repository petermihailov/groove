import type { IconName } from '../../../types/icons';
import type { Instrument, InstrumentGroup } from '../../../types/instrument';
import { groupNamesMap, iconNamesMap } from '../../../utils/maps';
import { uncamelcase } from '../../../utils/uncamelcase';

export const getIconName = (instrument: Instrument | null, group: InstrumentGroup): IconName => {
  if (!instrument) {
    // is empty note
    if (group === 'hh') {
      return iconNamesMap.hhCloseRegular;
    }

    return 'icon.note.empty';
  }

  return iconNamesMap[instrument];
};

export const getNoteLabel = (instrument: Instrument | null, group: InstrumentGroup): string => {
  if (!instrument) {
    return 'empty note';
  }

  const groupName = groupNamesMap[group];
  const instrumentName = uncamelcase(instrument.slice(2), ' ');

  return group === 'hh' ? `${groupName} ${instrumentName}` : instrumentName;
};

export const getDataFromNoteElement = (element: SVGElement) => {
  const { bar, index, instrument, group } = element.dataset;
  const barIndex = Number(bar);
  const rhythmIndex = Number(index);

  return { barIndex, rhythmIndex, group, instrument };
};
