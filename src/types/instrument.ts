export type InstrumentGroup = 'cy' | 'hh' | 'sn' | 't1' | 't2' | 't3' | 'ki';

export type InstrumentGroupEnabled = Partial<Record<InstrumentGroup, boolean>>;

export type Instrument =
  | 'cyBellRegular'
  // | 'cyChinaRegular'
  | 'cyCowbellRegular'
  | 'cyCrashRegular'
  | 'cyRideRegular'
  // | 'cySplashRegular'
  | 'hhCloseAccent'
  | 'hhCloseGhost'
  | 'hhCloseRegular'
  | 'hhFootRegular'
  | 'hhOpenAccent'
  | 'hhOpenGhost'
  | 'hhOpenRegular'
  | 'kiKickGhost'
  | 'kiKickRegular'
  | 'snRimRegular'
  | 'snSnareAccent'
  | 'snSnareGhost'
  | 'snSnareRegular'
  | 't1HighGhost'
  | 't1HighRegular'
  | 't2MidGhost'
  | 't2MidRegular'
  | 't3LowGhost'
  | 't3LowRegular';

export type DrumKit = Record<Instrument, AudioBuffer>;

export type TimeSignature = {
  beatsPerBar: number;
  noteValue: number;
};

export type BarInstruments = Record<Instrument, boolean[]>;

export type BarLine = (Instrument | null)[];

export type BarInstrumentsByGroups = Record<InstrumentGroup, BarLine>;

export type Bar = TimeSignature & {
  timeDivision: number;
  length: number;
  instruments: BarInstruments;
};

export type Beat = {
  barIndex: number;
  rhythmIndex: number;
  playNote: boolean;
};

export type Note = {
  group: InstrumentGroup;
  instrument: Instrument;
  barIndex: number;
  rhythmIndex: number;
  value: boolean;
};

export type Groove = {
  tempo: number;
  bars: Bar[];
  groups: InstrumentGroupEnabled;
};

export type MetronomeFrequency = 4 | 8 | 16 | 32;
