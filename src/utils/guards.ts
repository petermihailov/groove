import { instruments } from '../constants';
import type { Instrument } from '../types';

export const isInstrument = (str: string): str is Instrument => {
  return instruments.includes(str as Instrument);
};
