import type { Instrument, InstrumentGroup } from '../types';
import type { Measure } from './Measure';

export class Groove {
  measures: Measure[];
  tempo: number;

  constructor(tempo: number, measures: Measure[]) {
    this.measures = measures;
    this.tempo = tempo;
  }

  addMeasure(measure: Measure) {
    this.measures.push(measure);
  }

  removeMeasure(measure: Measure) {
    this.measures = this.measures.filter((cur) => cur !== measure);
  }

  editNote(
    measureIndex: number,
    rhythmIndex: number,
    group: InstrumentGroup,
    instrument: Instrument
  ) {
    this.measures[measureIndex].editNote(rhythmIndex, group, instrument);
  }
}
