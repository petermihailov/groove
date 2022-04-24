import { useCallback, useEffect, useRef, useState } from 'react';

import { Player } from '../../lib/Player';
import type { Beat, Groove } from '../../types';
import { useDrumKit } from './useDrumKit';

export function usePlayer(groove: Groove) {
  const { tempo, measures } = groove;

  const kit = useDrumKit();
  const player = useRef(new Player());

  const [playing, setPlaying] = useState(false);
  const [beat, setBeat] = useState<Beat>({
    measureIndex: 0,
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

  // Update measures
  useEffect(() => {
    player.current.setMeasures(measures);
  }, [measures]);

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
    measures,
    play,
    playing,
    stop,
  };
}
