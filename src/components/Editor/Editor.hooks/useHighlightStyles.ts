import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';

import { theme } from '../../../styles';
import type { Beat } from '../../../types';

export function useHighlightStyles(beat: Beat) {
  const [highlightStyles, setHighlightStyles] = useState<CSSProperties>({});

  useEffect(() => {
    if (beat.playNote) {
      setHighlightStyles({
        transform: `
          translateX(calc(${theme.sizeHorizontalPadding} + ${theme.sizeIcon} + ${theme.spacingSmall} + ${theme.spacingSmall}))
          translateX(calc(${beat.rhythmIndex} * (${theme.sizeNote} + ${theme.spacingNote})))`,
      });
    }
  }, [beat]);

  return highlightStyles;
}
