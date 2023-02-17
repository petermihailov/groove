export type InstrumentGroup = 'cy' | 'hh' | 'sn' | 't1' | 't2' | 't3' | 'ki';

export type InstrumentGroupEnabled = Record<InstrumentGroup, boolean>;

export type Instrument =
  | 'cyBellRegular'
  | 'cyChinaRegular'
  | 'cyCowbellRegular'
  | 'cyCrashRegular'
  | 'cyEdgeRegular'
  | 'cyRideRegular'
  | 'cySplashRegular'
  | 'cyTrashRegular'
  // | 'fxMetronomeAccent'
  // | 'fxMetronomeRegular'
  | 'hhCloseAccent'
  | 'hhCloseGhost'
  | 'hhCloseRegular'
  | 'hhFootRegular'
  | 'hhOpenAccent'
  | 'hhOpenRegular'
  | 'kiKickRegular'
  | 'snRimRegular'
  | 'snSnareAccent'
  | 'snSnareGhost'
  | 'snSnareRegular'
  | 't1HighAccent'
  | 't1HighRegular'
  | 't2MidAccent'
  | 't2MidRegular'
  | 't3LowAccent'
  | 't3LowRegular';

export type DrumKit = Record<Instrument, AudioBuffer>;

export type TimeDivision = 4 | 8 | 16 | 32;

export interface TimeSignature {
  beatsPerBar: number;
  noteValue: number;
}

export type BarInstruments = Record<Instrument, boolean[]>;

export type BarLine = (Instrument | null)[];

export type BarInstrumentsByGroups = Record<InstrumentGroup, BarLine>;

export interface Bar extends TimeSignature {
  timeDivision: TimeDivision;
  length: number;
  instruments: BarInstruments;
}

export interface Beat {
  barIndex: number;
  rhythmIndex: number;
  playNote: boolean;
}

export interface Note {
  group: InstrumentGroup;
  instrument: Instrument;
  barIndex: number;
  rhythmIndex: number;
  value: boolean;
}

export interface Groove {
  title: string;
  tempo: number;
  bars: Bar[];
  groups: InstrumentGroupEnabled;
}

export type MetronomeFrequency = 4 | 8 | 16 | 32;
