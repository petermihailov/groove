import type { InstrumentGroup, Instrument } from './types';

export const sizeIconDefault = 24;

export const instrumentGroups: InstrumentGroup[] = ['cy', 'hh', 'sn', 't1', 't2', 't3', 'ki'];

export const instruments: Instrument[] = [
  'cyBellRegular',
  'cyChinaRegular',
  'cyCowbellRegular',
  'cyCrashRegular',
  'cyEdgeRegular',
  'cyRideRegular',
  'cySplashRegular',
  'cyTrashRegular',
  // 'fxMetronomeAccent',
  // 'fxMetronomeRegular',
  'hhCloseAccent',
  'hhCloseGhost',
  'hhCloseRegular',
  'hhFootRegular',
  'hhOpenAccent',
  'hhOpenRegular',
  'kiKickRegular',
  'snRimRegular',
  'snSnareAccent',
  'snSnareGhost',
  'snSnareRegular',
  't1HighAccent',
  't1HighRegular',
  't2MidAccent',
  't2MidRegular',
  't3LowAccent',
  't3LowRegular',
];

export const tempoMin = 20;
export const tempoMax = 240;

export const grooveDefault = 't90|s44d16:hcrkkr--hcr--hcrssr--hcr--hcrkkr--hcrkkr--hcrssr--hcr-';

export const grooveNotNow1 =
  't106|s44d32:hfrkkr--tlr--hfrkkr--ssatlr--hfrkkr--tlr--hfrthrkkr--tlr--hfrkkr--thrtlr--hfrkkr--hoatlr--hfrssakkr--tlr--hfrssrkkr-thr-tlr-tlr';

export const grooveFeeling1 =
  't173|s44d16:horkkr-ssg-hcr-ssg-ssa-ssg-hcr-ssg-hcr-ssg-horkkr-ssg-hcr-ssg-hcrssa-ssg';

export const grooveFeeling2 =
  't87|s44d16:cwrhorkkr--hcr-cwr-ssr-hcr-cwrhcr-hcr-hfrkkr-hcr-cwrhcr-hcr-ssr-cwr-hcr-hcrkkr';

export const grooveDumpweed1 =
  't96|s44d16:crrhfrkkr-crrssg-crrhfrkkr-cbr-crrhfrssrkkr-crr-crrhfrkkr-cbr-crrhfrkkr-crrhcr-cbrhorkkr-crr-crrhfrssrkkr-crr-crrhfrssgkkr-crrssg';

export const grooveDumpweed2 =
  't96|s44d16:ccrhfrkkr-ssg-crrhfrkkr-cbr-crrhfrkkrssr--crrhfrkkr-cbr-crrhfrkkr-hcr-cbrhorkkr--crrhfrkkrssr--crrhfrkkr-ssg_s44d16:crrhfrkkr-ssg-crrhfrkkr-cbr-crrhfrkkrssr--crrhfrkkr-cbr-crrhfrkkr-hcr-cbrhorkkr--chrhfrkkrssr--hfr-';

// t90|s44d16:hcrkkr--hcr--hcrssr--hcr--hcrkkr--hcr--hcrssr--hcr-_s44d16:kkr-hcr-hcr-kkr-hcr-ssr-hcr-kkr-hcr-ssr-hcr-kkr-hcrssr--hcr-
