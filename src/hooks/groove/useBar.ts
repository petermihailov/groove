// import { useCallback, useEffect, useState } from 'react';
//
// import type { Instrument, Bar } from '../../types';
// import { createEmptyBar, getGroupByInstrument, getInstrumentsByGroup, safeKeys } from '../../utils';
//
// export function useBar(timeDivision = 16, beatsPerBar = 4, noteValue = 4) {
//   const [bar, setBar] = useState<Bar>(createEmptyBar(timeDivision, beatsPerBar, noteValue));
//
//   const clearBar = useCallback(() => {
//     setBar(createEmptyBar(timeDivision, beatsPerBar, noteValue));
//   }, [beatsPerBar, noteValue, timeDivision]);
//
//   const updateBar = useCallback((index: number, instrument: Instrument, value: boolean) => {
//     setBar((prev) => {
//       if (index > prev.length || index < 0) {
//         return prev;
//       }
//
//       const group = getGroupByInstrument(instrument);
//       const instrumentsByGroup = getInstrumentsByGroup(group);
//
//       const updatedInstruments = instrumentsByGroup.reduce<Bar['instruments']>((res, key) => {
//         const notes = prev.instruments[key] || [];
//         const updatedInstrument = [...notes];
//
//         // disable all group
//         updatedInstrument[index] = false;
//
//         return { ...res, [key]: updatedInstrument };
//       }, prev.instruments);
//
//       // set value
//       const notes = updatedInstruments[instrument] || [];
//       notes[index] = value;
//
//       return {
//         ...prev,
//         instruments: {
//           ...prev.instruments,
//           ...updatedInstruments,
//         },
//       };
//     });
//   }, []);
//
//   /* scale bar */
//   useEffect(() => {
//     setBar((prev) => {
//       if (
//         beatsPerBar === prev.beatsPerBar &&
//         noteValue === prev.noteValue &&
//         timeDivision === prev.timeDivision
//       ) {
//         return prev;
//       }
//
//       const scale = timeDivision / prev.timeDivision;
//       const newBar = createEmptyBar(timeDivision, beatsPerBar, noteValue);
//
//       newBar.instruments = safeKeys(prev.instruments).reduce<Bar['instruments']>((res, key) => {
//         const notes = prev.instruments[key] || [];
//
//         notes.forEach((note, idx) => {
//           const resNotes = res[key] || [];
//           if (note) resNotes[Math.floor(idx * scale)] = note;
//         });
//
//         return res;
//       }, {});
//
//       return newBar;
//     });
//   }, [beatsPerBar, noteValue, timeDivision]);
//
//   return { bar, updateBar, clearBar };
// }
