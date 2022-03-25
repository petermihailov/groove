import * as React from 'react';

import { useResize } from '../../../hooks';

export function useClientHeight() {
  const [clientHeight, setClientHeight] = React.useState<number>(window.innerHeight);

  useResize(() => {
    setClientHeight(window.innerHeight);
  });

  return clientHeight;
}
