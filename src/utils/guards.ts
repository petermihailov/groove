import { groups, instruments } from '../constants';
import type { Instrument, Group, TimeDivision } from '../types/instrument';

export const isGroup = (str = ''): str is Group => {
  return groups.includes(str as Group);
};

export const isInstrument = (str = ''): str is Instrument => {
  return instruments.includes(str as Instrument);
};

export const isTimeDivision = (num: number): num is TimeDivision => {
  return [4, 8, 16, 32].includes(num);
};
