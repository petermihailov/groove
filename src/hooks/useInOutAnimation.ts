import { useState, useCallback } from 'react';

export function useInOutAnimation(entered: boolean) {
  const [canUnmount, setCanUnmount] = useState(true);
  const [inPristineState, setInPristineState] = useState(true);

  const onAnimationStart = useCallback(() => {
    setCanUnmount(false);
  }, []);

  const onAnimationEnd = useCallback(() => {
    setCanUnmount(!entered);
    if (entered) {
      setInPristineState(false);
    }
  }, [entered]);

  return {
    canUnmount,
    inPristineState,
    animationCallbacks: {
      onAnimationEnd,
      onAnimationStart,
    },
  };
}
