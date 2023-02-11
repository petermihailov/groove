import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';

import type { Bar, Beat } from '../../../types';

export function useHighlightStyles(beat: Beat, bars: Bar[]) {
  const [highlightStyles, setHighlightStyles] = useState<CSSProperties>({
    transform: 'translateX(-100%)',
  });

  useEffect(() => {
    if (bars.length && beat.playNote) {
      const barOffset = bars.slice(0, beat.barIndex).reduce((acc, bar) => acc + bar.length, 0);
      const noteWithSpacing = `(var(--spacing-note) + var(--spacing-note))`;
      const barSpacingOffset = `calc(${beat.barIndex} * (var(--spacing-bars) - var(--spacing-note)))`;

      // sorry for this
      const translateStart = `translateX(calc(var(--size-horizontal-padding) + var(--size-icon) + var(--size-1) + var(--size-1)))`;
      const translateRhythm = `translateX(calc(${beat.rhythmIndex} * ${noteWithSpacing}))`;
      const translateBarOffset = `translateX(calc(${barOffset} * ${noteWithSpacing} + ${barSpacingOffset}))`;

      setHighlightStyles({
        transform: `${translateStart} ${translateBarOffset} ${translateRhythm}`,
      });
    }
  }, [bars, beat]);

  return highlightStyles;
}
