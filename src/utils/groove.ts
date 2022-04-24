import { instruments } from '../constants';
// import type { Groove } from '../lib/Groove';
import type { Measure, Instrument, InstrumentGroup } from '../types';
import { safeKeys } from './safe-keys';
//
// export const getGrooveGroups = (groove: Groove) => {
//   const groups: InstrumentGroupEnabled = {
//     cy: false,
//     hh: false,
//     ki: false,
//     sn: false,
//     t1: false,
//     t2: false,
//     t3: false,
//   };
//
//   for (const measure of groove.measures) {
//     for (const group of measure.instrumentGroups) {
//       if (!groups[group] && measure.notes[group].some(Boolean)) {
//         groups[group] = true;
//       }
//     }
//   }
//
//   return groups;
// };

export const createEmptyMeasure = (
  timeDivision: number,
  beatsCount: number,
  beatsPerFullNote: number
): Measure => {
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

export const getInstrumentsByIndex = (measure: Measure, rhythmIndex: number): Instrument[] => {
  return safeKeys(measure.instruments).filter((key) => {
    const notes = measure.instruments[key] || [];
    return notes[rhythmIndex];
  });
};

// export const isTriplet = (timeDivision: number) => {
//   return timeDivision % 12 === 0;
// };
