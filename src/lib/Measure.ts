import type { Instrument, InstrumentGroup } from '../types';

type Notes = Record<InstrumentGroup, Instrument[]>;

export class Measure {
  readonly instrumentGroups: InstrumentGroup[];
  beatsCount: number;
  beatsPerFullNote: number;
  length: number;
  notes: Notes;
  timeDivision: number;

  constructor(
    instrumentGroups: InstrumentGroup[],
    timeDivision = 16,
    beatsCount = 4,
    beatsPerFullNote = 4
  ) {
    this.instrumentGroups = instrumentGroups;
    this.timeDivision = timeDivision;
    this.beatsCount = beatsCount;
    this.beatsPerFullNote = beatsPerFullNote;

    this.length = this.calcLength(timeDivision, beatsCount, beatsPerFullNote);
    this.notes = this.fillWithNull(this.length);
  }

  calcLength(timeDivision: number, beatsCount: number, beatsPerFullNote: number) {
    return (timeDivision / beatsPerFullNote) * beatsCount;
  }

  fillWithNull(length: number) {
    return this.instrumentGroups.reduce<Notes>((notes, group) => {
      notes[group] = new Array(length).fill(null);
      return notes;
    }, {} as Notes);
  }

  scale(timeDivision: number, beatsCount = 4, beatsPerFullNote = 4) {
    const scale = timeDivision / this.timeDivision;
    const length = this.calcLength(timeDivision, beatsCount, beatsPerFullNote);
    const notes = this.fillWithNull(length);

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

  editNote(rhythmIndex: number, group: InstrumentGroup, instrument: Instrument) {
    this.notes[group][rhythmIndex] = instrument;
  }

  clear() {
    this.notes = this.fillWithNull(this.length);
  }
}