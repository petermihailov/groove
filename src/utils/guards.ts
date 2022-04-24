import { instrumentGroups, instruments } from '../constants';
import type { Instrument, InstrumentGroup } from '../types';

export const isInstrumentGroup = (str = ''): str is InstrumentGroup => {
  return instrumentGroups.includes(str as InstrumentGroup);
};

export const isInstrument = (str = ''): str is Instrument => {
  return instruments.includes(str as Instrument);
};
