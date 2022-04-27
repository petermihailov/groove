import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';

import { theme } from '../../../styles';
import type { Bar, Beat } from '../../../types';

export function useHighlightStyles(beat: Beat, bars: Bar[]) {
  const [highlightStyles, setHighlightStyles] = useState<CSSProperties>({});

  useEffect(() => {
    if (bars.length && beat.playNote) {
      const currentBar = bars[beat.barIndex];

      // sorry for this
      const translateStart = `translateX(calc(${theme.sizeHorizontalPadding} + ${theme.sizeIcon} + ${theme.spacingSmall} + ${theme.spacingSmall}))`;
      const translateBarOffset = `translateX(calc(${beat.barIndex} * (${currentBar.length} * (${theme.sizeNote} + ${theme.spacingNote}) - ${theme.spacingNote} + ${theme.spacingBars})))`;
      const translateRhythm = `translateX(calc(${beat.rhythmIndex} * (${theme.sizeNote} + ${theme.spacingNote})))`;

      setHighlightStyles({
        transform: `${translateStart} ${translateBarOffset} ${translateRhythm}`,
      });
    }
  }, [bars, beat]);

  return highlightStyles;
}
