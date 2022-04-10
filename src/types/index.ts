import type { instruments } from '../constants';

export type Instruments = typeof instruments;
export type Instrument = typeof instruments[number] | null;
