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
  barDelimiter: '_',
  barSettingsDelimiter: ':',
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
  cyBellRegular: 'note-cy-bell-regular',
  // 'cyChinaRegular': 'cyChinaRegular',
  cyCowbellRegular: 'note-cy-cowbell-regular',
  cyCrashRegular: 'note-cy-crash-regular',
  cyRideRegular: 'note-cy-ride-regular',
  // 'cySplashRegular', 'cySplashRegular',
  hhCloseAccent: 'note-hh-close-accent',
  hhCloseGhost: 'note-hh-close-ghost',
  hhCloseRegular: 'note-hh-close-regular',
  hhFootRegular: 'note-hh-close-regular',
  hhOpenAccent: 'note-hh-open-accent',
  hhOpenGhost: 'note-hh-open-ghost',
  hhOpenRegular: 'note-hh-open-regular',
  kiKickGhost: 'note-ghost',
  kiKickRegular: 'note-regular',
  snRimRegular: 'note-sn-rim-regular',
  snSnareAccent: 'note-accent',
  snSnareGhost: 'note-ghost',
  snSnareRegular: 'note-regular',
  t1HighGhost: 'note-ghost',
  t1HighRegular: 'note-regular',
  t2MidGhost: 'note-ghost',
  t2MidRegular: 'note-regular',
  t3LowGhost: 'note-ghost',
  t3LowRegular: 'note-regular',
};
