import type { InstrumentGroup, Instrument } from './types';

export const instrumentGroups: InstrumentGroup[] = ['cy', 'hh', 'sn', 't1', 't2', 't3', 'ki'];

export const instruments: Instrument[] = [
  'cyBellRegular',
  // 'cyChinaRegular',
  'cyCowbellRegular',
  'cyCrashRegular',
  'cyRideRegular',
  // 'cySplashRegular',
  'hhCloseAccent',
  'hhCloseGhost',
  'hhCloseRegular',
  'hhFootRegular',
  'hhOpenAccent',
  'hhOpenGhost',
  'hhOpenRegular',
  'kiKickGhost',
  'kiKickRegular',
  'snRimRegular',
  'snSnareAccent',
  'snSnareGhost',
  'snSnareRegular',
  't1HighGhost',
  't1HighRegular',
  't2MidGhost',
  't2MidRegular',
  't3LowGhost',
  't3LowRegular',
];

export const grooveDefault = 't80|s44d16:hcrkkr--hcr--hcrssr--hcr--hcr--hcrkkr-kkr-hcrssr--hcr-hcr';
