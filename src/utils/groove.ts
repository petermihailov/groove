import { instrumentGroups } from '../constants';
import { Measure } from '../lib/Measure';
import type { Instrument, InstrumentGroup } from '../types';
import { ensureArray } from './array';
import { isInstrument } from './guards';

export const shirtInstrumentLiterals = {
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

export const longInstrumentLiterals = Object.fromEntries(
  Object.entries(shirtInstrumentLiterals).map(([value, key]) => [key, value])
);

export const createShirtMeasureRecord = (measure: Measure) => {
  let str = '';
  for (let i = 0; i < measure.length; i++) {
    if (i !== 0) str += '-';

    for (const group of measure.instrumentGroups) {
      const instrument = measure.notes[group][i];
      str += shirtInstrumentLiterals[instrument] || '';
    }
  }

  return str;
};

export const createMeasureFromShirtRecord = (str: string): Measure[] => {
  const [settingsStr, measuresStr] = str.split('|');

  const readParamValue = (name: string) => {
    const pattern = new RegExp(`${name}[0-9:]+`, 'g');
    return (ensureArray(settingsStr.match(pattern))[0] || '').substring(1);
  };

  // const tempo = Number(readParamValue('t'));
  const timeDivision = Number(readParamValue('d'));
  const [beatsCount, beatsPerFullNote] = readParamValue('s').split(':').map(Number);

  const measuresStrArr = measuresStr.split('+');

  return measuresStrArr.reduce((measures, measureStr) => {
    const beats = measureStr.split('-');
    const measure = new Measure(instrumentGroups, timeDivision, beatsCount, beatsPerFullNote);

    beats.forEach((insStr, beatIdx) => {
      ensureArray(insStr.match(/.{3}/g)).forEach((ins) => {
        const instrument = longInstrumentLiterals[ins];
        if (isInstrument(instrument)) {
          const group = getGroupByInstrument(instrument);
          measure.notes[group][beatIdx] = instrument;
        }
      });
    });

    measures.push(measure);
    return measures;
  }, []);
};

export const getGroupByInstrument = (instrument: Instrument) => {
  return instrument.substring(0, 2) as InstrumentGroup;
};

export const isTriplet = (timeDivision: number) => {
  return timeDivision % 12 === 0;
};
