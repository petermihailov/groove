import { instruments } from '../constants';
import type { Bar, Instrument, InstrumentGroup, Groove, InstrumentGroupEnabled } from '../types';
import { safeKeys } from './safe-keys';

export const getGrooveGroups = (groove: Groove) => {
  const groups: InstrumentGroupEnabled = {
    cy: false,
    hh: false,
    ki: false,
    sn: false,
    t1: false,
    t2: false,
    t3: false,
  };

  for (const bar of groove.bars) {
    for (const instrument in bar.instruments) {
      const group = getGroupByInstrument(instrument as Instrument);

      if (!groups[group] && bar.instruments[instrument as Instrument]?.some(Boolean)) {
        groups[group] = true;
      }
    }
  }

  return groups;
};

export const createEmptyBar = (
  timeDivision: number,
  beatsCount: number,
  beatsPerFullNote: number
): Bar => {
  return {
    beatsCount,
    beatsPerFullNote,
    timeDivision,
    length: (timeDivision / beatsPerFullNote) * beatsCount,
    instruments: {},
  };
};

export const getGroupByInstrument = (instrument: Instrument) => {
  return instrument.substring(0, 2) as InstrumentGroup;
};

export const getInstrumentsByGroup = (group: InstrumentGroup) => {
  return instruments.filter((instrument) => instrument.startsWith(group));
};

export const getInstrumentsByIndex = (bar: Bar, rhythmIndex: number): Instrument[] => {
  return safeKeys(bar.instruments).filter((key) => {
    const notes = bar.instruments[key] || [];
    return notes[rhythmIndex];
  });
};

// export const isTriplet = (timeDivision: number) => {
//   return timeDivision % 12 === 0;
// };
