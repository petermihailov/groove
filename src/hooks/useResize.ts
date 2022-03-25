import {debounce as debounceFn} from 'throttle-debounce';
import * as React from 'react';

export function useResize(cb: (e: Event) => void, debounce = 250) {
  React.useEffect(() => {
    const onResize = debounceFn(debounce, cb);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      onResize.cancel();
    };
  }, [cb, debounce]);
}
