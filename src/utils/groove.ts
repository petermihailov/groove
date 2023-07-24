import { safeKeys } from './safe-keys';
import { groups as groupsConst, instruments } from '../constants';
import type { Bar, BarGroup, Instrument, Group, TimeDivision } from '../types/instrument';

export const orderGroups = (groups: Group[]): Group[] => {
  return groupsConst.filter((key) => groups.includes(key));
};

export const getUsedGroups = (bars: Bar[]) => {
  const groups: Group[] = [];

  for (const bar of bars) {
    const entries = Object.entries(bar.groups);

    for (const [group, instruments] of entries) {
      if (instruments.some(Boolean)) {
        groups.push(group as Group);
      }
    }
  }

  return groups;
};

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
    groups: {},
  };
};

export const getGroupByInstrument = (instrument: Instrument) => {
  return instrument.substring(0, 2) as Group;
};

export const getInstrumentsByGroup = (group: Group) => {
  return instruments.filter((instrument) => instrument.startsWith(group));
};

export const getInstrumentsByIndex = (
  bar: Bar,
  rhythmIndex: number,
  muted: Group[] = [],
): Instrument[] => {
  return safeKeys(bar.groups).reduce<Instrument[]>((acc, key) => {
    if (!muted.includes(key)) {
      const instrument = bar.groups[key]![rhythmIndex];

      if (instrument) {
        acc.push(instrument);
      }
    }

    return acc;
  }, []);
};

export const scaleBar = (
  bar: Bar,
  noteValue: number,
  beatsPerBar: number,
  timeDivision: TimeDivision,
): Bar => {
  const scale = timeDivision / bar.timeDivision;

  const scaledBar = createEmptyBar(timeDivision, beatsPerBar, noteValue);
  scaledBar.groups = safeKeys(bar.groups).reduce<BarGroup>((res, key) => {
    bar.groups[key]!.forEach((note, rhythmIndex) => {
      if (note) {
        res[key][Math.floor(rhythmIndex * scale)] = note;
      }
    });

    return res;
  }, {} as BarGroup);

  return scaledBar;
};

export const isTriplet = (timeDivision: number) => {
  return timeDivision % 12 === 0;
};
