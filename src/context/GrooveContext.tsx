import type { Patch, PatchListener } from 'immer';
import { produce, enablePatches, applyPatches } from 'immer';
import { createContext, useContext, useReducer } from 'react';
import type { Dispatch, FC, ReactNode } from 'react';

import { grooveDefault, tempoMax, tempoMin } from '../constants';
import type { Groove, Note, TimeDivision, TimeSignature } from '../types';
import type { Action } from '../utils/actions';
import { createAction } from '../utils/actions';
import {
  createEmptyInstruments,
  enabledGroupsDefault,
  getInstrumentsByGroup,
  scaleBar,
} from '../utils/groove';
import { createGrooveFromString } from '../utils/shirtify';

/* Actions */

type UndoAction = Action<'UNDO'>;
type RedoAction = Action<'REDO'>;

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
  | SetTempoAction
  | UndoAction
  | RedoAction;

export const undoAction = createAction<UndoAction>('UNDO');
export const redoAction = createAction<RedoAction>('REDO');

export const addBarAction = createAction<AddBarAction>('ADD_BAR');
export const clearBarAction = createAction<ClearBarAction>('CLEAR_BAR');
export const removeBarAction = createAction<RemoveBarAction>('REMOVE_BAR');
export const setNoteAction = createAction<SetNoteAction>('SET_NOTE');
export const setSignatureAction = createAction<SetSignatureAction>('SET_SIGNATURE');
export const setTempoAction = createAction<SetTempoAction>('SET_TEMPO');
export const setGrooveFromStringAction =
  createAction<SetGrooveFromStringAction>('SET_GROOVE_FROM_STRING');

/* Undo/Redo */

enablePatches();

let currentVersion = -1;
const noOfVersionsSupported = 100;
const changes: Record<number, { undo: Patch[]; redo: Patch[] }> = {};

const patchListener: PatchListener = (patches, inversePatches) => {
  currentVersion++;

  changes[currentVersion] = {
    redo: patches,
    undo: inversePatches,
  };

  delete changes[currentVersion + 1];
  delete changes[currentVersion - noOfVersionsSupported];
};

/* Reducer */

interface State extends Groove {
  canUndo: boolean;
  canRedo: boolean;
}

const defaultState: State = {
  title: '',
  tempo: 80,
  bars: [],
  groups: enabledGroupsDefault,
  canUndo: false,
  canRedo: false,
};

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'ADD_BAR': {
      return produce(
        state,
        (draft) => {
          const insertAfterBarIdx = action.payload;
          draft.bars.splice(insertAfterBarIdx + 1, 0, draft.bars[insertAfterBarIdx]);
          draft.canUndo = true;
          draft.canRedo = false;
        },
        patchListener,
      );
    }

    case 'CLEAR_BAR': {
      return produce(
        state,
        (draft) => {
          draft.bars[action.payload].instruments = createEmptyInstruments();
          draft.canUndo = true;
          draft.canRedo = false;
        },
        patchListener,
      );
    }

    case 'REMOVE_BAR': {
      return produce(
        state,
        (draft) => {
          draft.bars = draft.bars.filter((_, idx) => action.payload !== idx);
          draft.canUndo = true;
          draft.canRedo = false;
        },
        patchListener,
      );
    }

    case 'SET_GROOVE_FROM_STRING': {
      return produce(state, (draft) => {
        try {
          const { title, bars, groups, tempo } = createGrooveFromString(action.payload);

          const damageCheck = bars.every((bar) => Object.values(bar).every(Boolean));
          if (!damageCheck) {
            throw new Error('Groove damaged');
          }

          draft.title = title;
          draft.bars = bars;
          draft.groups = groups;
          draft.tempo = Math.min(tempoMax, Math.max(tempoMin, Number(tempo)));
        } catch (err) {
          alert(err);

          const { title, bars, groups, tempo } = createGrooveFromString(grooveDefault);
          draft.title = title;
          draft.bars = bars;
          draft.groups = groups;
          draft.tempo = tempo;
        }
      });
    }

    case 'SET_NOTE': {
      return produce(
        state,
        (draft) => {
          const { rhythmIndex, instrument, group, barIndex, value } = action.payload;
          // reset all group of instruments
          const instruments = getInstrumentsByGroup(group);
          instruments.forEach((ins) => {
            draft.bars[barIndex].instruments[ins][rhythmIndex] = false;
          });

          draft.bars[barIndex].instruments[instrument][rhythmIndex] = value;
          draft.canUndo = true;
          draft.canRedo = false;
        },
        patchListener,
      );
    }

    case 'SET_SIGNATURE': {
      return produce(
        state,
        (draft) => {
          const { barIndex, noteValue, beatsPerBar, timeDivision } = action.payload;
          const bar = draft.bars[barIndex];
          draft.bars[barIndex] = scaleBar(bar, noteValue, beatsPerBar, timeDivision);
          draft.canUndo = true;
          draft.canRedo = false;
        },
        patchListener,
      );
    }

    case 'SET_TEMPO': {
      return produce(state, (draft) => {
        draft.tempo = action.payload;
      });
    }

    case 'UNDO': {
      const patch = changes[currentVersion--]?.undo;

      if (patch) {
        return produce(applyPatches(state, patch), (draft) => {
          draft.canUndo = Boolean(changes[currentVersion]);
          draft.canRedo = true;
        });
      }

      return state;
    }

    case 'REDO': {
      const patch = changes[++currentVersion]?.redo;

      if (patch) {
        return produce(applyPatches(state, patch), (draft) => {
          draft.canUndo = true;
          draft.canRedo = Boolean(changes[currentVersion + 1]);
        });
      }

      return state;
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

export const GrooveProvider: FC<{ children: ReactNode; initial?: Groove }> = ({
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
