import clsx from 'clsx';
import * as React from 'react';

import { useInOutAnimation, useLockBodyScroll } from '../../hooks';
import type { DrawerProps } from './Drawer.props';
import { useClientHeight, useDrawerBehavior } from './hooks';

import useStyles from './Drawer.styles';

export const Drawer: React.FC<DrawerProps> = (props) => {
  const classes = useStyles();

  const {
    children,
    className,
    contentRef,
    dragDisabled,
    keepMounted,
    onClose,
    open,
    ...restProps
  } = props;

  const { inPristineState, canUnmount, animationCallbacks } = useInOutAnimation(open);
  // решает баг в iOS: в альбомной ориентации fixed элементы с
  // height: 100% показываются некорректно если виден navigation bar
  const clientHeight = useClientHeight();

  useLockBodyScroll(open);

  const refs = React.useMemo(
    () => ({
      root: React.createRef<HTMLDivElement>(),
      content: contentRef,
      curtain: React.createRef<HTMLDivElement>(),
      overlay: React.createRef<HTMLDivElement>(),
    }),
    [contentRef]
  );

  useDrawerBehavior(open, refs, onClose, dragDisabled);

  if (!keepMounted && !open && canUnmount) {
    return null;
  }

  return (
    <div
      ref={refs.root}
      className={clsx(classes.root, {
        [classes.show]: open,
        [classes.hide]: !open,
        [classes.pristine]: inPristineState,
      })}
      {...restProps}
      style={{ display: !open && canUnmount ? 'none' : '', height: clientHeight }}
    >
      <div ref={refs.overlay} className={classes.overlay} onClick={onClose} />
      <div ref={refs.curtain} className={clsx(className, classes.curtain)} {...animationCallbacks}>
        {children}
      </div>
    </div>
  );
};
