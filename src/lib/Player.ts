import type { Beat, Instrument, Bar, DrumKit, Group } from '../types/instrument';
import { getAudioContext } from '../utils/audio';
import { getInstrumentsByIndex } from '../utils/groove';

export class Player {
  private readonly audioCtx: AudioContext;
  private kit: DrumKit;
  private bars: Bar[];
  private tempo: number;
  private metronome: boolean;
  private metronomeSubdivision: number;
  private muted: Group[];
  private nextBeatAt: number;
  private onBeat: (beat: Beat) => void;
  private hhOpenBuffers: AudioBufferSourceNode[];
  private fxOpenBuffers: AudioBufferSourceNode[];
  private timeoutId: number | undefined;

  constructor() {
    this.kit = {} as DrumKit;
    this.bars = [];
    this.tempo = 80;
    this.metronome = false;
    this.metronomeSubdivision = 1;
    this.muted = [];
    this.nextBeatAt = 0;
    this.onBeat = () => undefined;
    this.audioCtx = getAudioContext();
    this.hhOpenBuffers = [];
    this.fxOpenBuffers = [];
  }

  public setKit(kit: DrumKit) {
    this.kit = kit;
  }

  public setBars(bars: Bar[]) {
    this.bars = bars;
  }

  public setTempo(bpm: number) {
    this.tempo = bpm;
  }

  public playMetronome() {
    this.metronome = true;
  }

  public stopMetronome() {
    this.metronome = false;
  }

  public setMetronomeSubdivision(subdivision: number) {
    this.metronomeSubdivision = subdivision;
  }

  public mute(group: Group) {
    this.muted.push(group);
  }

  public unmute(group: Group) {
    this.muted = this.muted.filter((key) => key !== group);
  }

  public isMuted(group: Group) {
    this.muted.includes(group);
  }

  public setOnBeat(onBeat: (beat: Beat) => void) {
    this.onBeat = onBeat;
  }

  public play() {
    const bar = this.bars[0];
    const instruments = getInstrumentsByIndex(bar, 0, this.muted);

    this.nextBeatAt = this.audioCtx.currentTime;

    this.scheduleMetronome(bar);
    this.playNotesAtNextBeatTime(instruments, this.nextBeatAt);
    this.schedule(0, 0, instruments);
  }

  public stop() {
    window.clearTimeout(this.timeoutId);
    this.hhOpenBuffers.forEach((buffer) => buffer.stop());
    this.fxOpenBuffers.forEach((buffer) => buffer.stop());
    this.hhOpenBuffers = [];
    this.fxOpenBuffers = [];

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

      if (instrument.startsWith('fxMetronome')) {
        this.fxOpenBuffers.push(source);
      }

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
    // Callback current
    this.onBeat({ barIndex, rhythmIndex, instruments });

    // Schedule next
    this.nextBeatAt += getNextTimeOffset(this.tempo, this.bars[barIndex]);

    const nextRhythmIndex = (rhythmIndex + 1) % this.bars[barIndex].length;
    const nextBarIndex =
      rhythmIndex === this.bars[barIndex].length - 1 ? (barIndex + 1) % this.bars.length : barIndex;
    const nextBar = this.bars[nextBarIndex];

    // Schedule metronome
    if (nextRhythmIndex === 0) {
      this.scheduleMetronome(nextBar);
    }

    const nextInstruments = getInstrumentsByIndex(nextBar, nextRhythmIndex, this.muted);

    // Schedule next beat
    this.playNotesAtNextBeatTime(nextInstruments, this.nextBeatAt);

    this.timeoutId = window.setTimeout(
      this.schedule.bind(this, nextBarIndex, nextRhythmIndex, nextInstruments),
      (this.nextBeatAt - this.audioCtx.currentTime) * 1000,
    );
  }

  // Schedule metronome for the whole bar
  // Should call when rhythmIndex === 0
  scheduleMetronome(bar: Bar) {
    if (this.metronome) {
      const timeOffset = getNextTimeOffset(this.tempo, bar);
      const timeStep = (timeOffset * bar.length) / bar.beatsPerBar;

      for (let i = 0; i < bar.beatsPerBar; i++) {
        const instrument = i === 0 ? 'fxMetronomeAccent' : 'fxMetronomeRegular';
        this.playNotesAtNextBeatTime([instrument], this.nextBeatAt + timeStep * i);
      }
    }
  }
}

function getNextTimeOffset(tempo: number, bar: Bar): number {
  return 60 / ((tempo * bar.timeDivision) / bar.noteValue);
}
