import type { IconName, Instrument, InstrumentGroup } from '../../../types';
import { groupNamesMap, iconNamesMap, uncamelcase } from '../../../utils';

export const getIconName = (instrument: Instrument, group: InstrumentGroup): IconName => {
  const iconName = iconNamesMap[instrument];

  if (!iconName) {
    // is empty note
    if (group === 'hh') {
      return iconNamesMap.hhCloseRegular;
    }
    return 'noteEmpty';
  }

  return iconName;
};

export const getNoteLabel = (instrument: Instrument, group: InstrumentGroup): string => {
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
