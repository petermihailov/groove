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
  cyChinaRegular: 'chr',
  cyCowbellRegular: 'cwr',
  cyCrashRegular: 'ccr',
  cyEdgeRegular: 'cer',
  cyRideRegular: 'crr',
  cySplashRegular: 'csr',
  cyTrashRegular: 'ctr',
  hhCloseAccent: 'hca',
  hhCloseGhost: 'hcg',
  hhCloseRegular: 'hcr',
  hhFootRegular: 'hfr',
  hhOpenAccent: 'hoa',
  hhOpenRegular: 'hor',
  kiKickRegular: 'kkr',
  snRimRegular: 'srr',
  snSnareAccent: 'ssa',
  snSnareGhost: 'ssg',
  snSnareRegular: 'ssr',
  t1HighAccent: 'tha',
  t1HighRegular: 'thr',
  t2MidAccent: 'tma',
  t2MidRegular: 'tmr',
  t3LowAccent: 'tla',
  t3LowRegular: 'tlr',
} as const;

export const longInstrumentMap = Object.fromEntries(
  Object.entries(shirtInstrumentMap).map(([value, key]) => [key, value])
);

export const iconNamesMap: Record<Instrument, IconName> = {
  cyBellRegular: 'note-cy-bell-regular',
  cyChinaRegular: 'note-cy-china-regular',
  cyCowbellRegular: 'note-cy-cowbell-regular',
  cyCrashRegular: 'note-cy-crash-regular',
  cyEdgeRegular: 'note-cy-edge-regular',
  cyRideRegular: 'note-cy-ride-regular',
  cySplashRegular: 'note-cy-splash-regular',
  cyTrashRegular: 'note-cy-trash-regular',
  hhCloseAccent: 'note-hh-close-accent',
  hhCloseGhost: 'note-hh-close-ghost',
  hhCloseRegular: 'note-hh-close-regular',
  hhFootRegular: 'note-hh-close-regular',
  hhOpenAccent: 'note-hh-open-accent',
  hhOpenRegular: 'note-hh-open-regular',
  kiKickRegular: 'note-regular',
  snRimRegular: 'note-sn-rim-regular',
  snSnareAccent: 'note-accent',
  snSnareGhost: 'note-ghost',
  snSnareRegular: 'note-regular',
  t1HighAccent: 'note-accent',
  t1HighRegular: 'note-regular',
  t2MidAccent: 'note-accent',
  t2MidRegular: 'note-regular',
  t3LowAccent: 'note-accent',
  t3LowRegular: 'note-regular',
};
