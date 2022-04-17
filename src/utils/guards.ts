import { instrumentGroups, instruments } from '../constants';
import type { Instrument, InstrumentGroup } from '../types';

export const isInstrumentGroup = (str: string): str is InstrumentGroup => {
  return instrumentGroups.includes(str as InstrumentGroup);
};

export const isInstrument = (str: string): str is Instrument => {
  return instruments.includes(str as Instrument);
};
