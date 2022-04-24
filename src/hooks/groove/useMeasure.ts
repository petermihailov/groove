import { useCallback, useEffect, useState } from 'react';

import type { Instrument, Measure } from '../../types';
import {
  createEmptyMeasure,
  getGroupByInstrument,
  getInstrumentsByGroup,
  safeKeys,
} from '../../utils';

export function useMeasure(timeDivision = 16, beatsCount = 4, beatsPerFullNote = 4) {
  const [measure, setMeasure] = useState<Measure>(
    createEmptyMeasure(timeDivision, beatsCount, beatsPerFullNote)
  );

  const clearMeasure = useCallback(() => {
    setMeasure(createEmptyMeasure(timeDivision, beatsCount, beatsPerFullNote));
  }, [beatsCount, beatsPerFullNote, timeDivision]);

  const updateMeasure = useCallback((index: number, instrument: Instrument, value: boolean) => {
    setMeasure((prev) => {
      if (index > prev.length || index < 0) {
        return prev;
      }

      const group = getGroupByInstrument(instrument);
      const instrumentsByGroup = getInstrumentsByGroup(group);

      const updatedInstruments = instrumentsByGroup.reduce<Measure['instruments']>((res, key) => {
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

  /* scale measure */
  useEffect(() => {
    setMeasure((prev) => {
      if (
        beatsCount === prev.beatsCount &&
        beatsPerFullNote === prev.beatsPerFullNote &&
        timeDivision === prev.timeDivision
      ) {
        return prev;
      }

      const scale = timeDivision / prev.timeDivision;
      const newMeasure = createEmptyMeasure(timeDivision, beatsCount, beatsPerFullNote);

      newMeasure.instruments = safeKeys(prev.instruments).reduce<Measure['instruments']>(
        (res, key) => {
          const notes = prev.instruments[key] || [];

          notes.forEach((note, idx) => {
            const resNotes = res[key] || [];
            if (note) resNotes[Math.floor(idx * scale)] = note;
          });

          return res;
        },
        {}
      );

      return newMeasure;
    });
  }, [beatsCount, beatsPerFullNote, timeDivision]);

  return { measure, updateMeasure, clearMeasure };
}
