import type { instruments, instrumentGroups } from '../constants';

export type InstrumentGroups = typeof instrumentGroups;
export type InstrumentGroup = typeof instrumentGroups[number];

export type Instruments = typeof instruments;
export type Instrument = typeof instruments[number] | null;
