export interface Action<T = string, P = unknown> {
  type: T;
  payload: P;
}

export function createAction<T extends Action>(type: T['type']) {
  return (payload: T['payload']) => ({ type, payload });
}
