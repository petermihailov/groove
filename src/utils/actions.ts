export interface Action {
  type: string;
  payload?: unknown;
}

export function createAction<T extends Action>(type: T['type']) {
  return (payload: T['payload']) => ({ type, payload });
}
