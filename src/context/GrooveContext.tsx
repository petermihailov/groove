import { createContext, useContext, useReducer } from 'react';
import type { Dispatch, FC, ReactNode } from 'react';

import { grooveDefault, tempoMax, tempoMin } from '../constants';
import type { Groove, Note, TimeDivision, TimeSignature } from '../types';
import type { Action } from '../utils';
import {
  cloneBar,
  createAction,
  createEmptyInstruments,
  createGrooveFromString,
  getInstrumentsByGroup,
  scaleBar,
} from '../utils';

/* Actions */

type AddBarAction = Action<'ADD_BAR', number>;
type ClearBarAction = Action<'CLEAR_BAR', number>;
type RemoveBarAction = Action<'REMOVE_BAR', number>;
type SetGrooveFromStringAction = Action<'SET_GROOVE_FROM_STRING', string>;
type SetNoteAction = Action<'SET_NOTE', Note>;
type SetTempoAction = Action<'SET_TEMPO', number>;
type SetSignatureAction = Action<
  'SET_SIGNATURE',
  TimeSignature & {
    barIndex: number;
    timeDivision: TimeDivision;
  }
>;

type Actions =
  | AddBarAction
  | ClearBarAction
  | RemoveBarAction
  | SetGrooveFromStringAction
  | SetNoteAction
  | SetSignatureAction
  | SetTempoAction;

/* Actions */

export const addBarAction = createAction<AddBarAction>('ADD_BAR');
export const clearBarAction = createAction<ClearBarAction>('CLEAR_BAR');
export const removeBarAction = createAction<RemoveBarAction>('REMOVE_BAR');
export const setNoteAction = createAction<SetNoteAction>('SET_NOTE');
export const setSignatureAction = createAction<SetSignatureAction>('SET_SIGNATURE');
export const setTempoAction = createAction<SetTempoAction>('SET_TEMPO');
export const setGrooveFromStringAction =
  createAction<SetGrooveFromStringAction>('SET_GROOVE_FROM_STRING');

/* Reducer */

type State = Groove;

const defaultState: State = {
  tempo: 80,
  bars: [],
  groups: {},
};

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'ADD_BAR': {
      const insertAfterBarIdx = action.payload;
      const bars = [...state.bars];
      bars.splice(insertAfterBarIdx + 1, 0, cloneBar(state.bars[insertAfterBarIdx]));

      return { ...state, bars };
    }

    case 'CLEAR_BAR': {
      const clearBarIdx = action.payload;
      const bars = [...state.bars];

      const clonedBar = cloneBar(state.bars[clearBarIdx]);
      clonedBar.instruments = createEmptyInstruments();
      bars[clearBarIdx] = clonedBar;

      return { ...state, bars };
    }

    case 'REMOVE_BAR': {
      const removeBarIdx = action.payload;
      const bars = state.bars.filter((_, idx) => removeBarIdx !== idx);
      return { ...state, bars };
    }

    case 'SET_GROOVE_FROM_STRING': {
      let groove: Groove;

      try {
        groove = createGrooveFromString(action.payload);
        groove.tempo = Math.min(tempoMax, Math.max(tempoMin, Number(groove.tempo)));

        const damageCheck = groove.bars.every((bar) => Object.values(bar).every(Boolean));
        if (!damageCheck) throw new Error('Groove damaged');
      } catch (err) {
        alert(err);
        groove = createGrooveFromString(grooveDefault);
      }

      return groove;
    }

    case 'SET_NOTE': {
      const { rhythmIndex, instrument, group, barIndex, value } = action.payload;

      const bars = [...state.bars];
      const clonedBar = cloneBar(state.bars[barIndex]);

      // disable all group
      const instruments = getInstrumentsByGroup(group);
      instruments.forEach((ins) => {
        clonedBar.instruments[ins][rhythmIndex] = false;
      });

      // set value
      clonedBar.instruments[instrument][rhythmIndex] = value;
      bars[barIndex] = clonedBar;

      return { ...state, bars };
    }

    case 'SET_SIGNATURE': {
      const { barIndex, noteValue, beatsPerBar, timeDivision } = action.payload;
      const bar = state.bars[barIndex];

      if (
        beatsPerBar === bar.beatsPerBar &&
        noteValue === bar.noteValue &&
        timeDivision === bar.timeDivision
      ) {
        return state;
      }

      const scaledBar = scaleBar(bar, noteValue, beatsPerBar, timeDivision);
      const bars = [...state.bars];
      bars[barIndex] = scaledBar;

      return { ...state, bars };
    }

    case 'SET_TEMPO': {
      return { ...state, tempo: action.payload };
    }

    default: {
      return state;
    }
  }
};

/* Context */

const GrooveContext = createContext({
  groove: defaultState,
  dispatch: Function.prototype as Dispatch<Actions>,
});

export const GrooveProvider: FC<{ children: ReactNode; initial?: State }> = ({
  children,
  initial = {},
}) => {
  const [groove, dispatch] = useReducer(reducer, {
    ...defaultState,
    ...initial,
  });

  return <GrooveContext.Provider value={{ groove, dispatch }}>{children}</GrooveContext.Provider>;
};

/* Hooks */

export const useGrooveContext = () => {
  const context = useContext(GrooveContext);

  if (!context) {
    throw new Error('useGrooveContext must be used within a <GrooveContext />');
  }

  return context;
};

export const useGrooveState = () => {
  return useGrooveContext().groove;
};
