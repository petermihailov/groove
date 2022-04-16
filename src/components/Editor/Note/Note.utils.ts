import type { IconName } from '../../../icons/Icon';
import type { Instrument, InstrumentGroup } from '../../../types';

const iconNamesMap: Record<Instrument, IconName> = {
  cyBellRegular: 'cyBellRegular',
  // 'cyChinaRegular': 'cyChinaRegular',
  cyCowbellRegular: 'cyCowbellRegular',
  cyCrashRegular: 'cyCrashRegular',
  cyRideRegular: 'cyRideRegular',
  // 'cySplashRegular', 'cySplashRegular',
  hhCloseAccent: 'hhCloseAccent',
  hhCloseGhost: 'hhCloseGhost',
  hhCloseRegular: 'hhCloseRegular',
  hhFootRegular: 'hhCloseRegular',
  hhOpenAccent: 'hhOpenAccent',
  hhOpenGhost: 'hhOpenGhost',
  hhOpenRegular: 'hhOpenRegular',
  kiKickGhost: 'noteGhost',
  kiKickRegular: 'noteRegular',
  snRimRegular: 'snRimRegular',
  snSnareAccent: 'noteAccent',
  snSnareGhost: 'noteGhost',
  snSnareRegular: 'noteRegular',
  t1HighGhost: 'noteGhost',
  t1HighRegular: 'noteRegular',
  t2MidGhost: 'noteGhost',
  t2MidRegular: 'noteRegular',
  t3LowGhost: 'noteGhost',
  t3LowRegular: 'noteRegular',
};

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
