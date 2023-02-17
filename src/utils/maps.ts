import type { IconName } from '../types/icons';
import type { Instrument, InstrumentGroup } from '../types/instrument';

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
  title: 'l',
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
  Object.entries(shirtInstrumentMap).map(([value, key]) => [key, value]),
);

export const iconNamesMap: Record<Instrument, IconName> = {
  cyBellRegular: 'icon.note.cy.bell.regular',
  cyChinaRegular: 'icon.note.cy.china.regular',
  cyCowbellRegular: 'icon.note.cy.cowbell.regular',
  cyCrashRegular: 'icon.note.cy.crash.regular',
  cyEdgeRegular: 'icon.note.cy.edge.regular',
  cyRideRegular: 'icon.note.cy.ride.regular',
  cySplashRegular: 'icon.note.cy.splash.regular',
  cyTrashRegular: 'icon.note.cy.trash.regular',
  hhCloseAccent: 'icon.note.hh.close.accent',
  hhCloseGhost: 'icon.note.hh.close.ghost',
  hhCloseRegular: 'icon.note.hh.close.regular',
  hhFootRegular: 'icon.note.hh.close.regular',
  hhOpenAccent: 'icon.note.hh.open.accent',
  hhOpenRegular: 'icon.note.hh.open.regular',
  kiKickRegular: 'icon.note.regular',
  snRimRegular: 'icon.note.sn.rim.regular',
  snSnareAccent: 'icon.note.accent',
  snSnareGhost: 'icon.note.ghost',
  snSnareRegular: 'icon.note.regular',
  t1HighAccent: 'icon.note.accent',
  t1HighRegular: 'icon.note.regular',
  t2MidAccent: 'icon.note.accent',
  t2MidRegular: 'icon.note.regular',
  t3LowAccent: 'icon.note.accent',
  t3LowRegular: 'icon.note.regular',
};
