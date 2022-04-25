import { useCallback, useEffect, useState } from 'react';

import type { Instrument, Bar } from '../../types';
import { createEmptyBar, getGroupByInstrument, getInstrumentsByGroup, safeKeys } from '../../utils';

export function useBar(timeDivision = 16, beatsCount = 4, beatsPerFullNote = 4) {
  const [bar, setBar] = useState<Bar>(createEmptyBar(timeDivision, beatsCount, beatsPerFullNote));

  const clearBar = useCallback(() => {
    setBar(createEmptyBar(timeDivision, beatsCount, beatsPerFullNote));
  }, [beatsCount, beatsPerFullNote, timeDivision]);

  const updateBar = useCallback((index: number, instrument: Instrument, value: boolean) => {
    setBar((prev) => {
      if (index > prev.length || index < 0) {
        return prev;
      }

      const group = getGroupByInstrument(instrument);
      const instrumentsByGroup = getInstrumentsByGroup(group);

      const updatedInstruments = instrumentsByGroup.reduce<Bar['instruments']>((res, key) => {
        const notes = prev.instruments[key] || [];
        const updatedInstrument = [...notes];

        // disable all group
        updatedInstrument[index] = false;

        return { ...res, [key]: updatedInstrument };
      }, prev.instruments);

      // set value
      const notes = updatedInstruments[instrument] || [];
      notes[index] = value;

      return {
        ...prev,
        instruments: {
          ...prev.instruments,
          ...updatedInstruments,
        },
      };
    });
  }, []);

  /* scale bar */
  useEffect(() => {
    setBar((prev) => {
      if (
        beatsCount === prev.beatsCount &&
        beatsPerFullNote === prev.beatsPerFullNote &&
        timeDivision === prev.timeDivision
      ) {
        return prev;
      }

      const scale = timeDivision / prev.timeDivision;
      const newBar = createEmptyBar(timeDivision, beatsCount, beatsPerFullNote);

      newBar.instruments = safeKeys(prev.instruments).reduce<Bar['instruments']>((res, key) => {
        const notes = prev.instruments[key] || [];

        notes.forEach((note, idx) => {
          const resNotes = res[key] || [];
          if (note) resNotes[Math.floor(idx * scale)] = note;
        });

        return res;
      }, {});

      return newBar;
    });
  }, [beatsCount, beatsPerFullNote, timeDivision]);

  return { bar, updateBar, clearBar };
}
