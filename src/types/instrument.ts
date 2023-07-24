export type Group = 'cy' | 'hh' | 'sn' | 't1' | 't2' | 't3' | 'ki';

export type Instrument =
  | 'cyBellRegular'
  | 'cyChinaRegular'
  | 'cyCowbellRegular'
  | 'cyCrashRegular'
  | 'cyEdgeRegular'
  | 'cyRideRegular'
  | 'cySplashRegular'
  | 'cyTrashRegular'
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
  | 't3LowRegular'
  | 'fxMetronomeAccent'
  | 'fxMetronomeRegular';

export type DrumKit = Record<Instrument, AudioBuffer>;

export type TimeDivision = 4 | 8 | 16 | 32;

export interface TimeSignature {
  beatsPerBar: number;
  noteValue: number;
}

export type BarGroup = Record<Group, Array<Instrument | null>>;

export interface Bar extends TimeSignature {
  timeDivision: TimeDivision;
  length: number;
  groups: Partial<BarGroup>;
}

export interface Beat {
  barIndex: number;
  rhythmIndex: number;
  instruments: Instrument[];
}

export interface Note {
  group: Group;
  instrument: Instrument;
  barIndex: number;
  rhythmIndex: number;
  value: boolean;
}

export interface Groove {
  tempo: number;
  bars: Bar[];
  groups: Group[];
}
