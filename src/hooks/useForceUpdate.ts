import { useCallback, useState } from 'react';

export function useForceUpdate() {
  const [, setDummy] = useState<Record<never, never>>();

  const forceUpdate = useCallback(() => {
    setDummy({});
  }, []);

  return { forceUpdate };
}
