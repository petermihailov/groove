import { instruments } from '../constants';
import type { Instrument } from '../types';
import { fetchAndDecodeAudio } from '../utils';

export class Kit {
  private readonly audioCtx: AudioContext;
  buffer: Record<Instrument, AudioBuffer>;

  constructor(audioCtx: AudioContext) {
    this.audioCtx = audioCtx;
    this.buffer = {} as Record<Instrument, AudioBuffer>;
  }

  load() {
    const instrumentPromises = instruments.map(async (instrument) => {
      this.buffer[instrument] = await fetchAndDecodeAudio(
        this.audioCtx,
        `/public/sounds/${instrument}.opus`
      );
    });
    const promise = Promise.all(instrumentPromises).then(() => null);

    // Return original Promise on subsequent load calls to avoid duplicate loads.
    this.load = () => promise;
    return promise;
  }
}
