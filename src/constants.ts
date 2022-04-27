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

export const tempoMin = 20;
export const tempoMax = 240;

export const grooveDefault = 't80|s44d16:hcrkkr--hcr--hcrssr--hcr--hcr--hcrkkr-kkr-hcrssr--hcr-hcr';

export const grooveNotNow =
  't106|s44d32:hfrkkr--tlr--hfrkkr--ssatlr--hfrkkr--tlr--hfrthrkkr--tlr--hfrkkr--thrtlr--hfrkkr--hoatlr--hfrssakkr--tlr--hfrssrkkr-thr-tlr-tlr';

export const grooveFeeling =
  't173|s44d16:horkkr-ssg-hcr-ssg-ssa-ssg-hcr-ssg-hcr-ssg-horkkr-ssg-hcr-ssg-hcrssa-ssg';

export const grooveFeeling2 =
  't87|s44d16:cwrhorkkr--hcr-cwr-ssr-hcr-cwrhcr-hcr-hfrkkr-hcr-cwrhcr-hcr-ssr-cwr-hcr-hcrkkr';

export const grooveDumpweed =
  't96|s44d16:crrhfrkkr-crrssg-crrhfrkkr-cbr-crrhfrssrkkr-crr-crrhfrkkr-cbr-crrhfrkkr-crrhcr-cbrhorkkr-crr-crrhfrssrkkr-crr-crrhfrssgkkr-crrssg';
