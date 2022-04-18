import type { Instrument } from '../types';
import type { Groove } from './Groove';
import type { Kit } from './Kit';

type OnBeatCallback = (measureIndex: number, rhythmIndex: number) => void;

export class Player {
  private readonly audioCtx: AudioContext;
  private readonly onBeat: OnBeatCallback;
  private readonly safetyBuffer: number;
  private readonly kit: Kit;
  private groove: Groove;
  private measureIndex: number;
  private nextBeatAt: number;
  private rhythmIndex: number;
  private scheduledBuffers: AudioBufferSourceNode[];
  private playingHatOpenBuffers: AudioBufferSourceNode[];
  private timeoutId: number;

  constructor(audioCtx: AudioContext, kit: Kit, groove: Groove, onBeat: OnBeatCallback) {
    this.audioCtx = audioCtx;
    this.onBeat = onBeat;
    this.kit = kit;
    this.groove = groove;
    this.measureIndex = 0;
    this.rhythmIndex = 0;
    this.nextBeatAt = 0;
    this.timeoutId = null;
    this.safetyBuffer = 0.25;
    this.scheduledBuffers = [];
    this.playingHatOpenBuffers = [];
  }

  setGroove(groove: Groove) {
    this.stop();
    this.groove = groove;
  }

  setTempo(tempo: number) {
    this.groove.tempo = tempo;
  }

  play() {
    this.kit.load().then(() => {
      this.measureIndex = 0;
      this.rhythmIndex = 0;
      const measure = this.groove.measures[this.measureIndex];

      // Ensure that initial notes are played at once by scheduling the playback slightly in the future.
      this.nextBeatAt = (this.audioCtx.currentTime + this.safetyBuffer) * 1000;

      for (const group of measure.instrumentGroups) {
        this.playNoteAtTime(measure.notes[group][this.rhythmIndex], this.nextBeatAt);
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

  schedule(playNoteNow?: boolean) {
    this.scheduledBuffers = [];
    const { nextMeasureIndex, nextRhythmIndex } = this.getNextBeat();

    if (playNoteNow) {
      this.onBeat?.(this.measureIndex, this.rhythmIndex);
    }

    const currentMeasure = this.groove.measures[this.measureIndex];
    const nextMeasure = this.groove.measures[nextMeasureIndex];

    this.nextBeatAt +=
      (1000 * 60) /
      ((this.groove.tempo * currentMeasure.timeDivision) / currentMeasure.beatsPerFullNote);

    let hasNote = false;
    for (const group of nextMeasure.instrumentGroups) {
      const note = nextMeasure.notes[group][nextRhythmIndex];

      if (note && note.startsWith('hh') && !note.startsWith('hhOpen')) {
        window.setTimeout(() => {
          this.playingHatOpenBuffers.forEach((buffer) => buffer.stop());
          this.playingHatOpenBuffers = [];
        }, this.getScheduleTimeout());
      }

      this.playNoteAtTime(note, this.nextBeatAt);
      if (!hasNote && note) hasNote = true;
    }

    this.measureIndex = nextMeasureIndex;
    this.rhythmIndex = nextRhythmIndex;
    this.timeoutId = window.setTimeout(() => this.schedule(hasNote), this.getScheduleTimeout());
  }

  getScheduleTimeout() {
    return this.nextBeatAt - this.audioCtx.currentTime * 1000;
  }

  getNextBeat() {
    const isLastRhythmIndex =
      this.rhythmIndex === this.groove.measures[this.measureIndex].timeDivision - 1;
    const isLastMeasureIndex = this.measureIndex === this.groove.measures.length - 1;
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

  playNoteAtTime(instrument: Instrument, when: number, duration?: number) {
    if (instrument) {
      const whenSeconds = when / 1000;
      const durationSeconds = duration ? duration / 1000 : undefined;
      const source = new AudioBufferSourceNode(this.audioCtx, {
        buffer: this.kit.buffer[instrument],
      });
      source.connect(this.audioCtx.destination);
      source.start(whenSeconds, 0, durationSeconds);
      this.scheduledBuffers.push(source);

      if (instrument.startsWith('hhOpen')) {
        this.playingHatOpenBuffers.push(source);
      }
    }
  }
}
