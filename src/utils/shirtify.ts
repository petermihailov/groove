import { getGroupByInstrument, getInstrumentsByIndex, getUsedGroups } from './groove';
import { isInstrument, isTimeDivision } from './guards';
import { longInstrumentMap, shirtInstrumentMap, shirtSymbolsMap as symbols } from './maps';
import type { Groove, Bar, Instrument } from '../types/instrument';

export const readStringParamValue = (settingsString: string, shirtParam: string) => {
  const pattern = new RegExp(`${shirtParam}[0-9]+`, 'g');
  const matches = Array.from(settingsString.match(pattern) || ['']);
  return matches[0].substring(1);
};

export const readStringTimeSignature = (param: string): [beatsPerBar: number, noteValue: number] =>
  Number(param.slice(0, 2)) > 16
    ? [Number(param.slice(0, 1)), Number(param.slice(1))]
    : [Number(param.slice(0, 2)), Number(param.slice(2))];

/*
 * TO string
 */

export const createStringBar = (bar: Bar): string => {
  const signature = symbols.timeSignature + bar.beatsPerBar + bar.noteValue;
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

export const createBarsFromString = (str: string): Bar[] => {
  const barsStrArr = str.split(symbols.barDelimiter);

  return barsStrArr.reduce<Bar[]>((bars, barStr) => {
    const [barSettingsString = '', notesStr = ''] = barStr.split(symbols.barSettingsDelimiter);

    const signature = readStringParamValue(barSettingsString, symbols.timeSignature);
    const timeDivision = Number(readStringParamValue(barSettingsString, symbols.timeDivision));
    const [beatsPerBar, noteValue] = readStringTimeSignature(signature);

    if (!isTimeDivision(timeDivision)) {
      throw new Error('groove damaged');
    }

    const beats = notesStr.split(symbols.beatDelimiter);

    const bar: Bar = {
      beatsPerBar,
      noteValue,
      timeDivision,
      length: (timeDivision / noteValue) * beatsPerBar,
      groups: {},
    };

    const slicedBeats = beats.slice(0, bar.length);

    slicedBeats.forEach((insStr, rhythmIndex) => {
      const matches = Array.from(insStr.match(/.{3}/g) || []);

      matches.forEach((ins) => {
        const instrument = longInstrumentMap[ins];

        if (isInstrument(instrument)) {
          const group = getGroupByInstrument(instrument);

          if (!Array.isArray(bar.groups[group])) {
            bar.groups[group] = new Array(length).fill(null);
          }

          (bar.groups[group] as Instrument[])[rhythmIndex] = instrument;
        }
      });
    });

    bars.push(bar);
    return bars;
  }, []);
};

export const createGrooveFromString = (str: string): Groove => {
  const [settingsString, barsStr] = str.split(symbols.grooveSettingsDelimiter);
  const title = readStringParamValue(settingsString, symbols.title);
  const tempo = Number(readStringParamValue(settingsString, symbols.tempo));
  const bars = createBarsFromString(barsStr);
  const groups = getUsedGroups(bars);

  return { title, tempo, bars, groups };
};
