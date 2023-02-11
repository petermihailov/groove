import { useCallback, useEffect, useRef, useState } from 'react';

import { useDrumKit } from './useDrumKit';
import { Player } from '../../lib/Player';
import type { Beat, Groove } from '../../types';

export function usePlayer(groove: Groove) {
  const { tempo, bars } = groove;

  const kit = useDrumKit();
  const player = useRef(new Player());

  const [playing, setPlaying] = useState(false);
  const [beat, setBeat] = useState<Beat>({
    barIndex: 0,
    rhythmIndex: 0,
    playNote: false,
  });

  // Initialize
  useEffect(() => {
    if (kit) {
      player.current.setKit(kit);
      player.current.setOnBeat(setBeat);
    }
  }, [kit]);

  // Update bars
  useEffect(() => {
    player.current.setBars(bars);
  }, [bars]);

  // Update tempo
  useEffect(() => {
    player.current.setTempo(tempo);
  }, [tempo]);

  const play = () => {
    setPlaying(true);
    player.current.play();
  };

  const stop = useCallback(() => {
    setPlaying(false);
    player.current.stop();
  }, []);

  return {
    beat,
    bars,
    play,
    playing,
    stop,
  };
}
