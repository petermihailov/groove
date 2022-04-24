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

export type Measure = {
  timeDivision: number;
  beatsCount: number;
  beatsPerFullNote: number;
  length: number;
  instruments: Partial<Record<Instrument, boolean[]>>;
};

export type Beat = {
  measureIndex: number;
  rhythmIndex: number;
  playNote: boolean;
};

export type Note = {
  group: InstrumentGroup;
  instrument: Instrument;
  measureIndex: number;
  rhythmIndex: number;
};

export type Groove = {
  tempo: number;
  measures: Measure[];
};
