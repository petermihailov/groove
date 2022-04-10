import type { Instrument } from '../types';
import type { Kit } from './Kit';
import type { Measure } from './Measure';

type OnBeatCallback = (measureIndex: number, rhythmIndex: number) => void;

export class Player {
  private readonly audioCtx: AudioContext;
  private readonly onBeat: OnBeatCallback;
  private readonly safetyBuffer: number;
  private readonly kit: Kit;
  private tempo: number;
  private measures: Measure[];
  private measureIndex: number;
  private nextBeatAt: number;
  private rhythmIndex: number;
  private scheduledBuffers: AudioBufferSourceNode[];
  private timeoutId: number;

  constructor(audioCtx: AudioContext, kit: Kit, onBeat: OnBeatCallback) {
    this.audioCtx = audioCtx;
    this.measures = [];
    this.onBeat = onBeat;
    this.kit = kit;
    this.tempo = 80;
    this.measureIndex = 0;
    this.rhythmIndex = 0;
    this.nextBeatAt = 0;
    this.timeoutId = null;
    this.safetyBuffer = 0.25;
    this.scheduledBuffers = [];
  }

  addMeasure(measure: Measure) {
    this.measures.push(measure);
  }

  removeMeasure(index: number) {
    this.measures = this.measures.filter((_, idx) => idx !== index);
  }

  setTempo(tempo: number) {
    this.tempo = tempo;
  }

  play() {
    this.kit.load().then(() => {
      this.measureIndex = 0;
      this.rhythmIndex = 0;
      const measure = this.measures[this.measureIndex];

      // Ensure that initial notes are played at once by scheduling the playback slightly in the future.
      this.nextBeatAt = (this.audioCtx.currentTime + this.safetyBuffer) * 1000;

      for (const instrument of measure.instruments) {
        this.playNoteAtTime(
          instrument,
          measure.notes[instrument][this.rhythmIndex],
          this.nextBeatAt
        );
      }

      this.timeoutId = window.setTimeout(() => this.onBeat?.(0, 0), this.getScheduleTimeout());

      this.schedule();
    });
  }

  stop() {
    clearTimeout(this.timeoutId);
    this.scheduledBuffers.forEach((buffer) => buffer.stop());
    this.scheduledBuffers = [];
  }

  schedule() {
    this.scheduledBuffers = [];
    this.onBeat?.(this.measureIndex, this.rhythmIndex);
    const { nextMeasureIndex, nextRhythmIndex } = this.getNextBeat();

    const currentMeasure = this.measures[this.measureIndex];
    const nextMeasure = this.measures[nextMeasureIndex];

    this.nextBeatAt +=
      (1000 * 60) / ((this.tempo * currentMeasure.timeDivision) / currentMeasure.beatsPerFullNote);

    for (const instrument of nextMeasure.instruments) {
      this.playNoteAtTime(
        instrument,
        nextMeasure.notes[instrument][nextRhythmIndex],
        this.nextBeatAt
      );
    }

    this.measureIndex = nextMeasureIndex;
    this.rhythmIndex = nextRhythmIndex;
    this.timeoutId = window.setTimeout(() => this.schedule(), this.getScheduleTimeout());
  }

  getScheduleTimeout() {
    return this.nextBeatAt - this.audioCtx.currentTime * 1000;
  }

  getNextBeat() {
    const isLastRhythmIndex =
      this.rhythmIndex === this.measures[this.measureIndex].timeDivision - 1;
    const isLastMeasureIndex = this.measureIndex === this.measures.length - 1;
    const nextRhythmIndex = isLastRhythmIndex ? 0 : this.rhythmIndex + 1;

    let nextMeasureIndex = this.measureIndex;

    if (isLastRhythmIndex) {
      if (isLastMeasureIndex) {
        nextMeasureIndex = 0;
      } else {
        nextMeasureIndex += 1;
      }
    }

    return { nextMeasureIndex, nextRhythmIndex };
  }

  playNoteAtTime(instrument: Instrument, note: boolean, when?: number) {
    if (note) {
      const whenIsSeconds = when ? when / 1000 : 0;
      const source = new AudioBufferSourceNode(this.audioCtx, {
        buffer: this.kit.buffer[instrument],
      });
      source.connect(this.audioCtx.destination);
      source.start(whenIsSeconds);
      this.scheduledBuffers.push(source);
    }
  }
}
