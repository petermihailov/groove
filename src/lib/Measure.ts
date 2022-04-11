import type { Instrument, InstrumentGroups, InstrumentGroup } from '../types';

type Notes = Record<InstrumentGroup, Instrument[]>;

export class Measure {
  readonly instrumentGroups: InstrumentGroups;
  beatsCount: number;
  beatsPerFullNote: number;
  length: number;
  notes: Notes;
  timeDivision: number;

  constructor(
    instrumentGroups: InstrumentGroups,
    timeDivision = 16,
    beatsCount = 4,
    beatsPerFullNote = 4
  ) {
    this.instrumentGroups = instrumentGroups;
    this.timeDivision = timeDivision;
    this.beatsCount = beatsCount;
    this.beatsPerFullNote = beatsPerFullNote;

    this.length = this.calcLength(timeDivision, beatsCount, beatsPerFullNote);
    this.notes = this.createNotes(instrumentGroups, this.length);
  }

  isTriplet(timeDivision: number) {
    return timeDivision % 12 === 0;
  }

  calcLength(timeDivision: number, beatsCount: number, beatsPerFullNote: number) {
    return (timeDivision / beatsPerFullNote) * beatsCount;
  }

  createNotes(instrumentGroups: InstrumentGroups, length: number) {
    return instrumentGroups.reduce<Notes>((notes, group) => {
      notes[group] = new Array(length).fill(null);
      return notes;
    }, {} as Notes);
  }

  scale(timeDivision: number, beatsCount = 4, beatsPerFullNote = 4) {
    const scale = timeDivision / this.timeDivision;
    const length = this.calcLength(timeDivision, beatsCount, beatsPerFullNote);
    const notes = this.createNotes(this.instrumentGroups, length);

    this.timeDivision = timeDivision;
    this.beatsCount = beatsCount;
    this.beatsPerFullNote = beatsPerFullNote;
    this.length = length;

    this.notes = Object.entries(this.notes).reduce<Notes>((newNotes, [group, oldInstruments]) => {
      oldInstruments.forEach((note, idx) => {
        if (note) {
          const noteIndex = Math.floor(idx * scale);
          newNotes[group as InstrumentGroup][noteIndex] = note;
        }
      });

      return newNotes;
    }, notes);
  }

  clear() {
    this.notes = this.createNotes(this.instrumentGroups, this.length);
  }

  toString() {
    this.notes;
  }
}
