import * as React from 'react';

export function useInOutAnimation(entered: boolean) {
  const [canUnmount, setCanUnmount] = React.useState(true);
  const [inPristineState, setInPristineState] = React.useState(true);

  const onAnimationStart = React.useCallback(() => {
    setCanUnmount(false);
  }, []);

  const onAnimationEnd = React.useCallback(() => {
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
