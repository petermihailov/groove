import type { Instrument, Instruments } from '../types';

type Notes = Record<Instrument, boolean[]>;

export class Measure {
  readonly instruments: Instruments;
  private beatsCount: number;
  beatsPerFullNote: number;
  private length: number;
  msPerBeat: number;
  notes: Notes;
  timeDivision: number;

  constructor(instruments: Instruments, timeDivision = 16, beatsCount = 4, beatsPerFullNote = 4) {
    this.instruments = instruments;
    this.timeDivision = timeDivision;
    this.beatsCount = beatsCount;
    this.beatsPerFullNote = beatsPerFullNote;

    this.length = this.calcLength(timeDivision, beatsCount, beatsPerFullNote);
    this.notes = this.createNotes(instruments, this.length);
  }

  isTriplet(timeDivision: number) {
    return timeDivision % 12 === 0;
  }

  calcLength(timeDivision: number, beatsCount: number, beatsPerFullNote: number) {
    return (timeDivision / beatsPerFullNote) * beatsCount;
  }

  createNotes(instruments: Instruments, length: number) {
    return instruments.reduce<Notes>((measure, instrument) => {
      measure[instrument] = new Array(length).fill(false);
      return measure;
    }, {} as Notes);
  }

  getMsPerBeat(tempo: number) {
    return;
  }

  scale(timeDivision: number, beatsCount = 4, beatsPerFullNote = 4) {
    const scale = timeDivision / this.timeDivision;
    const length = this.calcLength(timeDivision, beatsCount, beatsPerFullNote);
    const notes = this.createNotes(this.instruments, length);

    this.timeDivision = timeDivision;
    this.beatsCount = beatsCount;
    this.beatsPerFullNote = beatsPerFullNote;
    this.length = length;

    this.notes = Object.entries(this.notes).reduce<Notes>((newNotes, [instrument, oldValues]) => {
      oldValues.forEach((note, idx) => {
        if (note) {
          const noteIndex = Math.floor(idx * scale);
          newNotes[instrument as Instrument][noteIndex] = note;
        }
      });

      return newNotes;
    }, notes);
  }

  clear() {
    this.notes = this.createNotes(this.instruments, this.length);
  }
}
