import type { Groove } from '../lib/Groove';
import type { Instrument, InstrumentGroup, InstrumentGroupEnabled } from '../types';

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

  for (const measure of groove.measures) {
    for (const group of measure.instrumentGroups) {
      if (!groups[group] && measure.notes[group].some(Boolean)) {
        groups[group] = true;
      }
    }
  }

  return groups;
};

export const getGroupByInstrument = (instrument: Instrument) => {
  return instrument.substring(0, 2) as InstrumentGroup;
};

export const isTriplet = (timeDivision: number) => {
  return timeDivision % 12 === 0;
};
