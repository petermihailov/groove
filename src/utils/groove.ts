import { safeKeys } from './safe-keys';
import { instruments } from '../constants';
import type {
  Bar,
  Instrument,
  InstrumentGroup,
  InstrumentGroupEnabled,
  BarInstruments,
  BarInstrumentsByGroups,
  TimeDivision,
} from '../types';

export const getUsedGroups = (bars: Bar[]) => {
  const groups: InstrumentGroupEnabled = {
    cy: false,
    hh: false,
    ki: false,
    sn: false,
    t1: false,
    t2: false,
    t3: false,
  };

  for (const bar of bars) {
    for (const instrument in bar.instruments) {
      const group = getGroupByInstrument(instrument as Instrument);

      if (!groups[group] && bar.instruments[instrument as Instrument]?.some(Boolean)) {
        groups[group] = true;
      }
    }
  }

  return groups;
};

export const createEmptyInstruments = () =>
  instruments.reduce<BarInstruments>((res, key) => {
    res[key] = [];
    return res;
  }, {} as BarInstruments);

export const createEmptyBar = (
  timeDivision: TimeDivision,
  beatsPerBar: number,
  noteValue: number,
): Bar => {
  return {
    beatsPerBar,
    noteValue,
    timeDivision,
    length: (timeDivision / noteValue) * beatsPerBar,
    instruments: createEmptyInstruments(),
  };
};

export const getGroupByInstrument = (instrument: Instrument) => {
  return instrument.substring(0, 2) as InstrumentGroup;
};

export const getInstrumentsByGroup = (group: InstrumentGroup) => {
  return instruments.filter((instrument) => instrument.startsWith(group));
};

export const getInstrumentsByIndex = (bar: Bar, rhythmIndex: number): Instrument[] => {
  return safeKeys(bar.instruments).filter((key) => {
    return bar.instruments[key][rhythmIndex];
  });
};

export const scaleBar = (
  bar: Bar,
  noteValue: number,
  beatsPerBar: number,
  timeDivision: TimeDivision,
): Bar => {
  const scale = timeDivision / bar.timeDivision;
  const newBar = createEmptyBar(timeDivision, beatsPerBar, noteValue);

  newBar.instruments = safeKeys(bar.instruments).reduce<BarInstruments>((res, key) => {
    bar.instruments[key].forEach((note, rhythmIndex) => {
      if (note) {
        res[key][Math.floor(rhythmIndex * scale)] = note;
      }
    });

    return res;
  }, createEmptyInstruments());

  return newBar;
};

export const convertBarInstrumentsByGroups = (bar: Bar): BarInstrumentsByGroups => {
  return safeKeys(bar.instruments).reduce<BarInstrumentsByGroups>((res, key) => {
    const groupName = getGroupByInstrument(key);

    if (!res[groupName]) {
      res[groupName] = new Array(bar.length).fill(null);
    }

    const notes = bar.instruments[key].map((hasNote) => (hasNote ? key : null));

    notes.forEach((instrument, rhythmIndex) => {
      if (instrument && rhythmIndex < bar.length) {
        res[groupName][rhythmIndex] = instrument;
      }
    });

    return res;
  }, {} as BarInstrumentsByGroups);
};

export const isTriplet = (timeDivision: number) => {
  return timeDivision % 12 === 0;
};
