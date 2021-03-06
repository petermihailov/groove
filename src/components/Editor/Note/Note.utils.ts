import type { IconName, Instrument, InstrumentGroup } from '../../../types';
import { groupNamesMap, iconNamesMap, uncamelcase } from '../../../utils';

export const getIconName = (instrument: Instrument | null, group: InstrumentGroup): IconName => {
  if (!instrument) {
    // is empty note
    if (group === 'hh') {
      return iconNamesMap.hhCloseRegular;
    }
    return 'note-empty';
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

export const getDataFromNoteElement = (element: HTMLElement) => {
  const { index, instrument, group } = element.dataset;
  const rhythmIndex = Number(index);

  return { rhythmIndex, group, instrument };
};
