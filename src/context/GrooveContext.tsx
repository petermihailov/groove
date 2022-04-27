import { createContext, useContext, useReducer } from 'react';
import type { Dispatch, FC, ReactNode } from 'react';

import { grooveDefault, tempoMax, tempoMin } from '../constants';
import type { Groove, Note, TimeSignature } from '../types';
import { exhaustiveCheck } from '../types';
import {
  cloneBar,
  createAction,
  createGrooveFromString,
  getInstrumentsByGroup,
  scaleBar,
} from '../utils';

type AddBarAction = {
  type: 'ADD_BAR';
  /** Bar index */
  payload: number;
};

type RemoveBarAction = {
  type: 'REMOVE_BAR';
  /** Bar index */
  payload: number;
};

type SetGrooveFromStringAction = {
  type: 'SET_GROOVE_FROM_STRING';
  /** Groove string */
  payload: string;
};

type SetNoteAction = {
  type: 'SET_NOTE';
  payload: Note;
};

type SetSignatureAction = {
  type: 'SET_SIGNATURE';
  payload: TimeSignature & {
    barIndex: number;
    timeDivision: number;
  };
};

type SetTempoAction = {
  type: 'SET_TEMPO';
  payload: number;
};

type Actions =
  | AddBarAction
  | RemoveBarAction
  | SetGrooveFromStringAction
  | SetNoteAction
  | SetSignatureAction
  | SetTempoAction;

/* Actions */

export const addBarAction = createAction<AddBarAction>('ADD_BAR');
export const removeBarAction = createAction<RemoveBarAction>('REMOVE_BAR');
export const setGrooveFromStringAction =
  createAction<SetGrooveFromStringAction>('SET_GROOVE_FROM_STRING');
export const setNoteAction = createAction<SetNoteAction>('SET_NOTE');
export const setSignatureAction = createAction<SetSignatureAction>('SET_SIGNATURE');
export const setTempoAction = createAction<SetTempoAction>('SET_TEMPO');

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
      const bars = [...state.bars].splice(
        insertAfterBarIdx + 1,
        0,
        cloneBar(state.bars[insertAfterBarIdx])
      );
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
        if (!damageCheck) throw new Error();
      } catch (err) {
        alert('Groove damaged');
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
  }

  exhaustiveCheck(action);
  return state;
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
  return useContext(GrooveContext);
};

export const useGrooveState = () => {
  return useGrooveContext().groove;
};
