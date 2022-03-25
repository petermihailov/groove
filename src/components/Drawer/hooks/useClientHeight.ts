import { useState } from 'react';

import { useResize } from '../../../hooks';

export function useClientHeight() {
  const [clientHeight, setClientHeight] = useState<number>(window.innerHeight);

  useResize(() => {
    setClientHeight(window.innerHeight);
  });

  return clientHeight;
}
