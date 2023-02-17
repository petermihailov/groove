import { instrumentGroups, instruments } from '../constants';
import type { Instrument, InstrumentGroup, TimeDivision } from '../types/instrument';

export const isInstrumentGroup = (str = ''): str is InstrumentGroup => {
  return instrumentGroups.includes(str as InstrumentGroup);
};

export const isInstrument = (str = ''): str is Instrument => {
  return instruments.includes(str as Instrument);
};

export const isTimeDivision = (num: number): num is TimeDivision => {
  return [4, 8, 16, 32].includes(num);
};
