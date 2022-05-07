import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';

import { theme } from '../../../styles';
import type { Bar, Beat } from '../../../types';

export function useHighlightStyles(beat: Beat, bars: Bar[]) {
  const [highlightStyles, setHighlightStyles] = useState<CSSProperties>({});

  useEffect(() => {
    if (bars.length && beat.playNote) {
      const barOffset = bars.slice(0, beat.barIndex).reduce((acc, bar) => acc + bar.length, 0);
      const noteWithSpacing = `(${theme.sizeNote} + ${theme.spacingNote})`;
      const barSpacingOffset = `calc(${beat.barIndex} * (${theme.spacingBars} - ${theme.spacingNote}))`;

      // sorry for this
      const translateStart = `translateX(calc(${theme.sizeHorizontalPadding} + ${theme.sizeIcon} + ${theme.spacingSmall} + ${theme.spacingSmall}))`;
      const translateRhythm = `translateX(calc(${beat.rhythmIndex} * ${noteWithSpacing}))`;
      const translateBarOffset = `translateX(calc(${barOffset} * ${noteWithSpacing} + ${barSpacingOffset}))`;

      setHighlightStyles({
        transform: `${translateStart} ${translateBarOffset} ${translateRhythm}`,
      });
    }
  }, [bars, beat]);

  return highlightStyles;
}
