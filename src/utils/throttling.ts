interface Cancel {
  cancel: () => void;
}

interface NoReturn<T extends (...args: unknown[]) => unknown> {
  (...args: Parameters<T>): void;
}

export type Throttle<T extends (...args: unknown[]) => unknown> = NoReturn<T> & Cancel;
export type Debounce<T extends (...args: unknown[]) => unknown> = Throttle<T>;

type ThrottleOptions = Partial<{
  noTrailing: boolean;
  noLeading: boolean;
  debounceMode: boolean;
}>;

export function throttle<T extends (...args: unknown[]) => unknown>(
  delay: number,
  callback: T,
  options?: ThrottleOptions
): Throttle<T> {
  const { noTrailing = false, noLeading = false, debounceMode = undefined } = options || {};

  let timeoutId: number;
  let cancelled = false;

  let lastExec = 0;

  function clearExistingTimeout() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }

  function cancel() {
    clearExistingTimeout();
    cancelled = true;
  }

  function wrapper(...args: Parameters<T>) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const elapsed = Date.now() - lastExec;

    if (cancelled) {
      return;
    }

    function exec() {
      lastExec = Date.now();
      callback.apply(self, args);
    }

    function clear() {
      timeoutId = undefined;
    }

    if (!noLeading && debounceMode && !timeoutId) {
      exec();
    }

    clearExistingTimeout();

    if (debounceMode === undefined && elapsed > delay) {
      if (noLeading) {
        lastExec = Date.now();
        if (!noTrailing) {
          timeoutId = window.setTimeout(debounceMode ? clear : exec, delay);
        }
      } else {
        exec();
      }
    } else if (noTrailing !== true) {
      timeoutId = window.setTimeout(
        debounceMode ? clear : exec,
        debounceMode === undefined ? delay - elapsed : delay
      );
    }
  }

  wrapper.cancel = cancel;

  return wrapper;
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  delay: number,
  callback: T
): Debounce<T> {
  return throttle(delay, callback, { debounceMode: true });
}
