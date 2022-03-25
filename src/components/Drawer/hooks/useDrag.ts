import { useCallback, useLayoutEffect, useRef } from "react";

const noop = Function.prototype;

const listenerOptions = {
  passive: false,
  capture: false,
};

interface Vector {
  x: number;
  y: number;
}

interface GestureState<T> {
  /* Координаты пальца пользователя в данный момент */
  currentPosition: Vector;
  /* Пользовательские данные */
  data: T;
  /* Расстояние, пройденное с момента предыдущего вызова функции */
  delta: Vector;
  /* Длительность жеста */
  elapsedTime: number;
  /* Исходный объект события */
  event: TouchEvent;
  /* Признак начала жеста */
  first: boolean;
  /* Координаты начала жеста */
  initialPosition: Vector;
  /* Признак окончания жеста */
  last: boolean;
  /* Сдвиг по каждой из осей с момента начала жеста */
  movement: Vector;
  /* Координаты пальца пользователя в момент предыдущего срабатывания функции */
  previousPosition?: Vector;
  /* Время начала жеста (timestamp) */
  startTime: number;
  /* Скорость движения пальца по каждой из осей */
  velocity: Vector;
}

type StateChangeCallback<T> = (arg: Readonly<GestureState<T>>) => void;

/**
 * Предоставляет унифицированный интерфейс для работы с
 * простыми touch-событиями (где используется один палец)
 */
export function useDrag<T>(
  elementRef: React.RefObject<HTMLElement>,
  onStateChange: StateChangeCallback<T>
) {
  const touchIdentifierRef = useRef<number>();
  const gestureStateRef = useRef<GestureState<T>>();
  const onStateChangeRef = useRef<StateChangeCallback<T>>();

  const handler = useCallback(
    (event: TouchEvent) => {
      const onChange = onStateChangeRef.current ?? noop;
      let state: GestureState<T> | undefined = gestureStateRef.current;
      let touch = Array.from(event.changedTouches).find(
        (item) => item.identifier === touchIdentifierRef.current
      );

      if (
        !state &&
        event.type === 'touchstart' &&
        event.changedTouches.length === 1 &&
        event.changedTouches[0]
      ) {
        touch = event.changedTouches[0];

        touchIdentifierRef.current = touch.identifier;

        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- TODO: remove this comment
        state = {
          first: true,
          last: false,
          startTime: event.timeStamp,
          initialPosition: { x: touch.clientX, y: touch.clientY },
          data: {},
        } as GestureState<T>;

        gestureStateRef.current = state;
      }

      if (state && touch) {
        // всегда обновляем ссылку на объект исходного события
        state.event = event;

        // сохраняет координаты предыдущего вызова функции
        if (event.type === 'touchmove') {
          state.first = false;
          state.previousPosition = state.currentPosition;
        }

        if (event.type === 'touchstart' || event.type === 'touchmove') {
          state.currentPosition = {
            x: touch.clientX,
            y: touch.clientY,
          };
          state.movement = {
            x: state.currentPosition.x - state.initialPosition.x,
            y: state.currentPosition.y - state.initialPosition.y,
          };
          state.delta = {
            x:
              state.currentPosition.x -
              (state.previousPosition ?? state.initialPosition).x,
            y:
              state.currentPosition.y -
              (state.previousPosition ?? state.initialPosition).y,
          };
          state.velocity = {
            x:
              state.delta.x /
                (event.timeStamp - state.startTime - state.elapsedTime) || 0,
            y:
              state.delta.y /
                (event.timeStamp - state.startTime - state.elapsedTime) || 0,
          };
          state.elapsedTime = event.timeStamp - state.startTime;
        }

        // жест завершен пользователем или был прекращен системой
        if (event.type === 'touchend' || event.type === 'touchcancel') {
          state.first = false;
          state.last = true;
          gestureStateRef.current = undefined;
          touchIdentifierRef.current = undefined;
        }

        onChange(state);
      }
    },
    [onStateChangeRef]
  );

  // обновляем колбэк при каждом рендере, так нам не нужно будет использовать useCallback
  onStateChangeRef.current = onStateChange;

  /**
   * Управляет подписками на события
   */
  useLayoutEffect(() => {
    if (!elementRef.current) {
      return;
    }

    const elem = elementRef.current;

    elem.addEventListener('touchstart', handler, listenerOptions);
    elem.addEventListener('touchmove', handler, listenerOptions);
    elem.addEventListener('touchend', handler, listenerOptions);
    elem.addEventListener('touchcancel', handler, listenerOptions);

    // eslint-disable-next-line consistent-return -- TODO: remove this comment
    return () => {
      elem.removeEventListener('touchstart', handler, listenerOptions);
      elem.removeEventListener('touchmove', handler, listenerOptions);
      elem.removeEventListener('touchend', handler, listenerOptions);
      elem.removeEventListener('touchcancel', handler, listenerOptions);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: remove this comment
  }, [elementRef, handler, elementRef.current]);
}
