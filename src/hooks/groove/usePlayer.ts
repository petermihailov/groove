import { useCallback, useEffect, useRef, useState } from 'react';

import { useDrumKit } from './useDrumKit';
import { Player } from '../../lib/Player';
import type { Beat, Groove, Group } from '../../types/instrument';

export function usePlayer(groove: Groove) {
  const { tempo, bars } = groove;

  const kit = useDrumKit();
  const player = useRef(new Player());

  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [metronomePlaying, setMetronomePlaying] = useState(false);
  const [metronomeSubdivision, setMetronomeSubdivisionState] = useState<number>(1);
  const [muted, setMuted] = useState<Group[]>([]);
  const [beat, setBeat] = useState<Beat>({
    barIndex: 0,
    rhythmIndex: 0,
    instruments: [],
  });

  // Play / stop

  const play = useCallback(() => {
    setPlaying(true);
    player.current.play();
  }, []);

  const stop = useCallback(() => {
    setPlaying(false);
    player.current.stop();
  }, []);

  // Metronome

  const playMetronome = useCallback(() => {
    setMetronomePlaying(true);
    player.current.playMetronome();
  }, []);

  const stopMetronome = useCallback(() => {
    setMetronomePlaying(false);
    player.current.stopMetronome();
  }, []);

  const setMetronomeSubdivision = useCallback((subdivision: number = 1) => {
    setMetronomeSubdivisionState(subdivision);
    player.current.setMetronomeSubdivision(subdivision);
  }, []);

  // Mute groups

  const muteGroup = useCallback((group: Group) => {
    setMuted((prev) => [...prev, group]);
    player.current.mute(group);
  }, []);

  const unmuteGroup = useCallback((group: Group) => {
    setMuted((prev) => prev.filter((key) => group !== key));
    player.current.unmute(group);
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

  return {
    loading,
    beat,
    bars,
    play,
    playing,
    stop,
    metronomePlaying,
    playMetronome,
    stopMetronome,
    metronomeSubdivision,
    setMetronomeSubdivision,
    muted,
    muteGroup,
    unmuteGroup,
  };
}
