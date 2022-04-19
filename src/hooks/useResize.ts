import { useEffect } from 'react';

import { debounce as debounceFn } from '../utils';

export function useResize(cb: (e: Event) => void, debounce = 250) {
  useEffect(() => {
    const onResize = debounceFn(debounce, cb);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      onResize.cancel();
    };
  }, [cb, debounce]);
}
