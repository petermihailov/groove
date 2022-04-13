import type { Instrument } from '../types';
import type { Measure } from './Measure';

type OnChangeCallback = () => void;

export class Groove {
  measures: Measure[];
  tempo: number;
  onChange: OnChangeCallback;

  constructor(tempo: number, measures: Measure[], onChange?: OnChangeCallback) {
    this.measures = measures;
    this.tempo = tempo;
    this.onChange = onChange;
  }

  addMeasure(measure: Measure) {
    this.measures.push(measure);
  }

  removeMeasure(measure: Measure) {
    this.measures = this.measures.filter((cur) => cur !== measure);
  }

  editNote(measureIndex: number, rhythmIndex: number, instrument: Instrument) {
    this.measures[measureIndex].editNote(rhythmIndex, instrument);
  }
}
