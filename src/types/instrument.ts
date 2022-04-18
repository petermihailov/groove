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
