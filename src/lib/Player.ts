import type { Beat, Instrument, Measure, DrumKit } from '../types';
import { getAudioContext, getInstrumentsByIndex } from '../utils';

const safetyBuffer = 0.25; // seconds

export class Player {
  private readonly audioCtx: AudioContext;
  private kit: DrumKit;
  private measures: Measure[];
  private tempo: number;
  private nextBeatAt: number;
  private scheduledBuffers: AudioBufferSourceNode[];
  private hhOpenBuffers: AudioBufferSourceNode[];
  private onBeat: (beat: Beat) => void;
  private timeoutId: number | undefined;

  constructor() {
    this.kit = {} as DrumKit;
    this.measures = [];
    this.tempo = 80;
    this.nextBeatAt = 0;
    this.onBeat = () => undefined;
    this.audioCtx = getAudioContext();
    this.scheduledBuffers = [];
    this.hhOpenBuffers = [];
  }

  setKit(kit: DrumKit) {
    this.kit = kit;
  }

  setMeasures(measures: Measure[]) {
    this.measures = measures;
  }

  setTempo(tempo: number) {
    this.tempo = tempo;
  }

  setOnBeat(onBeat: (beat: Beat) => void) {
    this.onBeat = onBeat;
  }

  playNotesAtTime(instruments: Instrument[], when: number) {
    const whenSeconds = when / 1000;

    instruments.forEach((instrument) => {
      const source = new AudioBufferSourceNode(this.audioCtx, {
        buffer: this.kit[instrument],
      });

      source.connect(this.audioCtx.destination);
      source.start(whenSeconds);
      this.scheduledBuffers.push(source);

      if (instrument.startsWith('hh') && !instrument.startsWith('hhOpen')) {
        this.hhOpenBuffers.forEach((buffer) => buffer.stop(whenSeconds));
        window.setTimeout(() => {
          this.hhOpenBuffers = [];
        }, (whenSeconds - this.audioCtx.currentTime) * 1000);
      }

      if (instrument.startsWith('hhOpen')) {
        this.hhOpenBuffers.push(source);
      }
    });
  }

  schedule(currentBeat: Beat) {
    this.scheduledBuffers = [];

    const { measureIndex, rhythmIndex } = currentBeat;
    const { nextMeasureIndex, nextRhythmIndex } = getNextBeatPosition(
      this.measures,
      measureIndex,
      rhythmIndex
    );

    const currentMeasure = this.measures[measureIndex];
    const nextMeasure = this.measures[nextMeasureIndex];

    this.nextBeatAt +=
      (1000 * 60) / ((this.tempo * currentMeasure.timeDivision) / currentMeasure.beatsPerFullNote);

    const instruments = getInstrumentsByIndex(nextMeasure, nextRhythmIndex);
    this.playNotesAtTime(instruments, this.nextBeatAt);

    this.onBeat(currentBeat);

    this.timeoutId = window.setTimeout(
      () =>
        this.schedule({
          measureIndex: nextMeasureIndex,
          rhythmIndex: nextRhythmIndex,
          playNote: Boolean(instruments.length),
        }),
      this.nextBeatAt - this.audioCtx.currentTime * 1000
    );
  }

  play() {
    const measure = this.measures[0];

    this.nextBeatAt = (this.audioCtx.currentTime + safetyBuffer) * 1000;
    const instruments = getInstrumentsByIndex(measure, 0);
    this.playNotesAtTime(instruments, this.nextBeatAt);

    this.schedule({
      measureIndex: 0,
      rhythmIndex: 0,
      playNote: Boolean(instruments.length),
    });
  }

  stop() {
    window.clearTimeout(this.timeoutId);
    this.scheduledBuffers.forEach((buffer) => buffer.stop());
    this.scheduledBuffers = [];
    this.hhOpenBuffers.forEach((buffer) => buffer.stop());
    this.hhOpenBuffers = [];
    this.onBeat({
      measureIndex: 0,
      rhythmIndex: 0,
      playNote: false,
    });
  }
}

/* Utils */

function getNextBeatPosition(measures: Measure[], measureIndex: number, rhythmIndex: number) {
  const isLastRhythmIndex = rhythmIndex === measures[measureIndex].length - 1;
  const isLastMeasureIndex = measureIndex === measures.length - 1;
  const nextRhythmIndex = isLastRhythmIndex ? 0 : rhythmIndex + 1;

  let nextMeasureIndex = measureIndex;

  if (isLastRhythmIndex) {
    if (isLastMeasureIndex) {
      nextMeasureIndex = 0;
    } else {
      nextMeasureIndex += 1;
    }
  }

  return { nextMeasureIndex, nextRhythmIndex };
}
