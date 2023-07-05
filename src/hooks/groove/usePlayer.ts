import { useCallback, useEffect, useRef, useState } from 'react';

import { useDrumKit } from './useDrumKit';
import { Player } from '../../lib/Player';
import type { Beat, Groove, TimeDivision } from '../../types/instrument';

export function usePlayer(groove: Groove) {
  const { tempo, bars } = groove;

  const kit = useDrumKit();
  const player = useRef(new Player());

  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [playingMetronome, setPlayingMetronome] = useState(false);
  const [metronome, setMetronomeState] = useState<TimeDivision>(4);
  const [beat, setBeat] = useState<Beat>({
    barIndex: 0,
    rhythmIndex: 0,
    instruments: [],
  });

  const play = useCallback(() => {
    setPlaying(true);
    player.current.play();
  }, []);

  const stop = useCallback(() => {
    setPlaying(false);
    player.current.stop();
  }, []);

  const playMetronome = useCallback(() => {
    setPlayingMetronome(true);
  }, []);

  const stopMetronome = useCallback(() => {
    setPlayingMetronome(false);
  }, []);

  const setMetronome = useCallback((division: TimeDivision) => {
    setMetronomeState(division);
    player.current.setMetronome(division);
  }, []);

  // Initialize
  useEffect(() => {
    if (kit) {
      setLoading(false);
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

  // Update metronome division
  useEffect(() => {
    player.current.setMetronome(playingMetronome ? metronome : null);
  }, [metronome, playingMetronome]);

  return {
    loading,
    beat,
    bars,
    play,
    playing,
    stop,
    metronome,
    playMetronome,
    playingMetronome,
    setMetronome,
    stopMetronome,
  };
}
