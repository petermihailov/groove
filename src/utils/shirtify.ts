import type { Groove, Bar } from '../types';
import { createEmptyBar, getInstrumentsByIndex } from './groove';
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

export const createStringBar = (bar: Bar) => {
  const signature = symbols.timeSignature + bar.beatsCount + bar.beatsPerFullNote;
  const timeDivision = symbols.timeDivision + bar.timeDivision;
  const settings = signature + timeDivision;

  let barString = settings + symbols.barSettingsDelimiter;

  for (let rhythmIndex = 0; rhythmIndex < bar.length; rhythmIndex++) {
    if (rhythmIndex !== 0) barString += symbols.beatDelimiter;

    const instruments = getInstrumentsByIndex(bar, rhythmIndex);

    instruments.forEach((instrument) => {
      barString += shirtInstrumentMap[instrument] || '';
    });
  }

  return barString;
};

export const createStringGroove = (groove: Groove) => {
  const tempo = symbols.tempo + groove.tempo;
  const bars = groove.bars.map(createStringBar).join(symbols.barDelimiter);
  return tempo + symbols.grooveSettingsDelimiter + bars;
};

/*
 * FROM string
 */

export const createBarFromString = (str: string): Bar[] => {
  const barsStrArr = str.split(symbols.barDelimiter);

  return barsStrArr.reduce<Bar[]>((bars, barStr) => {
    const [barSettingsString = '', notesStr = ''] = barStr.split(symbols.barSettingsDelimiter);

    const signature = readStringParamValue(barSettingsString, symbols.timeSignature);
    const timeDivision = Number(readStringParamValue(barSettingsString, symbols.timeDivision));
    const [beatsCount, beatsPerFullNote] = readStringTimeSignature(signature);
    const beats = notesStr.split(symbols.beatDelimiter);
    const bar = createEmptyBar(timeDivision, beatsCount, beatsPerFullNote);
    const slicedBeats = beats.slice(0, bar.length);

    slicedBeats.forEach((insStr, rhythmIndex) => {
      const matches = Array.from(insStr.match(/.{3}/g) || []);

      matches.forEach((ins) => {
        const instrument = longInstrumentMap[ins];
        if (isInstrument(instrument)) {
          const instrumentNotes = bar.instruments[instrument] || [];
          instrumentNotes[rhythmIndex] = true;
          bar.instruments[instrument] = instrumentNotes;
        }
      });
    });

    bars.push(bar);
    return bars;
  }, []);
};

export const createGrooveFromString = (str: string): Groove => {
  const [settingsString, barsStr] = str.split(symbols.grooveSettingsDelimiter);
  const tempo = Number(readStringParamValue(settingsString, symbols.tempo));
  const bars = createBarFromString(barsStr);
  return { tempo, bars };
};
