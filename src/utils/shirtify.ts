import type { Groove, Measure } from '../types';
import { createEmptyMeasure, getInstrumentsByIndex } from './groove';
import { isInstrument } from './guards';
import { longInstrumentMap, shirtInstrumentMap, shirtSymbolsMap as symbols } from './maps';

export const readStringParamValue = (settingsString: string, shirtParam: string) => {
  const pattern = new RegExp(`${shirtParam}[0-9]+`, 'g');
  const matches = Array.from(settingsString.match(pattern) || ['']);
  return matches[0].substring(1);
};

export const readStringTimeSignature = (
  param: string
): [beatsCount: number, beatsPerFullNote: number] =>
  Number(param.slice(0, 2)) > 16
    ? [Number(param.slice(0, 1)), Number(param.slice(1))]
    : [Number(param.slice(0, 2)), Number(param.slice(2))];

/*
 * TO string
 */

export const createStringMeasure = (measure: Measure) => {
  const signature = symbols.timeSignature + measure.beatsCount + measure.beatsPerFullNote;
  const timeDivision = symbols.timeDivision + measure.timeDivision;
  const settings = signature + timeDivision;

  let measureString = settings + symbols.measureSettingsDelimiter;

  for (let rhythmIndex = 0; rhythmIndex < measure.length; rhythmIndex++) {
    if (rhythmIndex !== 0) measureString += symbols.beatDelimiter;

    const instruments = getInstrumentsByIndex(measure, rhythmIndex);

    instruments.forEach((instrument) => {
      measureString += shirtInstrumentMap[instrument] || '';
    });
  }

  return measureString;
};

export const createStringGroove = (groove: Groove) => {
  const tempo = symbols.tempo + groove.tempo;
  const measures = groove.measures.map(createStringMeasure).join(symbols.measureDelimiter);
  return tempo + symbols.grooveSettingsDelimiter + measures;
};

/*
 * FROM string
 */

export const createMeasureFromString = (str: string): Measure[] => {
  const measuresStrArr = str.split(symbols.measureDelimiter);

  return measuresStrArr.reduce<Measure[]>((measures, measureStr) => {
    const [measureSettingsString = '', notesStr = ''] = measureStr.split(
      symbols.measureSettingsDelimiter
    );

    const signature = readStringParamValue(measureSettingsString, symbols.timeSignature);
    const timeDivision = Number(readStringParamValue(measureSettingsString, symbols.timeDivision));
    const [beatsCount, beatsPerFullNote] = readStringTimeSignature(signature);
    const beats = notesStr.split(symbols.beatDelimiter);
    const measure = createEmptyMeasure(timeDivision, beatsCount, beatsPerFullNote);
    const slicedBeats = beats.slice(0, measure.length);

    slicedBeats.forEach((insStr, rhythmIndex) => {
      const matches = Array.from(insStr.match(/.{3}/g) || []);

      matches.forEach((ins) => {
        const instrument = longInstrumentMap[ins];
        if (isInstrument(instrument)) {
          const instrumentNotes = measure.instruments[instrument] || [];
          instrumentNotes[rhythmIndex] = true;
          measure.instruments[instrument] = instrumentNotes;
        }
      });
    });

    measures.push(measure);
    return measures;
  }, []);
};

export const createGrooveFromString = (str: string): Groove => {
  const [settingsString, measuresStr] = str.split(symbols.grooveSettingsDelimiter);
  const tempo = Number(readStringParamValue(settingsString, symbols.tempo));
  const measures = createMeasureFromString(measuresStr);
  return { tempo, measures };
};
