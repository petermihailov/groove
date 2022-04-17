import type { Instrument, IconName, InstrumentGroup } from '../types';

export const defaultGroupNoteMap: Record<InstrumentGroup, Instrument> = {
  cy: 'cyRideRegular',
  hh: 'hhCloseRegular',
  ki: 'kiKickRegular',
  sn: 'snSnareRegular',
  t1: 't1HighRegular',
  t2: 't2MidRegular',
  t3: 't3LowRegular',
} as const;

export const shirtSymbolsMap = {
  tempo: 't',
  timeSignature: 's',
  timeDivision: 'd',
  measureDelimiter: '+',
  measureSettingsDelimiter: ':',
  grooveSettingsDelimiter: '|',
  beatDelimiter: '-',
} as const;

export const groupNamesMap = {
  cy: 'cymbal',
  hh: 'hi-hat',
  ki: 'kick',
  sn: 'snare',
  t1: 'high tom',
  t2: 'middle tom',
  t3: 'low tom',
} as const;

export const shirtInstrumentMap = {
  cyBellRegular: 'cbr',
  // cyChinaRegular: 'chr',
  cyCowbellRegular: 'cwr',
  cyCrashRegular: 'ccr',
  cyRideRegular: 'crr',
  // cySplashRegular: 'csr',
  hhCloseAccent: 'hca',
  hhCloseGhost: 'hcg',
  hhCloseRegular: 'hcr',
  hhFootRegular: 'hfr',
  hhOpenAccent: 'hoa',
  hhOpenGhost: 'hog',
  hhOpenRegular: 'hor',
  kiKickGhost: 'kkg',
  kiKickRegular: 'kkr',
  snRimRegular: 'srr',
  snSnareAccent: 'ssa',
  snSnareGhost: 'ssg',
  snSnareRegular: 'ssr',
  t1HighGhost: 'thg',
  t1HighRegular: 'thr',
  t2MidGhost: 'tmg',
  t2MidRegular: 'tmr',
  t3LowGhost: 'tlg',
  t3LowRegular: 'tlr',
} as const;

export const longInstrumentMap = Object.fromEntries(
  Object.entries(shirtInstrumentMap).map(([value, key]) => [key, value])
);

export const iconNamesMap: Record<Instrument, IconName> = {
  cyBellRegular: 'cyBellRegular',
  // 'cyChinaRegular': 'cyChinaRegular',
  cyCowbellRegular: 'cyCowbellRegular',
  cyCrashRegular: 'cyCrashRegular',
  cyRideRegular: 'cyRideRegular',
  // 'cySplashRegular', 'cySplashRegular',
  hhCloseAccent: 'hhCloseAccent',
  hhCloseGhost: 'hhCloseGhost',
  hhCloseRegular: 'hhCloseRegular',
  hhFootRegular: 'hhCloseRegular',
  hhOpenAccent: 'hhOpenAccent',
  hhOpenGhost: 'hhOpenGhost',
  hhOpenRegular: 'hhOpenRegular',
  kiKickGhost: 'noteGhost',
  kiKickRegular: 'noteRegular',
  snRimRegular: 'snRimRegular',
  snSnareAccent: 'noteAccent',
  snSnareGhost: 'noteGhost',
  snSnareRegular: 'noteRegular',
  t1HighGhost: 'noteGhost',
  t1HighRegular: 'noteRegular',
  t2MidGhost: 'noteGhost',
  t2MidRegular: 'noteRegular',
  t3LowGhost: 'noteGhost',
  t3LowRegular: 'noteRegular',
};
