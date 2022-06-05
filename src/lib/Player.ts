import type { Beat, Instrument, Bar, DrumKit } from '../types';
import { getAudioContext, getInstrumentsByIndex } from '../utils';

const safetyBuffer = 0.25; // seconds

export class Player {
  private readonly audioCtx: AudioContext;
  private kit: DrumKit;
  private bars: Bar[];
  private tempo: number;
  private nextBeatAt: number;
  private scheduledBuffers: AudioBufferSourceNode[];
  private hhOpenBuffers: AudioBufferSourceNode[];
  private onBeat: (beat: Beat) => void;
  private timeoutId: number | undefined;

  constructor() {
    this.kit = {} as DrumKit;
    this.bars = [];
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

  setBars(bars: Bar[]) {
    this.bars = bars;
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
      const source = this.audioCtx.createBufferSource();
      source.buffer = this.kit[instrument];
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

    const { barIndex, rhythmIndex } = currentBeat;
    const { nextBarIndex, nextRhythmIndex } = getNextBeatPosition(this.bars, barIndex, rhythmIndex);

    const currentBar = this.bars[barIndex];
    const nextBar = this.bars[nextBarIndex];

    this.nextBeatAt +=
      (1000 * 60) / ((this.tempo * currentBar.timeDivision) / currentBar.noteValue);

    const instruments = getInstrumentsByIndex(nextBar, nextRhythmIndex);
    this.playNotesAtTime(instruments, this.nextBeatAt);

    this.onBeat(currentBeat);

    this.timeoutId = window.setTimeout(
      () =>
        this.schedule({
          barIndex: nextBarIndex,
          rhythmIndex: nextRhythmIndex,
          playNote: Boolean(instruments.length),
        }),
      this.nextBeatAt - this.audioCtx.currentTime * 1000
    );
  }

  play() {
    const bar = this.bars[0];

    this.nextBeatAt = (this.audioCtx.currentTime + safetyBuffer) * 1000;
    const instruments = getInstrumentsByIndex(bar, 0);
    this.playNotesAtTime(instruments, this.nextBeatAt);

    this.schedule({
      barIndex: 0,
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
      barIndex: 0,
      rhythmIndex: 0,
      playNote: true,
    });
  }
}

/* Utils */

function getNextBeatPosition(bars: Bar[], barIndex: number, rhythmIndex: number) {
  const isLastRhythmIndex = rhythmIndex === bars[barIndex].length - 1;
  const isLastBarIndex = barIndex === bars.length - 1;
  const nextRhythmIndex = isLastRhythmIndex ? 0 : rhythmIndex + 1;

  let nextBarIndex = barIndex;

  if (isLastRhythmIndex) {
    if (isLastBarIndex) {
      nextBarIndex = 0;
    } else {
      nextBarIndex += 1;
    }
  }

  return { nextBarIndex, nextRhythmIndex };
}
