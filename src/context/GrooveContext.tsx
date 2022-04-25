import { createContext, useContext, useReducer } from 'react';
import type { Dispatch, FC, ReactNode } from 'react';

import type { Bar, MetronomeFrequency, Note, TimeSignature } from '../types';
import { exhaustiveCheck } from '../types';
import { createAction } from '../utils';

type AddBarAction = {
  type: 'ADD_MEASURE';
  payload: {
    copyBar: number; // index
  };
};

type RemoveBarAction = {
  type: 'REMOVE_MEASURE';
  payload: number; // index
};

type SetGrooveFromStringAction = {
  type: 'SET_GROOVE_FROM_STRING';
  payload: string;
};

type SetMetronomeFrequencyAction = {
  type: 'SET_METRONOME_FREQUENCY';
  payload: MetronomeFrequency;
};

type SetNoteAction = {
  type: 'SET_NOTE';
  payload: Note;
};

type SetSignatureAction = {
  type: 'SET_SIGNATURE';
  payload: TimeSignature;
};

type SetTempoAction = {
  type: 'SET_TEMPO';
  payload: number;
};

type Actions =
  | AddBarAction
  | RemoveBarAction
  | SetGrooveFromStringAction
  | SetMetronomeFrequencyAction
  | SetNoteAction
  | SetSignatureAction
  | SetTempoAction;

export const addBarAction = createAction<AddBarAction>('ADD_MEASURE');
export const removeBarAction = createAction<RemoveBarAction>('REMOVE_MEASURE');
export const setGrooveFromStringAction =
  createAction<SetGrooveFromStringAction>('SET_GROOVE_FROM_STRING');
export const setMetronomeFrequencyAction =
  createAction<SetMetronomeFrequencyAction>('SET_METRONOME_FREQUENCY');
export const setSignatureAction = createAction<SetSignatureAction>('SET_SIGNATURE');
export const setTempoAction = createAction<SetTempoAction>('SET_TEMPO');

type State = {
  tempo: number;
  bars: Bar[];
  metronomeFrequency: MetronomeFrequency;
};

const defaultState: State = {
  tempo: 80,
  bars: [],
  metronomeFrequency: 4,
};

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'ADD_MEASURE': {
      const bars = [...state.bars];

      return state;
    }

    case 'REMOVE_MEASURE': {
      return state;
    }

    case 'SET_GROOVE_FROM_STRING': {
      return state;
    }

    case 'SET_METRONOME_FREQUENCY': {
      return state;
    }

    case 'SET_NOTE': {
      return state;
    }

    case 'SET_SIGNATURE': {
      return state;
    }

    case 'SET_TEMPO': {
      return state;
    }
  }

  exhaustiveCheck(action);
  return state;
};

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

export const useGrooveContext = () => {
  return useContext(GrooveContext);
};

export const useGrooveState = () => {
  return useGrooveContext().groove;
};
