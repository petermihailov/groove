import type { Beat, Instrument, Bar, DrumKit } from '../types/instrument';
import { getAudioContext } from '../utils/audio';
import { getInstrumentsByIndex } from '../utils/groove';

export class Player {
  private readonly audioCtx: AudioContext;
  private kit: DrumKit;
  private bars: Bar[];
  private tempo: number;
  private nextBeatAt: number;
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
    this.hhOpenBuffers = [];
  }

  public setKit(kit: DrumKit) {
    this.kit = kit;
  }

  public setBars(bars: Bar[]) {
    this.bars = bars;
  }

  public setTempo(tempo: number) {
    this.tempo = tempo;
  }

  public setOnBeat(onBeat: (beat: Beat) => void) {
    this.onBeat = onBeat;
  }

  public play() {
    const bar = this.bars[0];
    const instruments = getInstrumentsByIndex(bar, 0);

    this.nextBeatAt = this.audioCtx.currentTime;
    this.playNotesAtNextBeatTime(instruments, this.nextBeatAt);
    this.schedule(0, 0, instruments);
  }

  public stop() {
    window.clearTimeout(this.timeoutId);
    this.hhOpenBuffers.forEach((buffer) => buffer.stop());
    this.hhOpenBuffers = [];

    this.onBeat({
      barIndex: 0,
      rhythmIndex: 0,
      instruments: [],
    });
  }

  private playNotesAtNextBeatTime(instruments: Instrument[], time: number) {
    instruments.forEach((instrument) => {
      const source = this.audioCtx.createBufferSource();
      source.buffer = this.kit[instrument];
      source.connect(this.audioCtx.destination);
      source.start(time);

      if (instrument.startsWith('hh')) {
        if (instrument.startsWith('hhOpen')) {
          this.hhOpenBuffers.push(source);
        } else {
          this.hhOpenBuffers.forEach((buffer) => {
            buffer.stop(time);
          });
          this.hhOpenBuffers = [];
        }
      }
    });
  }

  schedule(barIndex: number, rhythmIndex: number, instruments: Instrument[]) {
    // Current
    this.onBeat({ barIndex, rhythmIndex, instruments });
    const { timeDivision, noteValue } = this.bars[barIndex];

    // Schedule next
    this.nextBeatAt += 60 / ((this.tempo * timeDivision) / noteValue);

    const nextRhythmIndex = (rhythmIndex + 1) % this.bars[barIndex].length;
    const nextBarIndex =
      rhythmIndex === this.bars[barIndex].length - 1 ? (barIndex + 1) % this.bars.length : barIndex;

    const nextInstruments = getInstrumentsByIndex(this.bars[nextBarIndex], nextRhythmIndex);

    this.playNotesAtNextBeatTime(nextInstruments, this.nextBeatAt);

    this.timeoutId = window.setTimeout(
      this.schedule.bind(this, nextBarIndex, nextRhythmIndex, nextInstruments),
      (this.nextBeatAt - this.audioCtx.currentTime) * 1000,
    );
  }
}
