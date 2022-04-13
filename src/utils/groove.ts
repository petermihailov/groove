import type { Instrument, InstrumentGroup } from '../types';

export const getGroupByInstrument = (instrument: Instrument) => {
  return instrument.substring(0, 2) as InstrumentGroup;
};

export const isTriplet = (timeDivision: number) => {
  return timeDivision % 12 === 0;
};
