import {
  instrumentGroups,
  instruments,
  longInstrumentLiterals,
  shirtInstrumentLiterals,
} from '../constants';
import { Measure } from '../lib/Measure';
import type { Instrument, InstrumentGroup } from '../types';
import { ensureArray } from './array';
import { isInstrument } from './guards';

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

export const createMeasureFromShirtRecord = (str: string) => {
  const beats = str.split('-');
  const measure = new Measure(instrumentGroups);

  beats.forEach((insStr, beatIdx) => {
    ensureArray(insStr.match(/.{3}/g)).forEach((ins) => {
      const instrument = longInstrumentLiterals[ins];
      if (isInstrument(instrument)) {
        const group = getGroupByInstrument(instrument);
        measure.notes[group][beatIdx] = instrument;
      }
    });
  });

  return measure;
};

export const getGroupByInstrument = (instrument: Instrument) => {
  return instrument.substring(0, 2) as InstrumentGroup;
};
