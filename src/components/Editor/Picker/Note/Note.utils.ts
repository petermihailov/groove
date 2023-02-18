import type { IconName } from '../../../../types/icons';
import type { Instrument, InstrumentGroup } from '../../../../types/instrument';
import { groupNamesMap, iconNamesMap } from '../../../../utils/maps';
import { uncamelcase } from '../../../../utils/uncamelcase';

export const getIconName = (instrument: Instrument): IconName => {
  return iconNamesMap[instrument];
};

export const getNoteLabel = (instrument: Instrument, group: InstrumentGroup): string => {
  const groupName = groupNamesMap[group];
  const instrumentName = uncamelcase(instrument.slice(2), ' ');

  return group === 'hh' ? `${groupName} ${instrumentName}` : instrumentName;
};
